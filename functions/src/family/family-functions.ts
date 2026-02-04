/**
 * Family Management Cloud Functions
 * Handles family member creation using Admin SDK to avoid auth state changes
 */

import {onCall, HttpsError, CallableRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

interface CreateFamilyMemberRequest {
  familyId: string;
  displayName: string;
  email: string;
  password: string;
}

/**
 * Create a family member account using Admin SDK
 * This prevents the head of household from being logged out
 */
export const createFamilyMemberAccount = onCall(
  async (request: CallableRequest) => {
    const {data, auth} = request;

    // Ensure user is authenticated
    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be authenticated to create family members"
      );
    }

    const {familyId, displayName, email, password} =
      data as CreateFamilyMemberRequest;
    const headOfHouseholdUid = auth.uid;

    try {
      // Verify family exists and user is head of household
      const familyDoc = await admin
        .firestore()
        .collection("families")
        .doc(familyId)
        .get();

      if (!familyDoc.exists) {
        throw new HttpsError(
          "not-found",
          "Family not found"
        );
      }

      const familyData = familyDoc.data();
      if (!familyData || familyData.headOfHousehold !== headOfHouseholdUid) {
        throw new HttpsError(
          "permission-denied",
          "Only head of household can create family members"
        );
      }

      if (familyData.memberCount >= familyData.maxMembers) {
        throw new HttpsError(
          "resource-exhausted",
          `Maximum of ${familyData.maxMembers} family members reached`
        );
      }

      // Create Firebase Auth user using Admin SDK
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
      });

      const memberUid = userRecord.uid;
      const now = admin.firestore.Timestamp.now();

      // Create user document for family member
      const memberData = {
        uid: memberUid,
        email,
        displayName,
        photoURL: null,
        role: "user",
        accountType: "family",
        subscription: {
          status: "active", // Family members inherit subscription from head
          plan: "family",
        },
        familyId,
        isHeadOfHousehold: false,
        createdBy: headOfHouseholdUid,
        preferences: {
          bibleTranslation: "ESV",
          readingPlan: "narrative",
          fontSize: "medium",
          darkMode: false,
          emailReminders: "daily", // Default to daily email reminders
        },
        progress: {
          currentWeek: 1,
          currentDay: 1,
          lastAccessDate: now.toDate().toISOString(),
          startDate: getDefaultStartDate().toISOString(),
        },
        createdAt: now,
        updatedAt: now,
      };

      await admin
        .firestore()
        .collection("users")
        .doc(memberUid)
        .set(memberData);

      // Update family document
      await admin
        .firestore()
        .collection("families")
        .doc(familyId)
        .update({
          members: admin.firestore.FieldValue.arrayUnion(memberUid),
          memberCount: admin.firestore.FieldValue.increment(1),
          updatedAt: now,
        });

      // Get head of household info for the email
      const headDoc = await admin
        .firestore()
        .collection("users")
        .doc(headOfHouseholdUid)
        .get();
      const headData = headDoc.data();

      // Send welcome email to new family member
      try {
        await sendWelcomeEmail(
          email,
          displayName,
          headData?.displayName || "Your family administrator"
        );
      } catch (emailError) {
        // Log email error but don't fail the entire operation
        console.error("Failed to send welcome email:", emailError);
      }

      return {
        success: true,
        memberId: memberUid,
        message: "Family member created successfully",
      };
    } catch (error: any) {
      console.error("Error creating family member:", error);

      // Re-throw HttpsErrors as-is
      if (error instanceof HttpsError) {
        throw error;
      }

      // Handle specific Firebase Auth errors
      if (error.code === "auth/email-already-exists") {
        throw new HttpsError(
          "already-exists",
          "An account with this email already exists"
        );
      }

      if (error.code === "auth/invalid-email") {
        throw new HttpsError(
          "invalid-argument",
          "Invalid email address"
        );
      }

      if (error.code === "auth/weak-password") {
        throw new HttpsError(
          "invalid-argument",
          "Password is too weak. Minimum 6 characters required."
        );
      }

      // Generic error
      throw new HttpsError(
        "internal",
        "Failed to create family member: " + error.message
      );
    }
  }
);

/**
 * Send welcome email to new family member
 */
async function sendWelcomeEmail(
  toEmail: string,
  memberName: string,
  familyAdminName: string
): Promise<void> {
  // Configure email transporter (using Gmail as example)
  // In production, use environment variables for credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const loginUrl = process.env.FRONTEND_URL
    ? `${process.env.FRONTEND_URL}/login`
    : "https://tunemyheart.com/login";

  // Logo URL - using the publicly deployed logo from Firebase Hosting
  const logoUrl = process.env.FRONTEND_URL
    ? `${process.env.FRONTEND_URL}/logo.png`
    : "https://tunemyheart.com/logo.png";

  const mailOptions = {
    from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to Tune My Heart - Family Account Created",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4A5568; color: white; padding: 30px 20px; text-align: center; }
          .logo { max-width: 200px; height: auto; margin-bottom: 20px; }
          .content { background-color: #f7fafc; padding: 30px; }
          .button { display: inline-block; background-color: #4299e1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .credentials { background-color: #fff; padding: 15px; border-left: 4px solid #4299e1; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #718096; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="Tune My Heart" class="logo" />
            <h1>Welcome to Tune My Heart!</h1>
          </div>
          <div class="content">
            <h2>Hello ${memberName},</h2>
            <p>${familyAdminName} has added you to their family account on Tune My Heart.</p>
            
            <p>Tune My Heart is a Christ-centered Bible study and worship resource designed to help you grow in your faith through:</p>
            <ul>
              <li>Structured Bible reading plans</li>
              <li>Scripture memory verses</li>
              <li>Hymns and worship resources</li>
              <li>Catechism study</li>
              <li>Children's Bible stories</li>
              <li>Prayer journals</li>
            </ul>

            <div class="credentials">
              <h3>Your Login Credentials:</h3>
              <p><strong>Email:</strong> ${toEmail}</p>
              <p><strong>Password:</strong> (The password was set by ${familyAdminName})</p>
              <p style="font-size: 14px; color: #718096; margin-top: 10px;">
                💡 You can change your password after logging in by going to your account preferences.
              </p>
            </div>

            <p style="text-align: center;">
              <a href="${loginUrl}" class="button">Login to Tune My Heart</a>
            </p>

            <p>If you have any questions or need assistance, please don't hesitate to reach out to ${familyAdminName} or contact our support team.</p>

            <p>God bless you on your spiritual journey!</p>
            <p><strong>The Tune My Heart Team</strong></p>
          </div>
          <div class="footer">
            <p>This email was sent because you were added to a family account on Tune My Heart.</p>
            <p>© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Helper function to get default start date
 */
function getDefaultStartDate(): Date {
  const now = new Date();
  const year = now.getFullYear();
  
  // Find first Monday of the year
  const jan1 = new Date(year, 0, 1);
  const dayOfWeek = jan1.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7;
  
  const firstMonday = new Date(year, 0, 1 + daysUntilMonday);
  return firstMonday;
}

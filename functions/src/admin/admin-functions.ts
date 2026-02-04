/**
 * Admin Management Cloud Functions
 * Functions for admin user management including creating users
 */

import {onCall, HttpsError, CallableRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

interface CreateUserRequest {
  email: string;
  displayName: string;
  plan: 'free' | 'individual' | 'family';
  accountType: 'individual' | 'family';
  isAdmin: boolean;
}

// Email transporter configuration
function getEmailTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error("Email credentials not configured.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
}

// Get frontend URL
function getFrontendUrl(): string {
  return process.env.FRONTEND_URL || "https://tunemyheart.com";
}

/**
 * Send welcome email to newly created user
 */
async function sendWelcomeEmail(
  email: string,
  displayName: string,
  plan: string,
  isAdmin: boolean
): Promise<void> {
  const transporter = getEmailTransporter();
  const frontendUrl = getFrontendUrl();

  const planBenefits: { [key: string]: string[] } = {
    free: [
      "Access to daily Bible reading plan",
      "Basic progress tracking",
      "Community resources",
    ],
    individual: [
      "Full access to all Bible reading plans",
      "Complete hymnal with audio recordings",
      "Catechism study materials",
      "Children's Bible stories",
      "Journal and progress tracking",
      "Memory verse system",
    ],
    family: [
      "All Individual plan features",
      "Up to 6 family member accounts",
      "Family progress tracking",
      "Shared resources and schedules",
      "Family dashboard",
    ],
  };

  const benefits = planBenefits[plan] || planBenefits.free;

  const mailOptions = {
    from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Welcome to Tune My Heart${isAdmin ? " - Admin Account" : ""}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .plan-badge { display: inline-block; background: #3b82f6; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; margin: 10px 0; }
          .admin-badge { display: inline-block; background: #dc2626; color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; margin: 10px 0; }
          .benefits { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .benefits-list { margin: 10px 0; padding-left: 20px; }
          .benefits-list li { margin: 8px 0; }
          .button { display: inline-block; background: #2a5876; color: white !important; padding: 14px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .steps { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          .steps-list { margin: 10px 0; padding-left: 20px; }
          .steps-list li { margin: 10px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 10px;" />
            <h2 style="margin: 0; color: white; font-weight: bold;">Welcome to Tune My Heart</h2>
          </div>
          <div class="content">
            <h2>Hello, ${displayName}!</h2>
            <p>An administrator has created an account for you on Tune My Heart - your companion for daily Bible reading, worship, and spiritual growth.</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <span class="plan-badge">${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</span>
              ${isAdmin ? '<span class="admin-badge">Administrator</span>' : ""}
            </div>

            ${plan !== "free" ? `
            <div class="benefits">
              <h3 style="margin-top: 0; color: #2a5876;">Your Plan Includes:</h3>
              <ul class="benefits-list">
                ${benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
              </ul>
            </div>
            ` : ""}

            <div class="steps">
              <h3 style="margin-top: 0; color: #92400e;">Getting Started - Next Steps:</h3>
              <ol class="steps-list" style="color: #78350f;">
                <li><strong>Check your email</strong> - You should receive a password reset email from Firebase (noreply@tunemyheart.firebaseapp.com) within a few minutes</li>
                <li><strong>Set your password</strong> - Click the link in the password reset email to create your password</li>
                <li><strong>Sign in</strong> - Use your email (${email}) and new password to log in</li>
                <li><strong>Start reading</strong> - Begin your journey through God's Word!</li>
              </ol>
            </div>

            <p><strong>Note:</strong> If you don't see the password reset email, check your spam folder. The link will expire in 1 hour, so be sure to set your password soon.</p>

            <p style="text-align: center;">
              <a href="${frontendUrl}/login" class="button" style="color: white !important; text-decoration: none;">Go to Login Page</a>
            </p>

            ${isAdmin ? `
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="margin-top: 0; color: #991b1b;">Administrator Access</h3>
              <p style="color: #7f1d1d; margin: 0;">You have been granted administrator privileges. This gives you access to the Admin Dashboard where you can manage users, subscriptions, and resources.</p>
            </div>
            ` : ""}

            <p><strong>Need help?</strong> If you have any questions or issues getting started, please don't hesitate to reach out to the administrator who created your account.</p>

            <p style="margin-top: 30px;"><em>"Your word is a lamp to my feet and a light to my path." - Psalm 119:105</em></p>
            
            <p>May the Lord bless you as you dive into His Word!</p>
          </div>
          <div class="footer">
            <p>This email was sent because an administrator created an account for you at Tune My Heart.</p>
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
 * Create a new user account (Admin only)
 * Creates Firebase Auth user and Firestore document
 * Sends password reset email and welcome email
 */
export const createUserByAdmin = onCall(
  async (request: CallableRequest) => {
    const {data, auth} = request;

    // Check authentication
    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be authenticated to call this function"
      );
    }

    // Check if caller is an admin
    const callerDoc = await admin.firestore()
      .collection("users")
      .doc(auth.uid)
      .get();

    if (!callerDoc.exists || callerDoc.data()?.role !== "admin") {
      throw new HttpsError(
        "permission-denied",
        "Only administrators can create users"
      );
    }

    const {email, displayName, plan, accountType, isAdmin} = data as CreateUserRequest;

    // Validate input
    if (!email || !displayName || !plan || !accountType) {
      throw new HttpsError(
        "invalid-argument",
        "Email, display name, plan, and account type are required"
      );
    }

    if (!["free", "individual", "family"].includes(plan)) {
      throw new HttpsError(
        "invalid-argument",
        "Invalid plan. Must be 'free', 'individual', or 'family'"
      );
    }

    if (!["individual", "family"].includes(accountType)) {
      throw new HttpsError(
        "invalid-argument",
        "Invalid account type. Must be 'individual' or 'family'"
      );
    }

    try {
      // 1. Create Firebase Authentication user
      const userRecord = await admin.auth().createUser({
        email,
        displayName,
        emailVerified: false,
      });

      const uid = userRecord.uid;
      const now = admin.firestore.Timestamp.now();

      // 2. Create subscription based on plan
      // Admin-created users get active status immediately (not trial)
      const subscription: any = plan === "free"
        ? {
          status: "free",
          plan: "free",
        }
        : {
          status: "active",
          plan: plan,
        };

      // 3. Create user document in Firestore
      const userData = {
        uid,
        email,
        displayName,
        photoURL: null,
        role: isAdmin ? "admin" : "user",
        accountType,
        subscription,
        isHeadOfHousehold: accountType === "family",
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
          startDate: new Date(new Date().getFullYear(), 0, 1).toISOString(),
        },
        createdAt: now,
        updatedAt: now,
        createdBy: auth.uid, // Track who created this user
      };

      await admin.firestore()
        .collection("users")
        .doc(uid)
        .set(userData);

      // 4. If account type is family, create a family document
      if (accountType === "family") {
        const familyRef = admin.firestore().collection("families").doc();
        const familyId = familyRef.id;

        await familyRef.set({
          headOfHousehold: uid,
          members: [uid],
          memberCount: 1,
          maxMembers: 10,
          createdAt: now,
          updatedAt: now,
        });

        // Update user document with familyId
        await admin.firestore()
          .collection("users")
          .doc(uid)
          .update({
            familyId: familyId,
            updatedAt: now,
          });

        console.log(`Created family document ${familyId} for user ${email}`);
      }

      // 5. Generate password reset link with custom domain
      // Generate the action code/link that redirects to our custom domain
      const passwordResetLink = await admin.auth().generatePasswordResetLink(email, {
        url: `${getFrontendUrl()}/reset-password`,
      });
      
      // Extract the oobCode from the generated link
      const url = new URL(passwordResetLink);
      const oobCode = url.searchParams.get('oobCode');
      
      // Build our custom reset link
      const customResetLink = `${getFrontendUrl()}/reset-password?oobCode=${oobCode}`;
      
      console.log(`Password reset link generated for ${email}`);

      // Send password reset email via nodemailer
      try {
        const transporter = getEmailTransporter();
        const passwordResetMailOptions = {
          from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Set Your Password - Tune My Heart",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
                .button { display: inline-block; background: #dc2626; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; font-size: 16px; }
                .warning { background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
                .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 10px;" />
                  <h2 style="margin: 0; color: white; font-weight: bold;">Set Your Password</h2>
                </div>
                <div class="content">
                  <h2>Hello, ${displayName}!</h2>
                  <p>An account has been created for you at Tune My Heart. Click the button below to set your password and activate your account.</p>
                  
                  <p style="text-align: center;">
                    <a href="${customResetLink}" class="button" style="color: white !important; text-decoration: none;">SET MY PASSWORD</a>
                  </p>

                  <div class="warning">
                    <p style="margin: 0; color: #991b1b;"><strong>⚠️ Important:</strong></p>
                    <ul style="color: #7f1d1d; margin: 10px 0;">
                      <li>This link expires in 1 hour</li>
                      <li>You can only use this link once</li>
                      <li>If you didn't request this, please contact your administrator</li>
                    </ul>
                  </div>

                  <p><strong>After setting your password:</strong></p>
                  <ol>
                    <li>Click the button above to set your password</li>
                    <li>You'll be automatically redirected to the login page</li>
                    <li>Sign in with your email: <strong>${email}</strong></li>
                    <li>Use the password you just created</li>
                  </ol>

                  <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">If the button doesn't work, copy and paste this link into your browser:</p>
                  <p style="font-size: 12px; color: #3b82f6; word-break: break-all;">${customResetLink}</p>
                </div>
                <div class="footer">
                  <p>This is an automated email. Please do not reply to this message.</p>
                  <p>© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        await transporter.sendMail(passwordResetMailOptions);
        console.log(`Password reset email sent to ${email}`);
      } catch (passwordResetEmailError) {
        console.error("Failed to send password reset email:", passwordResetEmailError);
        // Don't fail the operation, but log it
      }

      // 5. Send welcome email
      try {
        await sendWelcomeEmail(email, displayName, plan, isAdmin);
        console.log(`Welcome email sent to ${email}`);
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the whole operation if email fails
      }

      return {
        success: true,
        message: `User ${email} created successfully`,
        userId: uid,
        passwordResetLink, // Only for logging/debugging
      };
    } catch (error: any) {
      console.error("Error creating user:", error);

      // Clean up if something fails
      try {
        if (error.uid) {
          await admin.auth().deleteUser(error.uid);
        }
      } catch (cleanupError) {
        console.error("Error during cleanup:", cleanupError);
      }

      // Re-throw HttpsErrors as-is
      if (error instanceof HttpsError) {
        throw error;
      }

      // Handle specific errors
      if (error.code === "auth/email-already-exists") {
        throw new HttpsError(
          "already-exists",
          "A user with this email already exists"
        );
      }

      if (error.code === "auth/invalid-email") {
        throw new HttpsError(
          "invalid-argument",
          "Invalid email address"
        );
      }

      // Generic error
      throw new HttpsError(
        "internal",
        `Failed to create user: ${error.message || "Unknown error"}`
      );
    }
  }
);

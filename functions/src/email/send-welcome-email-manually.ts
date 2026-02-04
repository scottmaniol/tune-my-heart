/**
 * Manual Welcome Email Cloud Function
 * Allows admins to manually send welcome emails to users
 */

import {onCall, HttpsError, CallableRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {sendWelcomeEmail} from "./welcome-email-functions";

interface SendWelcomeEmailRequest {
  userId: string;
}

/**
 * Manually send welcome email to a user
 * Only callable by admin users
 */
export const sendWelcomeEmailManually = onCall(
  async (request: CallableRequest) => {
    const {data, auth} = request;

    // Check if request is authenticated
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
        "Only administrators can manually send welcome emails"
      );
    }

    const {userId} = data as SendWelcomeEmailRequest;

    if (!userId || typeof userId !== "string") {
      throw new HttpsError(
        "invalid-argument",
        "userId must be a valid string"
      );
    }

    try {
      // Get user document
      const userDoc = await admin.firestore()
        .collection("users")
        .doc(userId)
        .get();

      if (!userDoc.exists) {
        throw new HttpsError(
          "not-found",
          `User with ID ${userId} not found`
        );
      }

      const userData = userDoc.data();

      if (!userData) {
        throw new HttpsError(
          "not-found",
          "User data not found"
        );
      }

      const {email, displayName, subscription} = userData;

      if (!email) {
        throw new HttpsError(
          "invalid-argument",
          "User does not have an email address"
        );
      }

      // Determine plan for welcome email
      const plan = subscription?.plan || "free";

      // Send welcome email
      await sendWelcomeEmail(
        email,
        displayName || "Friend",
        plan as "free" | "individual" | "family"
      );

      // Mark email as sent in user document
      await userDoc.ref.update({
        welcomeEmailSent: true,
        welcomeEmailSentAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Manual welcome email sent to ${email} for ${plan} plan by admin ${auth.uid}`);

      return {
        success: true,
        message: `Welcome email sent successfully to ${email}`,
      };
    } catch (error: any) {
      console.error("Error sending manual welcome email:", error);

      // Re-throw HttpsErrors as-is
      if (error instanceof HttpsError) {
        throw error;
      }

      // Generic error
      throw new HttpsError(
        "internal",
        `Failed to send welcome email: ${error.message || "Unknown error"}`
      );
    }
  }
);

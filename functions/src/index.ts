/**
 * Tune My Heart - Cloud Functions
 * Bible API proxy to bypass CORS restrictions & Stripe integration
 */

import * as functions from "firebase-functions";
import cors from "cors";

// Initialize Firebase Admin if not already initialized
import * as admin from "firebase-admin";
if (!admin.apps.length) {
  admin.initializeApp();
}

// Export Stripe functions
export {
  createCheckoutSession,
  createSubscription,
  cancelSubscription,
  createPortalSession,
} from "./stripe/stripe-functions";

// Export Stripe webhook
export {stripeWebhook} from "./stripe/stripe-webhook";

// Export Family functions
export {createFamilyMemberAccount} from "./family/family-functions";

// Export User management functions
export {deleteUserAccount, sendWelcomeEmailOnUserCreate} from "./user/user-functions";

// Export Admin management functions
export {createUserByAdmin} from "./admin/admin-functions";

// Export Email notification functions
export {
  sendDailyReminders,
  sendWeeklyReminders,
  sendBehindReminders,
  sendOneWeekUpgradeReminder,
  sendNewYearPrepReminders,
} from "./email/email-functions";

// Export Welcome Email functions
export {sendWelcomeEmailManually} from "./email/send-welcome-email-manually";

// Export Password Reset functions
export {
  requestPasswordReset,
  verifyResetToken,
  completePasswordReset,
} from "./auth/password-reset-functions";

// Export New Year Snapshot functions
export {
  createNewYearSnapshots,
  createNewYearSnapshotsManual,
} from "./newYear/snapshot-functions";

// Initialize CORS
const corsHandler = cors({origin: true});

/**
 * Fetch NKJV scripture from bolls.life API
 * This bypasses CORS restrictions by proxying the request server-side
 */
export const fetchNKJV = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    try {
      // Get scripture reference from query parameter
      const reference = request.query.reference as string;

      if (!reference) {
        response.status(400).json({
          error: "Missing scripture reference parameter",
        });
        return;
      }

      // Fetch from bolls.life API (server-side, no CORS issue)
      // bolls.life format: book chapter:verse
      // Example: Genesis 1:1 or Genesis 1
      // Replace spaces with + for URL
      const formattedRef = reference.replace(/\s+/g, "+");
      const apiUrl =
        `https://bolls.life/get-text/NKJV/${formattedRef}/`;

      const apiResponse = await fetch(apiUrl);

      if (!apiResponse.ok) {
        response.status(apiResponse.status).json({
          error: "Failed to fetch from bolls.life API",
          status: apiResponse.status,
        });
        return;
      }

      const data = await apiResponse.json();

      // Return the scripture data
      response.json({
        reference,
        translation: "NKJV",
        data,
      });
    } catch (error) {
      console.error("Error fetching NKJV:", error);
      response.status(500).json({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
});

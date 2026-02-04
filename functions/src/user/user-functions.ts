/**
 * User Management Cloud Functions
 * Functions for managing users including deletion
 */

import {onCall, HttpsError, CallableRequest} from "firebase-functions/v2/https";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import {sendWelcomeEmail} from "../email/welcome-email-functions";

interface DeleteUserRequest {
  userId: string;
}

/**
 * Delete a user and all their associated data
 * This function deletes:
 * - Firebase Authentication user
 * - User document in Firestore
 * - User's progress data
 * - User's journal entries
 * - User's memory box data
 * - Family associations if applicable
 * 
 * Only callable by admin users
 */
export const deleteUserAccount = onCall(
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
        "Only administrators can delete users"
      );
    }

    const {userId} = data as DeleteUserRequest;

    if (!userId || typeof userId !== "string") {
      throw new HttpsError(
        "invalid-argument",
        "userId must be a valid string"
      );
    }

    try {
      const db = admin.firestore();
      const batch = db.batch();

      // 1. Get user document to check for family associations
      const userDoc = await db.collection("users").doc(userId).get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        
        // 2. Handle family associations
        if (userData?.familyId) {
          // Remove user from family members array
          const familyRef = db.collection("families").doc(userData.familyId);
          batch.update(familyRef, {
            members: admin.firestore.FieldValue.arrayRemove(userId),
            memberCount: admin.firestore.FieldValue.increment(-1),
          });
        }

        // Check if user is head of household
        if (userData?.isHeadOfHousehold) {
          // Query for families where this user is the head
          const familiesSnapshot = await db.collection("families")
            .where("headOfHousehold", "==", userId)
            .get();
          
          // Delete all families where user is head of household
          familiesSnapshot.docs.forEach((familyDoc) => {
            batch.delete(familyDoc.ref);
          });
        }

        // 3. Delete user's journal entries
        const journalSnapshot = await db.collection("journals")
          .where("userId", "==", userId)
          .get();
        
        journalSnapshot.docs.forEach((journalDoc) => {
          batch.delete(journalDoc.ref);
        });

        // 4. Delete user's memory box data
        const memoryBoxSnapshot = await db.collection("memoryBox")
          .where("userId", "==", userId)
          .get();
        
        memoryBoxSnapshot.docs.forEach((memoryDoc) => {
          batch.delete(memoryDoc.ref);
        });

        // 5. Delete user's progress data
        const progressSnapshot = await db.collection("progress")
          .where("userId", "==", userId)
          .get();
        
        progressSnapshot.docs.forEach((progressDoc) => {
          batch.delete(progressDoc.ref);
        });

        // 6. Delete user document
        batch.delete(db.collection("users").doc(userId));
      }

      // Commit all Firestore deletions
      await batch.commit();

      // 7. Delete Firebase Authentication user
      try {
        await admin.auth().deleteUser(userId);
      } catch (authError: any) {
        // If user doesn't exist in Auth, that's okay
        if (authError.code !== "auth/user-not-found") {
          console.error("Error deleting auth user:", authError);
          throw authError;
        }
      }

      return {
        success: true,
        message: `User ${userId} and all associated data deleted successfully`,
      };
    } catch (error: any) {
      console.error("Error deleting user:", error);

      // Re-throw HttpsErrors as-is
      if (error instanceof HttpsError) {
        throw error;
      }

      // Generic error
      throw new HttpsError(
        "internal",
        `Failed to delete user: ${error.message || "Unknown error"}`
      );
    }
  }
);

/**
 * Send welcome email when a new user is created
 * Triggers on new user document creation in Firestore
 */
export const sendWelcomeEmailOnUserCreate = onDocumentCreated(
  "users/{userId}",
  async (event) => {
    const userData = event.data?.data();
    
    if (!userData) {
      console.log("No user data found");
      return;
    }

    const {email, displayName, subscription} = userData;
    
    if (!email) {
      console.log("No email found for user");
      return;
    }

   // Send welcome email based on subscription plan
    const plan = subscription?.plan || "free";
    
    try {
      await sendWelcomeEmail(
        email,
        displayName || "Friend",
        plan as "free" | "individual" | "family"
      );
      console.log(`Welcome email sent to ${email} for ${plan} plan`);
      
      // Mark email as sent in user document
      await event.data?.ref.update({
        welcomeEmailSent: true,
        welcomeEmailSentAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Updated user document with email tracking for ${email}`);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      // Don't throw - we don't want to fail user creation if email fails
    }
  }
);

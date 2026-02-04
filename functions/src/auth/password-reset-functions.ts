/**
 * Custom Password Reset Functions for Tune My Heart
 * Provides branded email-based password reset flow
 */

import {onCall, HttpsError} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import {getPasswordResetEmailHTML} from "./password-reset-email-template";
import * as crypto from "crypto";

// Email transporter configuration
function getEmailTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables.");
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

// Generate secure random token
function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Request Password Reset
 * Generates a reset token, stores it in Firestore, and sends the branded email
 */
export const requestPasswordReset = onCall(
  async (request) => {
    const {email} = request.data;

    if (!email || typeof email !== "string") {
      throw new HttpsError("invalid-argument", "Email is required");
    }

    const db = admin.firestore();

    try {
      // Check if user exists
      let userRecord;
      try {
        userRecord = await admin.auth().getUserByEmail(email);
      } catch (error: any) {
        // Don't reveal if email exists or not - send success either way for security
        console.log(`Password reset requested for non-existent email: ${email}`);
        return {success: true};
      }

      // Get user's display name from Firestore
      const userDoc = await db.collection("users").doc(userRecord.uid).get();
      const userData = userDoc.data();
      const displayName = userData?.displayName || userRecord.displayName || "Friend";

      // Generate reset token
      const token = generateResetToken();
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

      // Store reset token in Firestore
      await db.collection("passwordResets").doc(token).set({
        email: email,
        uid: userRecord.uid,
        expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
        used: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Generate reset link
      const frontendUrl = getFrontendUrl();
      const resetLink = `${frontendUrl}/reset-password?token=${token}`;

      // Send email
      const transporter = getEmailTransporter();
      const mailOptions = {
        from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Password - Tune My Heart",
        html: getPasswordResetEmailHTML(displayName, resetLink),
      };

      await transporter.sendMail(mailOptions);

      console.log(`Password reset email sent to ${email}`);

      return {success: true};
    } catch (error: any) {
      console.error("Error in requestPasswordReset:", error);
      throw new HttpsError("internal", "Failed to process password reset request");
    }
  }
);

/**
 * Verify Reset Token
 * Checks if a reset token is valid and not expired
 */
export const verifyResetToken = onCall(
  async (request) => {
    const {token} = request.data;

    if (!token || typeof token !== "string") {
      throw new HttpsError("invalid-argument", "Token is required");
    }

    const db = admin.firestore();

    try {
      const resetDoc = await db.collection("passwordResets").doc(token).get();

      if (!resetDoc.exists) {
        return {valid: false, reason: "invalid"};
      }

      const resetData = resetDoc.data();
      if (!resetData) {
        return {valid: false, reason: "invalid"};
      }

      // Check if already used
      if (resetData.used) {
        return {valid: false, reason: "used"};
      }

      // Check if expired
      const expiresAt = resetData.expiresAt.toDate();
      if (new Date() > expiresAt) {
        return {valid: false, reason: "expired"};
      }

      // Token is valid
      return {
        valid: true,
        email: resetData.email,
      };
    } catch (error: any) {
      console.error("Error in verifyResetToken:", error);
      throw new HttpsError("internal", "Failed to verify reset token");
    }
  }
);

/**
 * Complete Password Reset
 * Verifies token and updates the user's password
 */
export const completePasswordReset = onCall(
  async (request) => {
    const {token, newPassword} = request.data;

    if (!token || typeof token !== "string") {
      throw new HttpsError("invalid-argument", "Token is required");
    }

    if (!newPassword || typeof newPassword !== "string") {
      throw new HttpsError("invalid-argument", "New password is required");
    }

    if (newPassword.length < 6) {
      throw new HttpsError("invalid-argument", "Password must be at least 6 characters");
    }

    const db = admin.firestore();

    try {
      // Get reset token document
      const resetDoc = await db.collection("passwordResets").doc(token).get();

      if (!resetDoc.exists) {
        throw new HttpsError("not-found", "Invalid reset token");
      }

      const resetData = resetDoc.data();
      if (!resetData) {
        throw new HttpsError("not-found", "Invalid reset token");
      }

      // Check if already used
      if (resetData.used) {
        throw new HttpsError("failed-precondition", "This reset link has already been used");
      }

      // Check if expired
      const expiresAt = resetData.expiresAt.toDate();
      if (new Date() > expiresAt) {
        throw new HttpsError("failed-precondition", "This reset link has expired");
      }

      // Update the user's password using Firebase Admin
      await admin.auth().updateUser(resetData.uid, {
        password: newPassword,
      });

      // Mark token as used
      await db.collection("passwordResets").doc(token).update({
        used: true,
        usedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Password reset completed for user: ${resetData.email}`);

      return {success: true};
    } catch (error: any) {
      console.error("Error in completePasswordReset:", error);
      
      if (error instanceof HttpsError) {
        throw error;
      }
      
      throw new HttpsError("internal", "Failed to reset password");
    }
  }
);

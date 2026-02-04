/**
 * Welcome email sending functions
 * Sends appropriate welcome email based on subscription plan
 */

import * as nodemailer from "nodemailer";
import {
  getFreeWelcomeEmailHTML,
  getIndividualWelcomeEmailHTML,
  getFamilyWelcomeEmailHTML,
} from "./welcome-email-templates";

// Email transporter configuration
function getEmailTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error(
      "Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD environment variables."
    );
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
 * Send welcome email based on subscription plan
 */
export async function sendWelcomeEmail(
  email: string,
  displayName: string,
  subscriptionPlan: "free" | "individual" | "family"
): Promise<void> {
  const frontendUrl = getFrontendUrl();
  const transporter = getEmailTransporter();

  let subject: string;
  let html: string;

  switch (subscriptionPlan) {
    case "free":
      subject = "Welcome to Tune My Heart! Your Journey Through God's Word Begins Today";
      html = getFreeWelcomeEmailHTML(displayName, frontendUrl);
      break;
    case "individual":
      subject = "Welcome to Tune My Heart Premium! Let's Get Started";
      html = getIndividualWelcomeEmailHTML(displayName, frontendUrl);
      break;
    case "family":
      subject = "Welcome to Tune My Heart Family! Growing Together in Faith";
      html = getFamilyWelcomeEmailHTML(displayName, frontendUrl);
      break;
    default:
      // Default to free email if plan is unknown
      subject = "Welcome to Tune My Heart! Your Journey Through God's Word Begins Today";
      html = getFreeWelcomeEmailHTML(displayName, frontendUrl);
  }

  await transporter.sendMail({
    from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });

  console.log(`Welcome email sent to ${email} (${subscriptionPlan} plan)`);
}

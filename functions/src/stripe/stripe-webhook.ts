/**
 * Stripe Webhook Handler
 * Processes Stripe events and updates Firestore
 */

import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {getStripeInstance, stripeSecretKey, STRIPE_PRICE_IDS} from "./stripe-config";
import {defineSecret} from "firebase-functions/params";
import {sendWelcomeEmail} from "../email/welcome-email-functions";

// Webhook signing secret
const webhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

/**
 * Helper function to determine plan from Stripe price ID
 */
function getPlanFromPriceId(priceId: string): "individual" | "family" | null {
  if (priceId === STRIPE_PRICE_IDS.individual) {
    return "individual";
  } else if (priceId === STRIPE_PRICE_IDS.family) {
    return "family";
  }
  return null;
}

/**
 * Helper function to detect plan from subscription
 * First tries metadata, then falls back to price ID lookup
 */
function detectPlan(subscription: any): "individual" | "family" {
  // Try metadata first
  if (subscription.metadata?.plan) {
    return subscription.metadata.plan as "individual" | "family";
  }

  // Fallback: check the price ID from line items
  if (subscription.items?.data?.[0]?.price?.id) {
    const priceId = subscription.items.data[0].price.id;
    const detectedPlan = getPlanFromPriceId(priceId);
    if (detectedPlan) {
      console.log(`Detected plan from price ID: ${detectedPlan}`);
      return detectedPlan;
    }
  }

  // Default to individual if we can't determine
  console.warn("Could not determine plan from subscription, defaulting to individual");
  return "individual";
}

/**
 * Handle Stripe webhook events
 */
export const stripeWebhook = onRequest(
  {secrets: [stripeSecretKey, webhookSecret]},
  async (request, response) => {
    const stripe = getStripeInstance();
    const sig = request.headers["stripe-signature"];

    if (!sig) {
      response.status(400).send("Missing stripe-signature header");
      return;
    }

    let event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        webhookSecret.value()
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log("Processing webhook event:", event.type);

    try {
      switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object);
        break;

      case "customer.subscription.trial_will_end":
        await handleTrialWillEnd(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
      }

      response.json({received: true});
    } catch (error: any) {
      console.error("Error processing webhook:", error);
      response.status(500).send(`Webhook processing error: ${error.message}`);
    }
  }
);

/**
 * Handle subscription created or updated
 */
async function handleSubscriptionUpdate(subscription: any) {
  const firebaseUID = subscription.metadata.firebaseUID;

  if (!firebaseUID) {
    console.error("No firebaseUID in subscription metadata");
    return;
  }

  const status = subscription.status;
  
  // Detect plan using helper function (tries metadata first, then price ID)
  const plan = detectPlan(subscription);

  // Map Stripe status to our status
  // IMPORTANT: Check for active trial by looking at trial_end timestamp
  // Stripe sometimes sets status to "active" even during trial period
  let subscriptionStatus: string;
  const hasActiveTrial = subscription.trial_end && subscription.trial_end * 1000 > Date.now();

  if (status === "trialing" || hasActiveTrial) {
    subscriptionStatus = "trial";
  } else if (status === "active") {
    // If subscription is active but set to cancel at period end, mark as cancelled
    // so the UI shows the correct state. When reactivated, this will flip back.
    subscriptionStatus = subscription.cancel_at_period_end ? "cancelled" : "active";
  } else if (status === "past_due") {
    subscriptionStatus = "past_due";
  } else if (status === "canceled" || status === "unpaid") {
    subscriptionStatus = "cancelled";
  } else {
    subscriptionStatus = status;
  }

  // Check if this is a new subscription or upgrade (send welcome email)
  const userDoc = await admin.firestore().collection("users").doc(firebaseUID).get();
  const userData = userDoc.data();
  const previousStatus = userData?.subscription?.status;
  
  // Send welcome email if:
  // 1. User is upgrading from free to paid (individual or family)
  // 2. User is creating a new paid subscription (no previous subscription or was free)
  const isUpgradeOrNewSubscription = (
    (previousStatus === "free" || !previousStatus) && 
    (plan === "individual" || plan === "family")
  );

  // Build update data - always update subscription fields
  const updateData: any = {
    "subscription.status": subscriptionStatus,
    "subscription.plan": plan,
    "subscription.stripeSubscriptionId": subscription.id,
    "subscription.currentPeriodEnd": new Date(subscription.current_period_end * 1000),
    "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
  };

  // Add trial end date if applicable
  if (subscription.trial_end) {
    updateData["subscription.trialEndsAt"] = new Date(subscription.trial_end * 1000);
  }

  // If plan is family, also update accountType and isHeadOfHousehold
  if (plan === "family") {
    updateData["accountType"] = "family";
    updateData["isHeadOfHousehold"] = true;
    console.log(`Setting accountType to family for user ${firebaseUID}`);
  }

  await admin.firestore().collection("users").doc(firebaseUID).update(updateData);

  console.log(`Updated subscription for user ${firebaseUID}: ${subscriptionStatus}, plan: ${plan}`);

  // Create family document if this is a family plan and user doesn't have one
  if (plan === "family" && !userData?.familyId) {
    try {
      const familyRef = admin.firestore().collection("families").doc();
      await familyRef.set({
        id: familyRef.id,
        headOfHousehold: firebaseUID,
        members: [firebaseUID],
        memberCount: 1,
        maxMembers: 6,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Update user with familyId
      await admin.firestore().collection("users").doc(firebaseUID).update({
        familyId: familyRef.id,
      });

      console.log(`Created family ${familyRef.id} for user ${firebaseUID}`);
    } catch (familyError) {
      console.error("Failed to create family document:", familyError);
      // Don't fail the webhook if family creation fails
    }
  }

  // Send welcome email for new subscriptions and upgrades
  if (isUpgradeOrNewSubscription && userData) {
    try {
      await sendWelcomeEmail(
        userData.email,
        userData.displayName || "Friend",
        plan as "individual" | "family"
      );
      console.log(`Welcome email sent to ${userData.email} for ${plan} plan`);
      
      // Mark email as sent in user document
      await admin.firestore().collection("users").doc(firebaseUID).update({
        welcomeEmailSent: true,
        welcomeEmailSentAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Updated user document with email tracking for ${userData.email}`);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the webhook if email fails
    }
  }
}

/**
 * Handle subscription deleted (cancelled immediately)
 */
async function handleSubscriptionDeleted(subscription: any) {
  const firebaseUID = subscription.metadata.firebaseUID;

  if (!firebaseUID) {
    console.error("No firebaseUID in subscription metadata");
    return;
  }

  await admin.firestore().collection("users").doc(firebaseUID).update({
    "subscription.status": "cancelled",
    "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log(`Cancelled subscription for user ${firebaseUID}`);
}

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(invoice: any) {
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) {
    return;
  }

  // Query for user with this subscription ID
  const usersSnapshot = await admin.firestore()
    .collection("users")
    .where("subscription.stripeSubscriptionId", "==", subscriptionId)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    console.error(`No user found for subscription ${subscriptionId}`);
    return;
  }

  const userDoc = usersSnapshot.docs[0];

  // Fetch the subscription from Stripe to check trial status
  const stripe = getStripeInstance();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Determine if the subscription is still in trial
  const hasActiveTrial = subscription.trial_end && subscription.trial_end * 1000 > Date.now();

  // Only set to "active" if the trial has ended
  // If still in trial, keep it as "trial"
  const subscriptionStatus = hasActiveTrial ? "trial" : "active";

  const updateData: any = {
    "subscription.status": subscriptionStatus,
    "subscription.currentPeriodEnd": new Date(invoice.period_end * 1000),
    "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
  };

  // If in trial, also update trialEndsAt
  if (hasActiveTrial && subscription.trial_end) {
    updateData["subscription.trialEndsAt"] = new Date(subscription.trial_end * 1000);
  }

  await userDoc.ref.update(updateData);

  console.log(`Payment succeeded for user ${userDoc.id}, status: ${subscriptionStatus}`);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: any) {
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) {
    return;
  }

  // Query for user with this subscription ID
  const usersSnapshot = await admin.firestore()
    .collection("users")
    .where("subscription.stripeSubscriptionId", "==", subscriptionId)
    .limit(1)
    .get();

  if (usersSnapshot.empty) {
    console.error(`No user found for subscription ${subscriptionId}`);
    return;
  }

  const userDoc = usersSnapshot.docs[0];

  await userDoc.ref.update({
    "subscription.status": "past_due",
    "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log(`Payment failed for user ${userDoc.id}`);

  // TODO: Send email notification to user about failed payment
}

/**
 * Handle trial ending soon (3 days before)
 */
async function handleTrialWillEnd(subscription: any) {
  const firebaseUID = subscription.metadata.firebaseUID;

  if (!firebaseUID) {
    console.error("No firebaseUID in subscription metadata");
    return;
  }

  console.log(`Trial ending soon for user ${firebaseUID}`);

  // TODO: Send email notification to user about trial ending
}

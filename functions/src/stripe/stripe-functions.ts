/**
 * Stripe Cloud Functions
 */

import {onCall, HttpsError, CallableRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {getStripeInstance, STRIPE_PRICE_IDS, stripeSecretKey} from "./stripe-config";

/**
 * Create a Stripe checkout session with trial period
 */
export const createCheckoutSession = onCall(
  {secrets: [stripeSecretKey]},
  async (request: CallableRequest) => {
    const {data, auth} = request;

    // Verify user is authenticated
    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be authenticated to create a checkout session"
      );
    }

    const {plan, successUrl, cancelUrl, skipTrial} = data;

    // Validate plan
    if (!plan || (plan !== "individual" && plan !== "family")) {
      throw new HttpsError(
        "invalid-argument",
        "Invalid plan. Must be \"individual\" or \"family\""
      );
    }

    const stripe = getStripeInstance();
    const userId = auth.uid;

    try {
      // Get user data
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData) {
        throw new HttpsError("not-found", "User document not found");
      }

      // Get or create Stripe customer
      let customerId = userData.subscription?.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: userData.email,
          name: userData.displayName || userData.email,
          description: "Tune My Heart subscriber",
          metadata: {
            firebaseUID: userId,
            app: "Tune My Heart",
          },
        });
        customerId = customer.id;

        // Update user document with customer ID
        await admin.firestore().collection("users").doc(userId).update({
          "subscription.stripeCustomerId": customerId,
          "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
        });
      }

      // Create checkout session, with trial only for new subscribers
      const subscriptionData: any = {
        description: `Tune My Heart - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
        metadata: {
          firebaseUID: userId,
          plan: plan,
          app: "Tune My Heart",
          service: "Tune My Heart Subscription",
        },
      };

      // Only offer trial to new subscribers, not returning users
      if (!skipTrial) {
        subscriptionData.trial_period_days = 7;
      }

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: STRIPE_PRICE_IDS[plan as "individual" | "family"],
            quantity: 1,
          },
        ],
        subscription_data: subscriptionData,
        success_url: successUrl || `${process.env.FRONTEND_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/signup`,
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      throw new HttpsError("internal", error.message);
    }
  }
);

/**
 * Create a subscription with payment method (for embedded checkout)
 */
export const createSubscription = onCall(
  {secrets: [stripeSecretKey]},
  async (request: CallableRequest) => {
    const {data, auth} = request;

    // Verify user is authenticated
    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be authenticated to create a subscription"
      );
    }

    const {plan, paymentMethodId} = data;

    // Validate inputs
    if (!plan || (plan !== "individual" && plan !== "family")) {
      throw new HttpsError(
        "invalid-argument",
        "Invalid plan. Must be \"individual\" or \"family\""
      );
    }

    if (!paymentMethodId) {
      throw new HttpsError(
        "invalid-argument",
        "Payment method ID is required"
      );
    }

    const stripe = getStripeInstance();
    const userId = auth.uid;

    try {
      // Get user data
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData) {
        throw new HttpsError("not-found", "User document not found");
      }

      // Get or create Stripe customer
      let customerId = userData.subscription?.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: userData.email,
          name: userData.displayName || userData.email,
          description: "Tune My Heart subscriber",
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
          metadata: {
            firebaseUID: userId,
            app: "Tune My Heart",
          },
        });
        customerId = customer.id;
      } else {
        // Attach payment method to existing customer
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: customerId,
        });

        // Set as default payment method
        await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
      }

      // Create subscription with 7-day trial
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: STRIPE_PRICE_IDS[plan as "individual" | "family"],
          },
        ],
        description: `Tune My Heart - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
        trial_period_days: 7,
        payment_settings: {
          payment_method_types: ["card"],
          save_default_payment_method: "on_subscription",
        },
        metadata: {
          firebaseUID: userId,
          plan: plan,
          app: "Tune My Heart",
          service: "Tune My Heart Subscription",
        },
      });

      // Update user document with subscription info
      await admin.firestore().collection("users").doc(userId).update({
        "subscription.status": "trial",
        "subscription.plan": plan,
        "subscription.stripeCustomerId": customerId,
        "subscription.stripeSubscriptionId": subscription.id,
        "subscription.trialEndsAt": new Date(subscription.trial_end! * 1000),
        "subscription.currentPeriodEnd": new Date(subscription.current_period_end * 1000),
        "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        subscriptionId: subscription.id,
        status: subscription.status,
        trialEnd: subscription.trial_end,
      };
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      throw new HttpsError("internal", error.message);
    }
  }
);

/**
 * Cancel a subscription
 */
export const cancelSubscription = onCall(
  {secrets: [stripeSecretKey]},
  async (request: CallableRequest) => {
    const {auth} = request;

    // Verify user is authenticated
    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be authenticated to cancel subscription"
      );
    }

    const stripe = getStripeInstance();
    const userId = auth.uid;

    try {
      // Get user data
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData || !userData.subscription?.stripeSubscriptionId) {
        throw new HttpsError("not-found", "No active subscription found");
      }

      // Cancel the subscription at period end
      await stripe.subscriptions.update(userData.subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      // Update user document
      await admin.firestore().collection("users").doc(userId).update({
        "subscription.status": "cancelled",
        "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
      });

      return {success: true};
    } catch (error: any) {
      console.error("Error cancelling subscription:", error);
      throw new HttpsError("internal", error.message);
    }
  }
);

/**
 * Reactivate a cancelled subscription
 * If the subscription was cancelled with cancel_at_period_end, simply reverses that.
 * If the subscription is fully expired, creates a new checkout session instead.
 */
export const reactivateSubscription = onCall(
  {secrets: [stripeSecretKey]},
  async (request: CallableRequest) => {
    const {auth} = request;

    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be authenticated to reactivate subscription"
      );
    }

    const stripe = getStripeInstance();
    const userId = auth.uid;

    try {
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData || !userData.subscription?.stripeSubscriptionId) {
        throw new HttpsError("not-found", "No subscription found to reactivate");
      }

      const subscriptionId = userData.subscription.stripeSubscriptionId;

      // Retrieve the subscription from Stripe to check its actual state
      let subscription;
      try {
        subscription = await stripe.subscriptions.retrieve(subscriptionId);
      } catch {
        // Subscription no longer exists in Stripe — need a new checkout
        return {action: "new_checkout_required"};
      }

      // If the subscription is still active but set to cancel at period end,
      // we can simply reverse that
      if (
        subscription.status === "active" &&
        subscription.cancel_at_period_end
      ) {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: false,
        });

        // Update Firestore
        await admin.firestore().collection("users").doc(userId).update({
          "subscription.status": "active",
          "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
        });

        return {action: "reactivated"};
      }

      // If the subscription is trialing and set to cancel, reverse it
      if (
        subscription.status === "trialing" &&
        subscription.cancel_at_period_end
      ) {
        await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: false,
        });

        await admin.firestore().collection("users").doc(userId).update({
          "subscription.status": "trial",
          "updatedAt": admin.firestore.FieldValue.serverTimestamp(),
        });

        return {action: "reactivated"};
      }

      // If the subscription is fully canceled/expired, a new checkout is needed
      if (
        subscription.status === "canceled" ||
        subscription.status === "unpaid" ||
        subscription.status === "incomplete_expired"
      ) {
        return {action: "new_checkout_required"};
      }

      // For any other state (past_due, etc.), send them to the portal
      return {action: "portal_required"};
    } catch (error: any) {
      if (error instanceof HttpsError) throw error;
      console.error("Error reactivating subscription:", error);
      throw new HttpsError("internal", error.message);
    }
  }
);

/**
 * Get customer portal URL for managing subscription
 */
export const createPortalSession = onCall(
  {secrets: [stripeSecretKey]},
  async (request: CallableRequest) => {
    const {data, auth} = request;

    // Verify user is authenticated
    if (!auth) {
      throw new HttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    const {returnUrl} = data;
    const stripe = getStripeInstance();
    const userId = auth.uid;

    try {
      // Get user data
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData || !userData.subscription?.stripeCustomerId) {
        throw new HttpsError("not-found", "No Stripe customer found");
      }

      // Create portal session with explicit configuration that includes
      // subscription management (cancel, update, reactivate), payment
      // method updates, and invoice history.
      const session = await stripe.billingPortal.sessions.create({
        customer: userData.subscription.stripeCustomerId,
        return_url: returnUrl || `${process.env.FRONTEND_URL}/subscription`,
        configuration: "bpc_1TJaReDdvLsK34JxydvS5ALq",
      });

      return {url: session.url};
    } catch (error: any) {
      console.error("Error creating portal session:", error);
      throw new HttpsError("internal", error.message);
    }
  }
);

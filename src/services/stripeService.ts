/**
 * Stripe Service - Frontend
 * Handles Stripe integration and calls to Firebase Cloud Functions
 */

import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('Stripe publishable key not found in environment variables');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

/**
 * Create a subscription with payment method
 * Used for embedded checkout (payment form in signup page)
 */
export const createSubscription = async (
  plan: 'individual' | 'family',
  paymentMethodId: string
): Promise<{ subscriptionId: string; status: string; trialEnd: number }> => {
  try {
    const createSubscriptionFn = httpsCallable(functions, 'createSubscription');
    const result = await createSubscriptionFn({
      plan,
      paymentMethodId,
    });

    return result.data as { subscriptionId: string; status: string; trialEnd: number };
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    throw new Error(error.message || 'Failed to create subscription');
  }
};

/**
 * Create a Stripe checkout session
 * Redirects user to Stripe hosted checkout page
 */
export const createCheckoutSession = async (
  plan: 'individual' | 'family',
  successUrl?: string,
  cancelUrl?: string,
  skipTrial?: boolean
): Promise<{ sessionId: string; url: string }> => {
  try {
    const createCheckoutSessionFn = httpsCallable(functions, 'createCheckoutSession');
    const result = await createCheckoutSessionFn({
      plan,
      successUrl: successUrl || `${window.location.origin}/`,
      cancelUrl: cancelUrl || `${window.location.origin}/signup`,
      skipTrial: skipTrial || false,
    });

    return result.data as { sessionId: string; url: string };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }
};

/**
 * Reactivate a cancelled subscription
 * Returns the action taken: 'reactivated', 'new_checkout_required', or 'portal_required'
 */
export const reactivateSubscription = async (): Promise<{ action: string }> => {
  try {
    const reactivateSubscriptionFn = httpsCallable(functions, 'reactivateSubscription');
    const result = await reactivateSubscriptionFn();

    return result.data as { action: string };
  } catch (error: any) {
    console.error('Error reactivating subscription:', error);
    throw new Error(error.message || 'Failed to reactivate subscription');
  }
};

/**
 * Cancel current subscription
 */
export const cancelSubscription = async (): Promise<{ success: boolean }> => {
  try {
    const cancelSubscriptionFn = httpsCallable(functions, 'cancelSubscription');
    const result = await cancelSubscriptionFn();

    return result.data as { success: boolean };
  } catch (error: any) {
    console.error('Error cancelling subscription:', error);
    throw new Error(error.message || 'Failed to cancel subscription');
  }
};

/**
 * Get Stripe customer portal URL
 * User can manage their subscription, update payment method, view invoices
 */
export const createPortalSession = async (
  returnUrl?: string
): Promise<{ url: string }> => {
  try {
    const createPortalSessionFn = httpsCallable(functions, 'createPortalSession');
    const result = await createPortalSessionFn({
      returnUrl: returnUrl || `${window.location.origin}/subscription`,
    });

    return result.data as { url: string };
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    throw new Error(error.message || 'Failed to create portal session');
  }
};

/**
 * Create payment method from Stripe Elements
 */
export const createPaymentMethod = async (
  stripe: Stripe,
  elements: StripeElements,
  billingDetails: {
    name: string;
    email: string;
  }
): Promise<string> => {
  const cardElement = elements.getElement('card');
  
  if (!cardElement) {
    throw new Error('Card element not found');
  }

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: billingDetails,
  });

  if (error) {
    throw new Error(error.message || 'Failed to create payment method');
  }

  if (!paymentMethod) {
    throw new Error('Payment method creation failed');
  }

  return paymentMethod.id;
};

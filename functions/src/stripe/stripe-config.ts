/**
 * Stripe Configuration
 */

import Stripe from "stripe";
import {defineSecret} from "firebase-functions/params";

// Define secret for Stripe API key
export const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

// Stripe price IDs - PRODUCTION (LIVE MODE)
export const STRIPE_PRICE_IDS = {
  individual: "price_1Si2rHDdvLsK34Jx1YZ3y7Qt", // $15/year - LIVE
  family: "price_1Si2sYDdvLsK34Jx3T8iLyCp", // $20/year - LIVE
};

/**
 * Initialize Stripe instance
 */
export const getStripeInstance = (): Stripe => {
  const apiKey = stripeSecretKey.value();
  return new Stripe(apiKey, {
    apiVersion: "2023-10-16",
  });
};

# Trial Status Webhook Fix

## Problem Identified

Users who purchased a plan with a 7-day trial were incorrectly showing as "Active" in the Admin Dashboard instead of "Trial".

## Root Cause

The issue was in the Stripe webhook handler (`functions/src/stripe/stripe-webhook.ts`). When users signed up for a subscription with a trial:

1. Stripe created a $0 invoice for the trial period
2. Stripe immediately fired the `invoice.payment_succeeded` webhook event
3. The `handlePaymentSucceeded` function **unconditionally** set the subscription status to "active"
4. This overwrote the correct "trial" status that had just been set by the `customer.subscription.created` event

## The Fix

### 1. Updated Webhook Handler

Modified the `handlePaymentSucceeded` function in `functions/src/stripe/stripe-webhook.ts` to:

- Fetch the subscription from Stripe to check its trial status
- Check if there's an active trial (`trial_end` timestamp exists and is in the future)
- Only set status to "active" if the trial has actually ended
- Keep status as "trial" if still within the trial period

**Key changes:**
```typescript
// Fetch the subscription from Stripe to check trial status
const stripe = getStripeInstance();
const subscription = await stripe.subscriptions.retrieve(subscriptionId);

// Determine if the subscription is still in trial
const hasActiveTrial = subscription.trial_end && subscription.trial_end * 1000 > Date.now();

// Only set to "active" if the trial has ended
const subscriptionStatus = hasActiveTrial ? "trial" : "active";
```

### 2. Created Cleanup Script

Created `scripts/fix-active-trial-users.cjs` to identify and fix existing users who were incorrectly marked as "active" when they should be "trial".

## Deployment

The updated webhook handler has been deployed to Firebase:
- **Function:** `stripeWebhook`
- **URL:** https://stripewebhook-4g55gn3axa-uc.a.run.app
- **Deployed:** December 27, 2025

## Testing

To verify the fix is working:

1. **Check existing trial users:**
   ```bash
   node scripts/fix-active-trial-users.cjs
   ```
   This will identify any users currently marked as "active" who should be "trial"

2. **Monitor new signups:**
   - Create a new test subscription with trial
   - Check the Admin Dashboard to verify the user shows as "Trial"
   - Verify the trial end date is displayed correctly

3. **Check webhook logs:**
   - Visit Firebase Console > Functions > stripeWebhook
   - Review logs to ensure the webhook is correctly detecting trial status

## How It Works Now

### Webhook Event Flow

1. **User signs up for paid plan:**
   - `customer.subscription.created` fires → Sets status to "trial" (already working correctly)
   
2. **Stripe creates $0 trial invoice:**
   - `invoice.payment_succeeded` fires → **NOW checks trial status first**
   - If `trial_end` is in the future → Keeps status as "trial"
   - If trial has expired → Sets status to "active"

3. **Trial period ends:**
   - Stripe charges the card
   - `invoice.payment_succeeded` fires → Sets status to "active" (trial_end is in past)

### Admin Dashboard Display

The Admin Dashboard now correctly shows:
- **Trial badge** (yellow) for users with active trials
- **Active badge** (green) for users with paid subscriptions (trial ended)
- Trial end date is displayed in user details

## Future Maintenance

If similar issues arise:

1. Check the webhook handler logs in Firebase Console
2. Verify Stripe webhook events are being received correctly
3. Use the cleanup script to fix any incorrectly marked users
4. Consider adding automated tests for webhook handlers

## Files Modified

- `functions/src/stripe/stripe-webhook.ts` - Fixed handlePaymentSucceeded function
- `scripts/fix-active-trial-users.cjs` - New script to fix existing users

## Related Documentation

- `TRIAL_STATUS_FIX.md` - Previous trial status fix (addressed different issue)
- `WEBHOOK_SETUP_INSTRUCTIONS.md` - Webhook configuration guide
- `STRIPE_IMPLEMENTATION_GUIDE.md` - Overall Stripe integration documentation

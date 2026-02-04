# Trial Status Display Fix

## Issue Summary
Users with 7-day trials in Stripe were showing as "Active" instead of "Trial" in the admin dashboard.

## Root Cause
The Stripe webhook handler was incorrectly mapping subscription status. Stripe sometimes sets `status: "active"` even when a subscription is in a trial period. The actual trial status should be determined by checking if the `trial_end` timestamp exists and is in the future, not just by the status field alone.

## Fix Applied
**Date:** December 26, 2025

### 1. Updated Webhook Handler
Modified `functions/src/stripe/stripe-webhook.ts` to properly detect trial periods:

```typescript
// BEFORE:
if (status === "trialing") {
  subscriptionStatus = "trial";
} else if (status === "active") {
  subscriptionStatus = "active";
}

// AFTER:
const hasActiveTrial = subscription.trial_end && subscription.trial_end * 1000 > Date.now();

if (status === "trialing" || hasActiveTrial) {
  subscriptionStatus = "trial";
} else if (status === "active") {
  subscriptionStatus = "active";
}
```

This ensures that any subscription with a future `trial_end` date will be marked as "trial" regardless of what Stripe reports as the status.

### 2. Created Diagnostic Script
Created `scripts/fix-trial-status.cjs` to:
- Find users incorrectly marked as "active" who have future trial end dates
- Update their status to "trial"
- Can be run anytime with: `node scripts/fix-trial-status.cjs`

### 3. Deployed Updated Functions
Successfully deployed the updated webhook handler to Firebase Cloud Functions.

## Current Status for rcgroxz@gmail.com
When the diagnostic script was run, **no users were found** with incorrect trial status. This means either:
1. The status was already corrected manually via the admin dashboard, OR
2. The webhook had already updated their status to "trial"

## How to Manually Fix User Status (If Needed)

If you need to manually correct a user's status in the future:

1. Go to the Admin Dashboard
2. Find the user (rcgroxz@gmail.com) using the search bar
3. Click the "Edit" button (pencil icon) next to their name
4. In the "Subscription Status" section, click "trial"
5. Click "Close"

The change will be saved immediately to Firestore.

## Prevention
With the updated webhook handler now deployed, this issue will not occur for:
- New subscriptions with trials
- Existing subscriptions when they receive webhook updates from Stripe

## Testing the Fix

To verify the fix is working:

1. **For New Signups:** Create a test subscription with a 7-day trial in Stripe
2. **Check Stripe:** Verify the subscription shows a trial period
3. **Check Admin Dashboard:** Verify the user shows as "Trial" (not "Active")
4. **Wait for Trial End:** After trial ends and payment processes, status should change to "Active"

## Additional Notes

- The webhook handler now checks both `status === "trialing"` AND the presence of a future `trial_end` timestamp
- This handles edge cases where Stripe's status field may not accurately reflect the trial state
- The fix is backward compatible and won't affect users without trials
- Email reminders and premium access checks already properly respect trial status via the `hasPremiumAccess()` helper function

## Files Modified
1. `functions/src/stripe/stripe-webhook.ts` - Updated trial detection logic
2. `scripts/fix-trial-status.cjs` - New diagnostic/repair script
3. `functions/` - Redeployed to production

## Deployment Details
- Deployment Date: December 26, 2025
- Deploy Command: `firebase deploy --only functions`
- Status: ✅ Successful
- All functions updated and running on Firebase Cloud Functions (2nd Gen)

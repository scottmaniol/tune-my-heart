# Stripe Subscription Implementation Guide

## ✅ What's Been Completed (Phase 1-3)

### 1. Dependencies Installed
- ✅ Frontend: `@stripe/stripe-js`, `@stripe/react-stripe-js`
- ✅ Backend: `stripe` package

### 2. Type System Updated
- ✅ Added 'free' subscription plan type
- ✅ Updated subscription statuses: free, trial, active, past_due, cancelled
- ✅ Helper functions: `hasPremiumAccess()`, `isTrialExpired()`, `getTrialDaysRemaining()`
- ✅ Fixed all TypeScript errors

### 3. Backend Cloud Functions Created
- ✅ `functions/src/stripe/stripe-config.ts` - Stripe configuration
- ✅ `functions/src/stripe/stripe-functions.ts` - 4 callable functions:
  - `createCheckoutSession` - Create Stripe checkout with trial
  - `createSubscription` - Create subscription with payment method
  - `cancelSubscription` - Cancel user subscription
  - `createPortalSession` - Get billing portal URL
- ✅ `functions/src/stripe/stripe-webhook.ts` - Webhook handler for Stripe events
- ✅ Updated `functions/src/index.ts` to export all Stripe functions

---

## 🚨 CRITICAL: Environment Variables Setup

Before deployment, you MUST set up these secrets in Firebase:

### Step 1: Set Stripe Secret Key
```bash
cd functions
firebase functions:secrets:set STRIPE_SECRET_KEY
```
When prompted, paste: `sk_test_51MKsG0DdvLsK34JxCXJvw3gUbW3IIKUPO1WkbZxAcRIFQdFSMi19XuQpjOoOc5xDqKKcMKHSP5F4GMNxfhbywdk300aBIQ6Bdp`

### Step 2: Set Stripe Webhook Secret (After deploying webhook)
```bash
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```
You'll get this value from Stripe Dashboard after setting up the webhook (see Step 7 below)

### Step 3: Add Stripe Publishable Key to Frontend
Add to `.env.local`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51MKsG0DdvLsK34JxumMK3gr0zKWW6Gc4v521G3I7jqMzDForff7zC7BeIjgA2Ytu8W3iqrMlmRmw76pLk3J2ntcN00AlCO1Otj
```

---

## 📋 Remaining Implementation Steps

### Step 4: Build Stripe Service Layer (Frontend)
Create `src/services/stripeService.ts`:
- Load Stripe instance with publishable key
- Call Firebase Cloud Functions for subscriptions
- Handle payment errors

### Step 5: Create Signup Flow Components
Update `src/pages/auth/SignUp.tsx`:
- Add plan selector (Free / Individual $15 / Family $20)
- Show Stripe card input for paid plans
- Integrate with Stripe Elements
- Call `createSubscription` function on submit

### Step 6: Update Access Control
- Update `src/components/auth/PremiumContentOverlay.tsx` to check `hasPremiumAccess()`
- Update `src/pages/ReadingPlan.tsx` to show reflection questions for free users

### Step 7: Deploy Functions & Configure Webhook
```bash
# Build and deploy functions
cd functions
npm run build
firebase deploy --only functions
```

After deployment:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://YOUR-PROJECT.cloudfunctions.net/stripeWebhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.trial_will_end`
4. Copy the webhook signing secret
5. Set it: `firebase functions:secrets:set STRIPE_WEBHOOK_SECRET`
6. Redeploy: `firebase deploy --only functions`

### Step 8: Create Subscription Management Page
Create `src/pages/Subscription.tsx`:
- Show current plan
- Display trial countdown or next billing date
- Cancel subscription button  
- Upgrade from free button
- Link to Stripe customer portal

### Step 9: Test Implementation
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

Test scenarios:
1. Free signup (no payment)
2. Individual trial signup
3. Family trial signup
4. Trial expiration
5. Cancellation
6. Payment failure

---

## 🎯 Subscription Flow

### Free Plan
1. User selects "Free Limited Account"
2. No payment info required
3. Gets access to:
   - ✅ Reflection questions
   - ✅ Save progress
   - ✅ Bible preferences
   - ❌ Summary, Notes, Devotional

### Individual Plan ($15/year)
1. User selects "Individual"
2. Enters credit card (Stripe Elements)
3. Gets 7-day free trial
4. Full access during trial
5. Auto-charged after 7 days
6. Can cancel anytime

### Family Plan ($20/year)
1. User selects "Family"
2. Enters credit card (Stripe Elements)
3. Gets 7-day free trial
4. Full access during trial
5. Auto-charged after 7 days
6. Can add up to 6 family members
7. All family members get premium access

---

## 📊 Subscription Status Flow

```
Free → (unchangeable, limited access forever)

Individual/Family Selection →
  Trial (7 days, full access) →
    Cancel → Free
    Keep → Active (charged, full access) →
      Payment Success → Active
      Payment Failure → Past Due → Cancelled
      Manual Cancel → Cancelled (access until period end)
```

---

## 🔒 Access Control Rules

### Free Users Can:
- View reflection questions
- Save answers to reflection questions
- Save Bible preferences (translation, plan type)
- Choose schedule start date
- Mark readings as complete
- Save progress

### Premium Users (Trial/Active) Get Additionally:
- Summary content
- Study notes
- Daily devotional

---

## 🚀 Deployment Checklist

- [ ] Set `STRIPE_SECRET_KEY` secret in Firebase
- [ ] Add `VITE_STRIPE_PUBLISHABLE_KEY` to `.env.local`
- [ ] Build functions: `cd functions && npm run build`
- [ ] Deploy functions: `firebase deploy --only functions`
- [ ] Configure Stripe webhook in Dashboard
- [ ] Set `STRIPE_WEBHOOK_SECRET` in Firebase
- [ ] Redeploy functions
- [ ] Build and deploy frontend
- [ ] Test all subscription flows

---

## 📞 Support

If you encounter issues:
1. Check Firebase Functions logs: `firebase functions:log`
2. Check Stripe Dashboard → Developers → Webhooks for delivery status
3. Verify all secrets are set correctly
4. Test with Stripe test cards in test mode

---

## 💡 Next Development Session

When you're ready to continue, I recommend:
1. Reviewing this guide carefully
2. Setting up the environment variables (Step 1-3)
3. Then we'll build the frontend components together (Steps 4-6)
4. Finally, deploy and test everything (Steps 7-9)

The backend is complete and type-safe! The remaining work is primarily frontend UI components.

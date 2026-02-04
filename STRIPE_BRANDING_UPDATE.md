# Stripe "Tune My Heart" Branding Update

## Summary

This update ensures that all Stripe transactions and products clearly display "Tune My Heart" branding, making it easy for your finance manager to identify transactions in the Stripe dashboard.

## Changes Made

### 1. Code Updates (Applied to New Subscriptions)

Updated `functions/src/stripe/stripe-functions.ts` to include:

- **Customer Records**: Now include "Tune My Heart" in customer descriptions and metadata
- **Subscription Metadata**: All subscriptions  include "Tune My Heart" references
- **Product Descriptions**: Clear "Tune My Heart - [Plan Type]" naming

These changes will apply automatically to all NEW subscriptions created after deployment.

### 2. What Your Finance Manager Will See

After these updates, Stripe transactions will show:

✅ **In Stripe Dashboard**:
- Product Name: "Tune My Heart - Individual Plan" or "Tune My Heart - Family Plan"
- Customer Description: "Tune My Heart subscriber"
- Subscription metadata includes "app: Tune My Heart"

✅ **On Invoices**:
- Line items show: "Tune My Heart - Individual/Family Plan"

✅ **In Payment Lists**:
- Clear "Tune My Heart" branding in product name column

✅ **Customer Records**:
- Metadata includes "app: Tune My Heart" for easy filtering and searching

## How to Update Existing Stripe Products

You have **two options** to update your existing Stripe products with "Tune My Heart" branding:

### Option 1: Manual Update in Stripe Dashboard (Easiest)

1. Go to https://dashboard.stripe.com/products
2. Click on your **Individual Plan** product
3. Update the following:
   - **Name**: Tune My Heart - Individual Plan
   - **Description**: Annual subscription to Tune My Heart - Individual Plan ($15/year)
   - **Statement Descriptor**: TUNE MY HEART
   - Under **Metadata**, add:
     - `app`: Tune My Heart
     - `plan`: individual
     - `service`: Tune My Heart Subscription
4. Click **Save**
5. Repeat for your **Family Plan** product with:
   - **Name**: Tune My Heart - Family Plan
   - **Description**: Annual subscription to Tune My Heart - Family Plan ($20/year)
   - **Statement Descriptor**: TUNE MY HEART
   - Under **Metadata**, add:
     - `app`: Tune My Heart
     - `plan`: family
     - `service`: Tune My Heart Subscription

### Option 2: Run the Automated Script

If you prefer to update via script:

```bash
# Get your Stripe Secret Key from: https://dashboard.stripe.com/apikeys
# Then run:
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx node scripts/update-stripe-products.cjs
```

The script will:
- Update both Individual and Family product names
- Add "Tune My Heart" to descriptions
- Set statement descriptors
- Add helpful metadata for tracking

## Deployment Instructions

### Step 1: Deploy the Code Changes

```bash
# Build the functions
cd functions
npm run build

# Deploy to Firebase
cd ..
firebase deploy --only functions
```

### Step 2: Update Existing Products

Choose **Option 1** (Manual) or **Option 2** (Script) from above.

## Verification

After deployment and product updates:

1. **Check Stripe Dashboard**:
   - Go to https://dashboard.stripe.com/products
   - Verify product names show "Tune My Heart"

2. **Check Existing Subscriptions**:
   - Go to https://dashboard.stripe.com/subscriptions
   - Click on any subscription
   - Verify product name shows "Tune My Heart"

3. **Test New Subscription** (Optional):
   - Create a test subscription on your site
   - Check Stripe dashboard
   - Verify the new subscription shows proper "Tune My Heart" branding

## Key Points

✅ **All new subscriptions** will automatically include "Tune My Heart" branding after deployment

✅ **Existing subscriptions** will also show the new branding once you update the products in Stripe (updating products affects all subscriptions using those products)

✅ **Your finance manager** will now clearly see "Tune My Heart" in:
   - Payment lists
   - Invoice details
   - Customer records
   - Product names
   - Metadata filters

✅ **No customer impact**: Updating product names/descriptions doesn't affect customer billing or subscriptions

## Questions?

If transactions still don't show "Tune My Heart" clearly:
1. Verify functions were deployed: `firebase functions:log`
2. Check product updates were saved in Stripe dashboard
3. For new subscriptions, verify the webhook is working properly
4. Check customer metadata includes "app: Tune My Heart"

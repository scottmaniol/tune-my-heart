# Stripe Webhook Setup Instructions

## Step-by-Step Guide

The Stripe Dashboard should now be open in your browser at: https://dashboard.stripe.com/test/webhooks

### 1. Add Webhook Endpoint

Click the **"Add endpoint"** button (usually a blue button in the top right)

### 2. Configure Endpoint URL

In the "Endpoint URL" field, paste this EXACT URL:
```
https://us-central1-tune-my-heart.cloudfunctions.net/stripeWebhook
```

### 3. Select Events

Click **"Select events"** and choose these 6 events:
- ✅ `customer.subscription.created`
- ✅ `customer.subscription.updated`  
- ✅ `customer.subscription.deleted`
- ✅ `invoice.payment_succeeded`
- ✅ `invoice.payment_failed`
- ✅ `customer.subscription.trial_will_end`

**TIP:** You can use the search box to find these events quickly

### 4. Create the Endpoint

Click **"Add endpoint"** button at the bottom

### 5. Get Your Signing Secret

After the endpoint is created:
1. Click on the endpoint you just created (in the webhooks list)
2. Find the "Signing secret" section
3. Click **"Reveal"** or **"Click to reveal"**
4. **COPY** the secret (it starts with `whsec_...`)

### 6. Update Firebase Secret

Once you have copied the signing secret (`whsec_...`), let me know and I'll help you update Firebase!

---

## What This Does

The webhook allows Stripe to notify your Firebase backend when:
- A subscription is created (user signs up)
- A subscription is updated (plan change, renewal)
- A subscription is cancelled
- A payment succeeds (after trial ends)
- A payment fails (declined card)
- A trial is ending soon (3 days warning)

This keeps your database in sync with Stripe automatically!

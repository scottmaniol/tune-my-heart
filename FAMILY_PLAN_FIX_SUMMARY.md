# Family Plan Account Type Fix - Summary

## Problem
Users subscribing to the family plan were being correctly charged and had `subscription.plan = "family"`, but their `accountType` remained as `"individual"`. This prevented them from managing family members and accessing family features.

## Root Cause
The Stripe webhook handler (`functions/src/stripe/stripe-webhook.ts`) was only updating the `subscription.plan` field when processing subscription events. It was NOT updating the `accountType` field or creating the necessary family structures.

## Solution Implemented

### 1. Updated Webhook Handler
**File:** `functions/src/stripe/stripe-webhook.ts`

**Changes:**
- Added helper functions to detect plan from Stripe metadata OR price ID (fallback)
- Modified `handleSubscriptionUpdate()` to:
  - Use intelligent plan detection (tries metadata first, then price ID lookup)
  - Set `accountType = "family"` when plan is family
  - Set `isHeadOfHousehold = true` for family plan subscribers
  - Create family document in Firestore if user doesn't have one
  
**Key Code Addition:**
```typescript
// If plan is family, also update accountType and isHeadOfHousehold
if (plan === "family") {
  updateData["accountType"] = "family";
  updateData["isHeadOfHousehold"] = true;
  console.log(`Setting accountType to family for user ${firebaseUID}`);
}

// Create family document if this is a family plan and user doesn't have one
if (plan === "family" && !userData?.familyId) {
  // Creates family document and links user
}
```

### 2. Fixed Existing Users
**Script:** `scripts/fix-family-account-types.cjs`

**Execution Results:**
- Found 31 total family plan subscribers
- 11 were already correctly configured
- **20 users were fixed**, including:
  - Updated `accountType` to "family"
  - Set `isHeadOfHousehold` to true
  - Created family documents where missing
  - Linked users to their family documents

**Users Fixed:**
1. ruthkreager@gmail.com
2. pastorjeremymercer@gmail.com
3. bekahburkeybabyboy@gmail.com
4. mdburkey4@gmail.com
5. sommerjoylau@gmail.com
6. regulator1776@gmail.com
7. Laufamily828@gmail.com
8. cramerk87@gmail.com
9. pastorcooke@gmail.com
10. katelynaniol@gmail.com
11. vshawgo86@gmail.com
12. **joshuadalebowman@icloud.com** (the reported case)
13. mckenna.pagel@gmail.com
14. courtney.vandelden08@gmail.com
15. nylover284@gmail.com
16. elliyahhope9@gmail.com
17. lilypellegra@gmail.com
18. autumnglau@gmail.com
19. graceap2004@gmail.com
20. amypellegra@bellsouth.net

### 3. Deployed Updated Functions
- Successfully deployed all Firebase Cloud Functions
- The webhook is now live and will properly configure future family plan subscribers

## Prevention
Going forward, ALL new family plan subscriptions will:
1. Automatically set `accountType = "family"`
2. Automatically set `isHeadOfHousehold = true`
3. Automatically create a family document
4. Work even if metadata is missing (uses price ID fallback)

## Testing Recommendation
For any new family plan subscriptions:
1. Verify `accountType` matches `subscription.plan`
2. Verify `isHeadOfHousehold` is set to true
3. Verify `familyId` exists and links to a valid family document
4. Verify user can access family management features

## Date Fixed
January 2, 2026

## Files Modified
- `functions/src/stripe/stripe-webhook.ts` - Enhanced webhook handler
- `scripts/fix-family-account-types.cjs` - One-time fix script (can be run again if needed)

# Admin User Creation Improvements

## Date: December 26, 2025

## Issues Fixed

### 1. Trial Status for Admin-Created Users
**Problem**: When creating users through the admin dashboard, they were automatically put on "trial" status with a 7-day expiration, even though they should get immediate active access.

**Solution**: Updated the Cloud Function to give admin-created users `status: "active"` immediately, with no trial period.

### 2. Missing Family Documents
**Problem**: When creating a user with `accountType: "family"`, the Cloud Function did NOT create a corresponding family document or assign a `familyId`. This caused:
- Users being incorrectly grouped in the admin dashboard
- Data corruption (orphaned family accounts)
- Same issue that affected Laramie Minga

**Solution**: Added logic to automatically create a family document when `accountType === "family"`, including:
- Creating the family document in Firestore
- Setting the user as head of household
- Assigning the `familyId` to the user document

## Changes Made

### File: `functions/src/admin/admin-functions.ts`

#### Change 1: Active Status (Lines 251-257)
**Before:**
```typescript
const subscription: any = plan === "free"
  ? { status: "free", plan: "free" }
  : {
      status: "trial",
      plan: plan,
      trialEndsAt: admin.firestore.Timestamp.fromDate(
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      ),
    };
```

**After:**
```typescript
const subscription: any = plan === "free"
  ? { status: "free", plan: "free" }
  : { status: "active", plan: plan };
```

#### Change 2: Family Document Creation (After line 289)
**Added:**
```typescript
// 4. If account type is family, create a family document
if (accountType === "family") {
  const familyRef = admin.firestore().collection("families").doc();
  const familyId = familyRef.id;

  await familyRef.set({
    headOfHousehold: uid,
    members: [uid],
    memberCount: 1,
    maxMembers: 10,
    createdAt: now,
    updatedAt: now,
  });

  // Update user document with familyId
  await admin.firestore()
    .collection("users")
    .doc(uid)
    .update({
      familyId: familyId,
      updatedAt: now,
    });

  console.log(`Created family document ${familyId} for user ${email}`);
}
```

## Results

### Admin-Created Users Now Get:
1. **Immediate Active Access**: No trial period - users with individual or family plans get `status: "active"` right away
2. **Proper Family Setup**: Family account users automatically get:
   - A unique family document in the `families` collection
   - Their own `familyId` in their user document
   - Correct head of household status
   - Ability to add family members

### Benefits:
- **No more data corruption**: All family accounts now have proper family documents
- **Better user experience**: Admin-created users don't have to wait through a trial
- **Correct admin dashboard display**: Users will be properly grouped
- **Prevents future Laramie Minga-type issues**: All family accounts are now properly initialized

## Deployment

Successfully deployed on December 26, 2025:
```
✔  functions[createUserByAdmin(us-central1)] Successful update operation.
✔  Deploy complete!
```

## Testing

To test the changes:
1. Log into admin dashboard
2. Create a new user with "Family" account type
3. Verify in Firestore:
   - User document has `status: "active"` (not "trial")
   - User document has a `familyId`
   - Corresponding family document exists in `families` collection
4. Check admin dashboard to ensure user is displayed correctly

## Related Documentation
- See `FAMILY_GROUPING_FIX_SUMMARY.md` for the Laramie Minga data corruption fix that identified this underlying issue

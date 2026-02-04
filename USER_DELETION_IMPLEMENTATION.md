# User Deletion Implementation

## Overview
This document describes the complete user deletion implementation that allows admin users to delete users from the Admin Dashboard. The deletion process removes both Firebase Authentication records and all associated data from Firestore.

## Components

### 1. Cloud Function: `deleteUserAccount`
**Location:** `functions/src/user/user-functions.ts`

This Cloud Function handles the complete deletion of a user account, including:

#### What Gets Deleted:
- ✅ Firebase Authentication user account
- ✅ User document in Firestore (`users` collection)
- ✅ User's journal entries (`journals` collection)
- ✅ User's progress data (`progress` collection)
- ✅ User's memory box data (`memoryBox` collection)
- ✅ Family associations (removed from family members array)
- ✅ Family documents (if user is head of household)

#### Security:
- Only callable by authenticated admin users
- Validates caller's admin role before processing
- Validates userId parameter

#### Error Handling:
- Gracefully handles non-existent users
- Proper error messages for different failure scenarios
- Transaction-safe batch operations for Firestore deletions

### 2. Frontend Service: `userService.deleteUser`
**Location:** `src/services/userService.ts`

Updated to call the Cloud Function instead of just deleting the Firestore document:

```typescript
export const deleteUser = async (uid: string): Promise<void> => {
  const functions = getFunctions();
  const deleteUserAccount = httpsCallable(functions, 'deleteUserAccount');
  
  try {
    const result = await deleteUserAccount({ userId: uid });
    console.log('User deleted successfully:', result.data);
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw new Error(error.message || 'Failed to delete user');
  }
};
```

### 3. Admin Dashboard UI
**Location:** `src/pages/AdminDashboard.tsx`

The Admin Dashboard already has:
- User listing table with delete buttons
- Confirmation dialog before deletion
- Automatic refresh after deletion
- Error handling and user feedback

## Usage

### For Administrators:

1. Navigate to the Admin Dashboard
2. Find the user you want to delete in the users table
3. Click the trash icon (🗑️) in the Actions column
4. Confirm the deletion in the popup dialog
5. The user and all their data will be permanently deleted
6. The user list will automatically refresh

### Important Notes:

⚠️ **This action is irreversible!** Once deleted:
- The user cannot log in anymore
- All their data is permanently removed
- If they were a head of household, their entire family is deleted
- If they were a family member, they're removed from the family

## Family Account Handling

### Regular Family Members:
- User is removed from the family's members array
- Family's `memberCount` is decremented
- Family remains intact for other members

### Head of Household:
- All families where the user is head of household are deleted
- This also affects all family members who will lose their family association
- Consider reassigning family ownership before deleting heads of household

## Deployment

The Cloud Function has been deployed to Firebase:

```bash
firebase deploy --only functions:deleteUserAccount
```

## Testing

To test the deletion functionality:

1. **As an admin user**, log in to the application
2. Navigate to `/admin` (Admin Dashboard)
3. Try deleting a test user account
4. Verify in Firebase Console that:
   - User is removed from Authentication
   - User document is deleted from Firestore
   - Associated data is deleted (journals, progress, memoryBox)
   - Family associations are properly handled

## Error Scenarios

The implementation handles these scenarios:

1. **User doesn't exist in Firestore**: Proceeds to delete from Auth
2. **User doesn't exist in Auth**: Proceeds to delete from Firestore
3. **Non-admin attempts deletion**: Returns permission-denied error
4. **Unauthenticated request**: Returns unauthenticated error
5. **Invalid userId parameter**: Returns invalid-argument error

## Future Enhancements

Potential improvements:
- [ ] Add soft-delete capability (mark as deleted instead of removing)
- [ ] Export user data before deletion (GDPR compliance)
- [ ] Send deletion confirmation email
- [ ] Add audit logging for deletions
- [ ] Allow head of household transfer before deletion
- [ ] Batch user deletion for multiple users

## Related Files

- `functions/src/user/user-functions.ts` - Cloud Function implementation
- `functions/src/index.ts` - Function export
- `src/services/userService.ts` - Frontend service
- `src/pages/AdminDashboard.tsx` - Admin UI
- `firestore.rules` - Security rules (ensure admin-only access)

## Security Considerations

✅ **Implemented:**
- Admin-only access validation
- Server-side enforcement (cannot be bypassed from client)
- Proper error handling without exposing sensitive info

⚠️ **Recommendations:**
- Regularly audit admin users
- Monitor deletion logs in Cloud Functions logs
- Consider requiring multi-factor authentication for admin accounts
- Implement rate limiting if needed

## Support

For issues or questions:
1. Check Cloud Functions logs in Firebase Console
2. Review browser console for client-side errors
3. Verify admin role is properly set in user document
4. Ensure Cloud Function is deployed and active

# Email Reminder Default Fix

## Issue
- Users were not receiving daily emails even though they were subscribed
- The `emailReminders` preference was not being set during user creation
- Only users with explicit "daily" setting were receiving emails
- This meant new users and legacy users missed emails on their first day

## Root Cause
1. **Frontend**: `createUserDocument()` and `createUserDocumentWithFamilyCheck()` in `src/services/userService.ts` did not set `emailReminders` in the default preferences
2. **Backend Functions**: 
   - `functions/src/admin/admin-functions.ts` set it to "never" for admin-created users
   - `functions/src/family/family-functions.ts` didn't set it at all for family members
3. **Email Function**: Only queried for users with `emailReminders === "daily"`, excluding users without the field set

## Changes Made

### 1. Frontend (src/services/userService.ts)
- Added `emailReminders: 'daily'` to default preferences in `createUserDocument()`
- Added `emailReminders: 'daily'` to default preferences in `createUserDocumentWithFamilyCheck()`

### 2. Backend Functions

#### functions/src/admin/admin-functions.ts
- Changed `emailReminders: "never"` to `emailReminders: "daily"` for admin-created users

#### functions/src/family/family-functions.ts
- Added `emailReminders: "daily"` to preferences for family member accounts

#### functions/src/email/email-functions.ts
- Updated `sendDailyReminders()` to include backward compatibility:
  - Now fetches ALL users and filters in code
  - Includes users with `emailReminders === "daily"` OR users without the field set (legacy users)
  - This ensures existing users without preferences still get emails until they opt out

## Impact

### New Users (after deployment)
- Will automatically get `emailReminders: "daily"` set on account creation
- Will receive daily emails starting the next weekday at 5:00 AM EST

### Existing Users (legacy)
- Users without `emailReminders` set will NOW receive daily emails (backward compatible)
- They can opt out by changing preferences to "weekly", "when-behind", or "never"

### Schedule
- Daily emails: Monday-Friday at 5:00 AM EST
- Weekly emails: Monday at 5:00 AM EST
- Behind reminders: Monday at 5:05 AM EST

## Testing
1. New signups should have `emailReminders: "daily"` in their user document
2. Tomorrow (Jan 6, 2026) at 5:00 AM EST, all users should receive daily emails (including those without preference set)
3. Users can change their preference in Settings > Preferences

## Deployment
```bash
# Build functions
cd functions && npm run build

# Deploy functions only (email logic changed)
firebase deploy --only functions

# Deploy frontend (default preference changed)  
npm run build
firebase deploy --only hosting
```

## Files Modified
1. `src/services/userService.ts` - Added emailReminders to default preferences (2 locations)
2. `functions/src/admin/admin-functions.ts` - Changed default from "never" to "daily"
3. `functions/src/family/family-functions.ts` - Added emailReminders to family member defaults
4. `functions/src/email/email-functions.ts` - Added backward compatibility for legacy users

## Date
January 5, 2026 - 6:30 PM EST

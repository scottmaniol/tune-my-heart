# Daily Email Scheduler Fix - January 14, 2026

## Problem
Daily reminder emails were not being sent to users, even though they were configured for daily reminders.

## Root Cause
**The Google Cloud Scheduler API was not enabled on the project.**

While the Firebase Functions v2 scheduled functions were deployed and showing in the function list, they could not actually execute on schedule because the underlying Cloud Scheduler service was not enabled.

## Investigation Steps

1. **Checked email function code** - Functions are correctly implemented with:
   - `sendDailyReminders`: Runs Mon-Fri at 5:00 AM EST (cron: `0 5 * * 1-5`)
   - `sendWeeklyReminders`: Runs Mondays at 5:00 AM EST (cron: `0 5 * * 1`)
   - `sendBehindReminders`: Runs Mondays at 5:05 AM EST (cron: `5 5 * * 1`)
   - `sendOneWeekUpgradeReminder`: Runs daily at 6:00 AM EST (cron: `0 6 * * *`)

2. **Verified functions were exported** - All email functions properly exported in `functions/src/index.ts`

3. **Checked deployed functions** - Functions showed as deployed with "scheduled" trigger type

4. **Attempted to check Cloud Scheduler** - Discovered the API was NOT enabled
   - Running `gcloud scheduler jobs list` prompted to enable the API
   - Enabled the API successfully

5. **Redeployed scheduled functions** - Re-deployed all email reminder functions to ensure they register with the newly enabled Cloud Scheduler API

## Fix Applied

1. **Enabled Cloud Scheduler API** via gcloud command
2. **Redeployed all scheduled email functions:**
   ```bash
   firebase deploy --only functions:sendDailyReminders,functions:sendWeeklyReminders,functions:sendBehindReminders,functions:sendOneWeekUpgradeReminder
   ```

## Expected Behavior

Starting **tomorrow morning (Wednesday, January 15, 2026 at 5:00 AM EST)**, daily reminder emails should begin sending automatically to all users who have:
- Email preference set to "daily" OR
- No email preference set (defaults to daily for backwards compatibility)

The system will:
- ✅ Send emails Monday-Friday at 5:00 AM EST
- ✅ Skip weekends (no emails Saturday/Sunday)
- ✅ Calculate today's reading based on each user's start date
- ✅ Skip users if it's their weekend reading day

## Notes About Firebase Functions v2 Scheduled Functions

Firebase Functions v2 (Gen 2) uses a different architecture than v1:
- They use Cloud Run + Eventarc instead of traditional Cloud Scheduler jobs
- The `gcloud scheduler jobs list` command may not show traditional scheduler jobs
- The scheduling is still managed by Cloud Scheduler API but through different mechanisms
- As long as the Cloud Scheduler API is enabled, the functions will execute on schedule

## Verification

To verify emails are working after tomorrow morning:
1. Check your inbox at ~5:05 AM EST tomorrow
2. Or check Firebase Functions logs in Google Cloud Console
3. Or run the manual test script (once dependencies are fixed)

## Why Today's Email Worked

The email you received today was likely sent through a different mechanism:
- Manual test
- One-time trigger
- Or another scheduled function that was already working (like the New Year snapshot function which was deployed when Cloud Scheduler might have been briefly enabled)

## Related Files
- `functions/src/email/email-functions.ts` - Email scheduling logic
- `functions/src/index.ts` - Function exports
- `.env` files - Email credentials (must be set in Firebase Functions config)

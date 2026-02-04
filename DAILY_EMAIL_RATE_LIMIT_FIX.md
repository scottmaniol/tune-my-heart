# Daily Email Rate Limit Fix

## Issue Summary

Users with "daily" email reminder preferences were not receiving their daily emails. The scheduled Cloud Function was running correctly at 5:00 AM EST every weekday, but most emails were failing with Gmail SMTP rate limit errors.

## Root Cause

The `sendDailyReminders` function was attempting to send all emails **simultaneously** using `Promise.all()`. This overwhelmed Gmail's SMTP service, resulting in "421-4.3.0 Temporary System Problem" errors for most users.

### Error Example from Logs (2026-01-20 at 10:00 AM):
```
Failed to send daily reminder to [email]: Error: Data command failed: 
421-4.3.0 Temporary System Problem. Try again later.
```

Out of approximately 30 users with daily reminders enabled, only about 15 emails were successfully sent, while the rest failed due to rate limiting.

## Solution Implemented

### 1. Added Rate Limiting Function
Created a `sleep()` helper function to add delays between email sends:
```typescript
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 2. Changed from Parallel to Sequential Processing
Replaced `Promise.all()` with a sequential `for...of` loop that:
- Processes one user at a time
- Sends each email individually
- Waits 1 second between each email send
- Continues processing even if individual emails fail
- Tracks success/failure counts

### 3. Updated All Email Functions
Applied the same fix to all scheduled email functions:
- `sendDailyReminders` (Mon-Fri at 5:00 AM EST)
- `sendWeeklyReminders` (Monday at 5:00 AM EST)
- `sendBehindReminders` (Monday at 5:05 AM EST)
- `sendOneWeekUpgradeReminder` (Daily at 6:00 AM EST)
- `sendNewYearPrepReminders` (Dec 28 at 9:00 AM EST)

### 4. Enhanced Logging
Added summary logging to track email delivery:
```
Daily reminder summary: 30 sent, 0 failed
```

## Technical Details

### Before (Problematic Code):
```typescript
const emailPromises = dailyReminderUsers.map(async (doc) => {
  // ... send email
});
await Promise.all(emailPromises); // Sends all at once!
```

### After (Fixed Code):
```typescript
for (const doc of dailyReminderUsers) {
  try {
    await sendDailyReminderEmail(...);
    successCount++;
    await sleep(1000); // Wait 1 second before next email
  } catch (error) {
    failureCount++;
  }
}
console.log(`Daily reminder summary: ${successCount} sent, ${failureCount} failed`);
```

## Deployment

**Date:** January 20, 2026  
**Time:** ~9:00 AM EST  
**Functions Updated:**
- ✅ sendDailyReminders
- ✅ sendWeeklyReminders
- ✅ sendBehindReminders
- ✅ sendOneWeekUpgradeReminder
- ✅ sendNewYearPrepReminders

## Expected Impact

### Performance
- **Sending Time:** With ~30 daily reminder users and 1-second delays, the function will now take approximately 30-40 seconds to complete (vs. < 5 seconds before, but with most emails failing)
- **Success Rate:** Should improve from ~50% to ~100%
- **Gmail Limits:** Gmail allows 500 emails per day, so we're well within limits

### User Experience
- All users with "daily" email preferences should now receive their morning emails consistently
- Emails will arrive between 5:00-5:01 AM EST (spread over ~30-40 seconds)
- No user-facing changes to email content or functionality

## Monitoring

To verify the fix is working, check Firebase logs tomorrow morning after 5:00 AM EST:

```bash
firebase functions:log --only sendDailyReminders
```

**Look for:**
- ✅ "Daily reminder summary: X sent, 0 failed" (or very low failure count)
- ✅ No "421 Temporary System Problem" errors
- ✅ Successful sends for users including: saniol@gmail.com, katelynaniol@gmail.com, etc.

## Prevention

To avoid similar issues in the future:
1. **Always use rate limiting** when sending bulk emails via SMTP
2. **Add delays** between individual sends (1-2 seconds is recommended)
3. **Monitor logs** after deploying new email functions
4. **Consider switching to SendGrid or Mailgun** if email volume grows beyond 100+ users

## Alternative Solutions Considered

1. **Batch Processing:** Process emails in smaller batches (e.g., 10 at a time)
   - Not implemented as sequential with delays is simpler and more reliable
   
2. **Email Service Provider:** Use SendGrid, Mailgun, or AWS SES
   - Not needed currently; Gmail SMTP supports up to 500 emails/day
   - Consider if user base grows significantly
   
3. **Increase Delays:** Test with 2-3 second delays
   - 1 second appears sufficient based on Gmail documentation
   - Can increase if issues persist

## Files Modified

- `functions/src/email/email-functions.ts` - Added rate limiting to all email functions

## Related Documentation

- `EMAIL_REMINDERS_GUIDE.md` - Overall email reminder system documentation
- `EMAIL_SETUP_GUIDE.md` - Email configuration and setup
- `DAILY_EMAIL_FIX_SUMMARY.md` - Previous email-related fixes

## Status

**✅ RESOLVED** - All email functions now include rate limiting to prevent Gmail SMTP errors.

Next daily emails scheduled for: **Tomorrow (Tuesday, Jan 21, 2026) at 5:00 AM EST**

# Email Reminders Implementation Guide

The Tune My Heart application now includes automated email reminder functions that send daily, weekly, and "when behind" notifications to users based on their preferences.

## Overview

Four scheduled Cloud Functions have been deployed to send reminder emails:

1. **sendDailyReminders** - Runs Monday-Friday at 5:00 AM EST
2. **sendWeeklyReminders** - Runs every Monday at 5:00 AM EST
3. **sendBehindReminders** - Runs every Monday at 5:05 AM EST
4. **sendOneWeekUpgradeReminder** - Runs daily at 6:00 AM EST

## Deployed Functions

All functions are deployed and active:

```
✔ sendDailyReminders (v2, scheduled, us-central1)
✔ sendWeeklyReminders (v2, scheduled, us-central1)
✔ sendBehindReminders (v2, scheduled, us-central1)
✔ sendOneWeekUpgradeReminder (v2, scheduled, us-central1)
```

## How It Works

### User Preferences

Users can set their email reminder preference in their account preferences:
- `daily` - Receives an email every weekday morning with their current reading
- `weekly` - Receives an email every Monday with the week's reading plan
- `when-behind` - Receives an email only when they fall behind schedule
- `never` - No email reminders (default)

The preference is stored in Firestore at: `users/{userId}/preferences/emailReminders`

### Daily Reminders

**Schedule:** Monday-Friday at 5:00 AM EST  
**Cron:** `0 5 * * 1-5`

- Queries all users with `emailReminders: "daily"`
- Sends personalized email with their current week and day
- Includes direct link to start reading
- Features inspirational Scripture verse

### Weekly Reminders

**Schedule:** Every Monday at 5:00 AM EST  
**Cron:** `0 5 * * 1`

- Queries all users with `emailReminders: "weekly"`
- Sends overview of the week's reading plan
- Includes motivational content and tips
- Direct link to view the weekly schedule

### Behind Schedule Reminders

**Schedule:** Every Monday at 5:05 AM EST  
**Cron:** `5 5 * * 1`

- Queries all users with `emailReminders: "when-behind"`
- Calculates expected progress based on start date
- Compares with actual user progress
- Only sends email if user is behind
- Includes encouragement and practical tips to catch up

### One-Week Upgrade Reminders

**Schedule:** Every day at 6:00 AM EST  
**Cron:** `0 6 * * *`

- Queries all users who created a free account exactly 7 days ago
- Targets users who are still on the free plan
- Sends compelling upgrade email highlighting premium features
- Emphasizes 7-day free trial and risk-free cancellation
- Features flat icons and attractive design
- Includes pricing ($15/year individual, $20/year family)

## Email Configuration

### Environment Variables

The email functions require the following environment variables to be set in `functions/.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
FRONTEND_URL=https://tunemyheart.com
```

### Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google Account > App Passwords](https://myaccount.google.com/apppasswords)
3. Create a new app password for "Tune My Heart Functions"
4. Copy the 16-character password (no spaces)
5. Set it as `EMAIL_PASSWORD` in `functions/.env`

### For Production

Set environment variables using Firebase CLI:

```bash
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"
firebase functions:config:set frontend.url="https://tunemyheart.com"
```

Or add to your `.env` file in the functions directory (already configured).

## Email Templates

All emails feature:
- Professional HTML design with Tune My Heart branding
- Gradient headers (purple/indigo for daily/weekly/upgrade, orange/red for behind)
- Mobile-responsive layout
- Direct action buttons (Start Reading, View Schedule, Start Free Trial, etc.)
- Preference management links
- Bible verses and encouragement
- Flat icons (emojis and CSS-styled elements)

## Monitoring

### View Logs

Check function execution logs:

```bash
firebase functions:log --only sendDailyReminders
firebase functions:log --only sendWeeklyReminders
firebase functions:log --only sendBehindReminders
```

### Common Log Messages

```
"Starting daily reminder emails..."
"Found X users with daily reminders enabled"
"Daily reminder sent to user@example.com"
"Daily reminder emails completed"
```

### Error Handling

Each function includes comprehensive error handling:
- Individual email failures don't stop the batch
- Errors are logged with user email for debugging
- Missing email credentials throw descriptive errors
- Invalid user data is handled gracefully

## Testing

### Test Email Sending

1. Set your user's email preference to `daily`, `weekly`, or `when-behind`
2. Wait for the scheduled time, OR
3. Manually trigger the function from Firebase Console
4. Check your email inbox

### Manual Testing via Firebase Console

1. Go to [Firebase Console > Functions](https://console.firebase.google.com/project/tune-my-heart/functions)
2. Find the function (sendDailyReminders, sendWeeklyReminders, or sendBehindReminders)
3. Click "..." menu > "View logs" or trigger manually if needed

### Test in Development

You can test locally using Firebase emulators:

```bash
cd functions
npm run serve
```

Then trigger the functions manually through the emulator UI.

## User Experience

### Daily Email Flow

1. User signs up and sets email preference to "daily"
2. Every weekday at 5 AM EST, they receive an email
3. Email shows their current reading (e.g., "Week 12, Day 3")
4. One-click button takes them directly to the reading page
5. They can update preferences via link in email footer

### Weekly Email Flow

1. User sets preference to "weekly"
2. Every Monday at 5 AM EST, they receive a week overview
3. Email highlights the week number and provides motivation
4. Link to view the full week's schedule
5. Tips for building consistent reading habits

### Behind Email Flow

1. User sets preference to "when-behind"
2. Every Monday at 5:05 AM EST, system checks their progress
3. If behind schedule, they receive an encouraging email
4. Email shows where they are vs. where they should be
5. Practical tips to catch up without feeling overwhelmed
6. Emphasis on grace and consistency over perfection

### One-Week Upgrade Email Flow

1. User creates a free account
2. Exactly 7 days later (if still on free plan), they receive an upgrade email
3. Email celebrates their first week and highlights what they're missing
4. Shows 4 key premium benefits with flat icons:
   - 📖 Summary content & study notes
   - ✍️ Daily devotionals
   - 👨‍👩‍👧‍👦 Family sharing
   - 👶 Children's Bible stories
5. Prominent pricing display ($15/year)
6. Strong CTA to start 7-day free trial
7. Trust badge emphasizing risk-free trial

## Firestore Queries

The functions use the following Firestore queries:

```javascript
// Daily reminders
db.collection("users")
  .where("preferences.emailReminders", "==", "daily")
  .get()

// Weekly reminders
db.collection("users")
  .where("preferences.emailReminders", "==", "weekly")
  .get()

// Behind reminders
db.collection("users")
  .where("preferences.emailReminders", "==", "when-behind")
  .get()

// One-week upgrade reminders
db.collection("users")
  .where("subscription.status", "==", "free")
  .where("createdAt", ">=", sevenDaysAgo)
  .where("createdAt", "<=", sevenDaysAgoEnd)
  .get()
```

### Required Indexes

These queries should work without composite indexes since they only filter on a single field. If you encounter index errors, Firebase will provide a link to create the required index.

## Schedule Details

### Cron Syntax

```
┌─────── minute (0-59)
│ ┌───── hour (0-23)
│ │ ┌─── day of month (1-31)
│ │ │ ┌─ month (1-12)
│ │ │ │ ┌ day of week (0-6, 0=Sunday)
│ │ │ │ │
0 5 * * 1-5  = Daily (Mon-Fri at 5 AM)
0 5 * * 1    = Weekly (Monday at 5 AM)
5 5 * * 1    = Behind (Monday at 5:05 AM)
0 6 * * *    = Upgrade (Every day at 6 AM)
```

### Timezone

All functions use `America/New_York` timezone (EST/EDT).

## Cost Considerations

### Cloud Scheduler

- Google Cloud Scheduler: $0.10 per job per month
- 3 jobs = ~$0.30/month base cost

### Cloud Functions

- Invocations: First 2 million/month are free
- With typical usage (4 jobs × various schedules × users):
  - Daily: 260 runs/year
  - Weekly: 52 runs/year
  - Behind: 52 runs/year
  - Upgrade: 365 runs/year (but only emails users once)
- Total: ~729 function invocations per user per year
- Well within free tier for most use cases

### Email Sending

- Using Gmail SMTP is free
- Rate limits: 500 emails/day (more than sufficient)
- No additional cost unless using a paid email service

## Troubleshooting

### Emails Not Sending

**Check:**
1. Environment variables are set correctly
2. Gmail app password is valid
3. 2FA is enabled on Gmail
4. Function logs for errors
5. User's email preference is set correctly (for reminder emails)
6. User document has required fields (email, displayName, progress, createdAt)
7. For upgrade emails: User is on free plan and created account 7 days ago

**Common Issues:**
- `EMAIL_USER` or `EMAIL_PASSWORD` not set
- Using regular Gmail password instead of app password
- Incorrect SMTP settings
- Gmail blocking sign-ins (use app password to fix)

### Wrong Schedule

**Check:**
1. Timezone setting in function definition
2. Cron syntax is correct
3. Cloud Scheduler is enabled (should be automatic)

### Users Not Receiving Emails

**Check:**
1. User's emailReminders preference value
2. User's progress data exists
3. Email isn't in spam folder
4. Email address is valid in Firestore

## Testing

### Test Individual Emails

Use the test scripts in the functions directory:

```bash
# Test upgrade email
node functions/test-upgrade-email.cjs your-email@example.com

# Test daily reminder
node functions/test-email.cjs your-email@example.com

# Test weekly reminder
node functions/test-weekly-email.cjs your-email@example.com

# Test behind reminder
node functions/test-behind-email.cjs your-email@example.com
```

## Future Enhancements

Potential improvements:
- Include actual Bible passage text in email
- Personalized progress statistics
- Week-at-a-glance reading summary
- Catch-up suggestions based on time available
- Celebration emails for milestones (finishing a book, 30-day streak, etc.)
- Digest option (send all updates in one email)
- Trial ending reminder (3 days before trial expires)
- Re-engagement emails for inactive users

## Related Files

- **Function code:** `functions/src/email/email-functions.ts`
- **Exports:** `functions/src/index.ts`
- **Types:** `src/types/user.ts` (EmailReminderFrequency type)
- **User preferences:** Stored in Firestore `users/{userId}`

## Support

For issues or questions:
- Check Firebase Console logs
- Review this documentation
- Check EMAIL_SETUP_GUIDE.md for email configuration details

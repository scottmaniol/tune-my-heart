# New Year Preparation Email Implementation

## Overview
Implemented an annual email that sends to all users on December 28th each year, encouraging them to prepare for a fresh start in Bible reading and family worship for the new year.

## Implementation Date
December 27, 2025

## Email Details

### Subject Line
🎊 A New Year of Bible Reading Awaits!

### Schedule
- **Date:** December 28th (annually)
- **Time:** 9:00 AM EST
- **Timezone:** America/New_York
- **Cron Schedule:** `"0 9 28 12 *"`

### Target Audience
ALL users (no filtering by preferences - this is an annual encouragement to the entire user base)

### Design Specifications
- **Primary Color:** #2a5876
- **Icons:** Flat, geometric icons only (no gradients or 3D effects)
- **Layout:** Responsive, max-width 600px
- **Style:** Consistent with existing email templates

## Email Content

### Sections

1. **Header**
   - #2a5876 background
   - Tune My Heart logo
   - Brand name

2. **Hero Section** (No icon - per user request)
   - Headline: "Get Ready for a Fresh Start!"
   - Personalized greeting with user's display name
   - Subheading about the new year

3. **Main Encouragement**
   - Celebrates what God has done
   - Excitement about fresh start
   - Spiritual encouragement about consistency

4. **Tips Section** (4 tips with flat icons)
   - 📅 **Set Your Start Date** - Custom start date feature reminder
   - 🎯 **Finish Strong** - Encouragement to complete current readings
   - 👨‍👩‍👧 **Make It a Family Habit** - Family worship tips
   - 📖 **Stay Consistent** - Practical consistency tips

5. **CTA Button**
   - Text: "Prepare for the New Year"
   - Links to: Dashboard
   - Color: #2a5876

6. **Scripture Quote**
   - Lamentations 3:22-23 (ESV)
   - About God's mercies being new every morning
   - Styled with left border accent

7. **Footer**
   - Standard footer with links
   - Preferences link
   - Copyright notice

## Files Created/Modified

### New Files
1. **functions/src/email/new-year-prep-email-template.ts**
   - Email HTML template with flat icons
   - Exports `getNewYearPrepEmailHTML(displayName, frontendUrl, nextYear)`

2. **functions/test-new-year-email.cjs**
   - Test script to preview the email
   - Run with: `node functions/test-new-year-email.cjs`

### Modified Files
1. **functions/src/email/email-functions.ts**
   - Added import for new template
   - Added `sendNewYearPrepReminders` scheduled function
   - Gets ALL users and sends email to each

2. **functions/src/index.ts**
   - Exported `sendNewYearPrepReminders` function

## Technical Details

### Cloud Function
- **Name:** `sendNewYearPrepReminders`
- **Type:** Scheduled (Cloud Scheduler)
- **Region:** us-central1
- **Runtime:** Node.js 20 (2nd Gen)

### Function Logic
1. Runs automatically on December 28th at 9:00 AM EST every year
2. Fetches ALL users from Firestore (no filtering)
3. Calculates next year dynamically (current year + 1)
4. Sends personalized email to each user
5. Logs success/failure for each email
6. Continues on errors (doesn't stop sending to other users)

### Error Handling
- Individual email failures are logged but don't stop the batch
- Uses try/catch for each user's email
- Comprehensive logging for debugging

## Testing

### Manual Test
Run the test script to send a test email:
```bash
node functions/test-new-year-email.cjs
```

The test will:
- Send email to the test address (default: saniol@gmail.com)
- Use "Test User" as the display name
- Calculate and display next year
- Show confirmation when sent

### Production Testing
The function will automatically run on December 28, 2026 at 9:00 AM EST for the first time.

## Key Features

✅ **Automatic Scheduling** - Runs every December 28th without manual intervention
✅ **All Users** - Sends to entire user base (no opt-out for this annual email)
✅ **Dynamic Year** - Automatically calculates and displays next year
✅ **Flat Icon Design** - Uses simple, clean flat icons with #2a5876 color
✅ **Responsive Layout** - Works on all email clients and devices
✅ **Personalization** - Includes user's display name
✅ **Encouragement Focus** - Balances celebration, practical tips, and spiritual encouragement
✅ **Start Date Reminder** - Highlights the ability to set custom start dates (January 1st)
✅ **Family Focus** - Includes family worship tips and encouragement
✅ **Scripture Based** - Features Lamentations 3:22-23 about God's mercies

## Deployment Status

✅ **Cloud Function Deployed** - December 27, 2025
- Function created successfully in us-central1
- Scheduled to run annually on December 28th at 9:00 AM EST

## Next Steps

1. **Monitor First Run** - Check logs on December 28, 2026 to verify successful execution
2. **Review Metrics** - Track open rates and click-through rates
3. **Gather Feedback** - See if users find the timing and content helpful
4. **Consider Variations** - Could create different versions for different user segments in future years

## Notes

- This email is sent to ALL users regardless of email preferences
- It's an annual encouragement, not a regular reminder
- The email emphasizes that users can set custom start dates
- Focuses on fresh starts, consistency, and family worship
- Uses same aesthetic and color scheme as existing emails
- No hero icon (per user preference for clean design)

## Troubleshooting

**Email not sending:**
- Check Cloud Scheduler is enabled
- Verify EMAIL_USER and EMAIL_PASSWORD are set in function environment
- Check function logs in Firebase Console

**Wrong year displayed:**
- Function calculates `new Date().getFullYear() + 1` dynamically
- Should always show the upcoming year correctly

**Users complaining about receiving it:**
- This is by design - it's an annual encouragement to all users
- If needed, could add a flag in user preferences in future iterations

## Future Enhancements

Possible improvements for future years:
- Add option to opt-out of annual emails in preferences
- Create different versions for free vs. premium users
- Include personalized progress stats from the current year
- Add more specific content based on user's reading plan
- Track engagement metrics (opens, clicks)

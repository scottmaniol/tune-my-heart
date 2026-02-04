# Email Setup Guide for Family Member Notifications

When a new family member is added, they automatically receive a welcome email with login instructions.

## Gmail Setup (Recommended)

### 1. Create/Use a Gmail Account
- Use an existing Gmail account or create a new one dedicated for the app
- Example: `tunemyheart.notifications@gmail.com`

### 2. Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification

### 3. Create an App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Name it "Tune My Heart Functions"
4. Copy the 16-character password generated

### 4. Configure Environment Variables

Update `functions/.env` with your credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
FRONTEND_URL=https://tunemyheart.com
```

**For local testing:**
- Update the `.env` file in the `functions` folder

**For production (Firebase):**
Set environment variables:
```bash
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.password="your-app-password"
firebase functions:config:set frontend.url="https://tunemyheart.com"
```

## Email Template

The welcome email includes:
- Welcome message from the family administrator
- Overview of Tune My Heart features
- Login credentials (email is shown, password set by admin)
- Direct link to login page
- Instructions to change password after first login

## Testing

After deploying, test by:
1. Going to Family Management
2. Adding a new family member
3. Check that the email is received
4. Verify all links work correctly

## Troubleshooting

### Email not sending
- Check that EMAIL_USER and EMAIL_PASSWORD are set correctly
- Verify the app password is correct (no spaces)
- Check Cloud Function logs: `firebase functions:log`

### Gmail blocking emails
- Ensure 2FA is enabled
- Use an App Password (not your regular Gmail password)
- Check Gmail's "Less secure app access" settings (should be OFF with App Password)

### Wrong login URL
- Update FRONTEND_URL in environment variables
- Redeploy functions after changing

## Alternative Email Services

You can use other SMTP services by modifying `functions/src/family/family-functions.ts`:

### SendGrid
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

### AWS SES
```typescript
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  auth: {
    user: process.env.AWS_SES_USER,
    pass: process.env.AWS_SES_PASSWORD
  }
});
```

### Mailgun
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD
  }
});
```

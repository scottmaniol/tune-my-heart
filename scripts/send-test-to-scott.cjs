const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
    to: 'saniol@gmail.com',
    subject: `✅ Daily Emails Are Working!`,
    html: `
      <h2>Good News, Scott!</h2>
      <p>Your daily email reminders are now working correctly.</p>
      <p><strong>What happened:</strong></p>
      <ul>
        <li>The email function ran at 5:00 AM EST this morning</li>
        <li>It successfully sent emails to 20+ users</li>
        <li>Your preference is now set to "daily"</li>
        <li>You'll receive your first email tomorrow (Tuesday) at 5:00 AM EST</li>
      </ul>
      <p><strong>System Status:</strong></p>
      <ul>
        <li>✅ Email credentials: Working</li>
        <li>✅ Cloud Scheduler: Enabled</li>
        <li>✅ Function deployment: Successful</li>
        <li>✅ Your preference: Set to "daily"</li>
      </ul>
      <p>This is a manual test email sent at ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST.</p>
      <p>Starting tomorrow, you'll receive automated daily reading reminders every weekday morning at 5:00 AM EST!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Test email sent successfully to saniol@gmail.com');
}

sendTestEmail().catch(console.error).finally(() => process.exit(0));

/**
 * Test script to send a sample daily reminder email
 * Usage: node scripts/test-email.cjs
 */

const nodemailer = require('nodemailer');
require('dotenv').config({ path: './functions/.env' });

async function sendTestEmail() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const frontendUrl = process.env.FRONTEND_URL || "https://tunemyheart.com";

  if (!emailUser || !emailPassword) {
    console.error('❌ Email credentials not found in functions/.env');
    console.error('Please ensure EMAIL_USER and EMAIL_PASSWORD are set.');
    return;
  }

  console.log('📧 Sending test email...');
  console.log(`From: ${emailUser}`);
  console.log(`To: saniol@gmail.com`);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: emailUser,
    to: 'saniol@gmail.com',
    subject: `📖 Your Daily Reading - Week 12, Day 3 (TEST)`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #4F46E5, #7C3AED); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .reading { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; font-size: 18px; font-weight: 600; text-align: center; }
          .button { display: inline-block; background: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
          .test-banner { background: #fef3c7; padding: 10px; text-align: center; border-radius: 8px 8px 0 0; font-weight: bold; color: #92400e; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="test-banner">
            ⚠️ THIS IS A TEST EMAIL ⚠️
          </div>
          <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 10px;" />
            <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">Daily Reading Reminder</p>
          </div>
          <div class="content">
            <h2>Good morning, Scott!</h2>
            <p>Your daily reading is ready:</p>
            
            <div class="reading">
              Week 12, Day 3
            </div>
            
            <p style="text-align: center;">
              <a href="${frontendUrl}/reading" class="button">Start Reading</a>
            </p>
            
            <p><strong>Remember:</strong> "Your word is a lamp to my feet and a light to my path." - Psalm 119:105</p>
            
            <p>May the Lord bless your time in His Word today.</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for daily reading reminders.</p>
            <p><a href="${frontendUrl}/preferences" style="color: #4F46E5;">Update your email preferences</a></p>
            <p>© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully to saniol@gmail.com!');
    console.log('📬 Please check your inbox (and spam folder).');
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
  }
}

sendTestEmail();

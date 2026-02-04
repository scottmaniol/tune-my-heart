/**
 * Test script to send a sample weekly reminder email
 * Usage: cd functions && node test-weekly-email.cjs
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Read .env file manually
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      envVars[key] = value;
    }
  });
  
  return envVars;
}

async function sendTestEmail() {
  const env = loadEnv();
  const emailUser = env.EMAIL_USER;
  const emailPassword = env.EMAIL_PASSWORD;
  const frontendUrl = env.FRONTEND_URL || "https://tunemyheart.com";

  if (!emailUser || !emailPassword) {
    console.error('❌ Email credentials not found in functions/.env');
    console.error('Please ensure EMAIL_USER and EMAIL_PASSWORD are set.');
    return;
  }

  console.log('📧 Sending weekly test email...');
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
    from: `"Tune My Heart" <${emailUser}>`,
    to: 'saniol@gmail.com',
    subject: `Week 52 Reading Plan (TEST)`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .week-banner { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .button { display: inline-block; background: #2a5876; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
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
            <h2 style="margin: 0; color: white; font-weight: bold;">Tune My Heart</h2>
          </div>
          <div class="content">
            <h2>Hello, Scott!</h2>
            <p>Welcome to a new week of reading God's Word!</p>
            
            <div class="week-banner">
              <h1 style="margin: 0; color: #2a5876;">Week 52</h1>
              <p style="margin: 10px 0 0 0;">5 days of readings await you this week</p>
            </div>
            
            <p style="text-align: center;">
              <a href="${frontendUrl}/schedule" class="button" style="color: white !important; text-decoration: none;">View This Week's Schedule</a>
            </p>
            
            <p><strong>This week's focus:</strong> Continue your journey through the Bible narratives as you grow closer to God through His Word.</p>
            
            <p><strong>Tip:</strong> Try setting aside a specific time each day for your readings to build a consistent habit of spending time with the Lord.</p>
            
            <p>May this week be filled with spiritual growth and joy in the Lord.</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for weekly reading reminders.</p>
            <p><a href="${frontendUrl}/preferences" style="color: #2a5876;">Update your email preferences</a></p>
            <p>© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Weekly test email sent successfully to saniol@gmail.com!');
    console.log('📬 Please check your inbox (and spam folder).');
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
  }
}

sendTestEmail();

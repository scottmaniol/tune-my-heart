/**
 * Test script to send a sample daily reminder email
 * Usage: cd functions && node test-email.cjs
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
    from: `"Tune My Heart" <${emailUser}>`,
    to: 'saniol@gmail.com',
    subject: `Your Daily Reading - Week 52, Day 5 (TEST)`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .reading { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; font-size: 18px; font-weight: 600; text-align: center; }
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
            <h2>Good morning, Scott!</h2>
            <p>Your daily reading is ready:</p>
            
            <div class="reading">
              Week 52, Day 5
            </div>
            
            <p style="text-align: center;">
              <a href="${frontendUrl}/reading" class="button" style="color: white !important; text-decoration: none;">Start Reading</a>
            </p>
            
            <p><strong>Remember:</strong> "Your word is a lamp to my feet and a light to my path." - Psalm 119:105</p>
            
            <p>May the Lord bless your time in His Word today.</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for daily reading reminders.</p>
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
    console.log('✅ Test email sent successfully to saniol@gmail.com!');
    console.log('📬 Please check your inbox (and spam folder).');
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
  }
}

sendTestEmail();

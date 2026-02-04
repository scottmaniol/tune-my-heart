/**
 * Test script to send a sample "behind schedule" reminder email
 * Usage: cd functions && node test-behind-email.cjs
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

  console.log('📧 Sending "behind schedule" test email...');
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
    subject: `Catching Up on Your Reading Plan (TEST)`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .progress-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B; }
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
            <p>We noticed you've fallen a bit behind on your reading schedule. Don't worry - it happens to all of us!</p>
            
            <div class="progress-box">
              <p style="margin: 0;"><strong>Your current progress:</strong> Week 48, Day 3</p>
              <p style="margin: 10px 0 0 0;"><strong>Schedule position:</strong> Week 52, Day 5</p>
            </div>
            
            <p><strong>Remember:</strong> The goal isn't perfection, it's consistency and growth. Here are some tips to get back on track:</p>
            
            <ul>
              <li>Start with today's reading and don't worry about catching up all at once</li>
              <li>Set a specific time each day for Bible reading</li>
              <li>Even 10-15 minutes a day can make a big difference</li>
              <li>Consider using the weekend to catch up if needed</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="${frontendUrl}/reading" class="button" style="color: white !important; text-decoration: none;">Resume Your Reading</a>
            </p>
            
            <p><em>"Let us not grow weary of doing good, for in due season we will reap, if we do not give up." - Galatians 6:9</em></p>
            
            <p>We're praying for you as you continue in God's Word!</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for "when behind" reading reminders.</p>
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
    console.log('✅ Behind schedule test email sent successfully to saniol@gmail.com!');
    console.log('📬 Please check your inbox (and spam folder).');
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
  }
}

sendTestEmail();

/**
 * Test script for one-week upgrade reminder email
 * 
 * This script sends a test upgrade email to verify the template and delivery work correctly.
 * 
 * Usage:
 *   node functions/test-upgrade-email.cjs <test-email@example.com>
 * 
 * Example:
 *   node functions/test-upgrade-email.cjs john.doe@gmail.com
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load and compile the TypeScript template manually
function getUpgradeEmailHTML(displayName, frontendUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2a5876; color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; }
        .hero { text-align: center; margin: 30px 0; }
        .hero-icon { margin-bottom: 20px; display: flex; justify-content: center; }
        .benefits-grid { margin: 30px 0; }
        .benefit { display: flex; align-items: start; margin-bottom: 24px; }
        .benefit-icon { min-width: 48px; margin-right: 16px; }
        .benefit-content { flex: 1; }
        .benefit-title { font-weight: 700; font-size: 16px; color: #1f2937; margin: 0 0 5px 0; }
        .benefit-desc { font-size: 14px; color: #6b7280; margin: 0; line-height: 1.5; }
        .pricing-amount { font-size: 48px; font-weight: bold; margin: 10px 0; }
        .pricing-period { font-size: 18px; opacity: 0.9; }
        .pricing-subtext { font-size: 14px; opacity: 0.8; margin-top: 10px; }
        .cta-button { display: inline-block; background: #2a5876; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .trust-badge { background: #f0fdf4; border: 2px solid #86efac; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center; }
        .trust-badge-title { font-weight: 700; color: #166534; margin: 0 0 10px 0; font-size: 16px; }
        .trust-items { font-size: 14px; color: #15803d; line-height: 1.8; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .footer a { color: #2a5876; text-decoration: none; }
        .plan-box { border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0; }
        .plan-box.featured { border-color: #2a5876; background: #f0f9ff; }
        .plan-title { font-size: 20px; font-weight: 700; color: #2a5876; margin: 0 0 10px 0; }
        .plan-price { font-size: 32px; font-weight: 700; color: #1f2937; margin: 10px 0; }
        .plan-feature { font-size: 14px; color: #374151; margin: 8px 0; padding-left: 24px; position: relative; }
        .checkmark { color: #10b981; font-weight: bold; position: absolute; left: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Tune My Heart</h1>
        </div>
        
        <div class="content">
          <div class="hero">
            <div style="margin-bottom: 20px;">
              <div style="display: inline-block; width: 80px; height: 80px; border-radius: 50%; background: #2a5876; color: white; font-size: 40px; line-height: 80px; text-align: center; font-weight: bold;">★</div>
            </div>
            <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 15px 0;">Congratulations, ${displayName}!</h2>
            <p style="color: #6b7280; font-size: 18px; margin: 0;">You've been growing in God's Word for a whole week!</p>
          </div>
          
          <p style="font-size: 16px; color: #374151;">We're thrilled to see you engaging with the Bible narratives. You've experienced the basics of Tune My Heart, but there's so much more waiting for you with <strong>Premium</strong>.</p>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0; text-align: center;">Choose Your Plan</h3>
          
          <div class="plan-box">
            <p class="plan-title"><span style="display: inline-block; width: 40px; height: 40px; border-radius: 6px; background: #2a5876; color: white; font-size: 20px; line-height: 40px; text-align: center; font-weight: bold; margin-right: 10px; vertical-align: middle; font-family: Arial, sans-serif;">◐</span> Individual Plan</p>
            <p class="plan-price">$15<span style="font-size: 16px; font-weight: normal; color: #6b7280;">/year</span></p>
            <div class="plan-feature"><span class="checkmark">✓</span> All free features</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Summary content & study notes</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Daily devotionals</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Scripture memory tools</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Children's Bible stories</div>
            <div class="plan-feature"><span class="checkmark">✓</span> 7-day free trial</div>
          </div>
          
          <div class="plan-box featured">
            <p class="plan-title"><span style="display: inline-block; width: 40px; height: 40px; border-radius: 6px; background: #2a5876; color: white; font-size: 20px; line-height: 40px; text-align: center; font-weight: bold; margin-right: 10px; vertical-align: middle; font-family: Arial, sans-serif;">◉◉</span> Family Plan (Best Value!)</p>
            <p class="plan-price">$20<span style="font-size: 16px; font-weight: normal; color: #6b7280;">/year</span></p>
            <div class="plan-feature"><span class="checkmark">✓</span> All Individual features</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Up to 10 family members</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Shared progress tracking</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Family dashboard</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Multiple reading plans</div>
            <div class="plan-feature"><span class="checkmark">✓</span> 7-day free trial</div>
          </div>
          
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/upgrade" class="cta-button" style="color: white !important; text-decoration: none;">
              Start Your 7-Day Free Trial
            </a>
          </div>
          
          <div class="trust-badge">
            <p class="trust-badge-title"><span style="display: inline-block; width: 28px; height: 28px; border-radius: 4px; background: #10b981; color: white; font-size: 18px; line-height: 28px; text-align: center; font-weight: bold; margin-right: 6px; vertical-align: middle;">✓</span> 100% Risk-Free Trial</p>
            <div class="trust-items">
              ✓ Full access to all premium features<br>
              ✓ 7 days completely free<br>
              ✓ Cancel anytime with one click<br>
              ✓ No commitment required
            </div>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 14px; font-style: italic; margin: 30px 0;">
            "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
          </p>
          
          <p style="font-size: 15px; color: #374151; text-align: center;">
            Ready to take your Bible reading journey to the next level?<br>
            We can't wait to see how God uses this in your life!
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">You're receiving this email because you created a Tune My Heart account one week ago.</p>
          <p style="margin: 0;">
            <a href="${frontendUrl}/subscription">Manage Subscription</a> · 
            <a href="${frontendUrl}/help">Get Help</a>
          </p>
          <p style="margin: 15px 0 0 0;">© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

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

// Get test email from command line argument
const testEmail = process.argv[2];

if (!testEmail) {
  console.error('❌ Error: Please provide a test email address');
  console.log('\nUsage: node functions/test-upgrade-email.cjs <email>');
  console.log('Example: node functions/test-upgrade-email.cjs john.doe@gmail.com\n');
  process.exit(1);
}

// Load environment variables
const env = loadEnv();
const EMAIL_USER = env.EMAIL_USER;
const EMAIL_PASSWORD = env.EMAIL_PASSWORD;
const FRONTEND_URL = env.FRONTEND_URL || 'https://tunemyheart.com';

if (!EMAIL_USER || !EMAIL_PASSWORD) {
  console.error('❌ Error: EMAIL_USER and EMAIL_PASSWORD must be set in functions/.env');
  process.exit(1);
}

console.log('📧 One-Week Upgrade Email Test Script');
console.log('=====================================\n');
console.log(`Test Email: ${testEmail}`);
console.log(`Frontend URL: ${FRONTEND_URL}`);
console.log(`Sending from: ${EMAIL_USER}\n`);

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Email content (matches the function in email-functions.ts)
const mailOptions = {
  from: `"Tune My Heart" <${EMAIL_USER}>`,
  to: testEmail,
  subject: `✨ You've Been Using Tune My Heart for a Week!`,
  html: getUpgradeEmailHTML('Test User', FRONTEND_URL),
};

/* OLD HTML WITH 3D EMOJIS - REPLACED WITH FLAT LUCIDE-STYLE SVG ICONS
const mailOptionsOLD = {
  from: `"Tune My Heart" <${EMAIL_USER}>`,
  to: testEmail,
  subject: `✨ You've Been Using Tune My Heart for a Week!`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; }
        .hero { text-align: center; margin: 30px 0; }
        .hero-icon { font-size: 64px; margin-bottom: 20px; }
        .benefits-grid { display: table; width: 100%; margin: 30px 0; }
        .benefit { display: table-row; margin-bottom: 20px; }
        .benefit-icon { display: table-cell; width: 60px; padding: 15px 0; vertical-align: top; }
        .benefit-content { display: table-cell; padding: 15px 0 15px 10px; vertical-align: top; }
        .benefit-title { font-weight: 700; font-size: 16px; color: #1f2937; margin: 0 0 5px 0; }
        .benefit-desc { font-size: 14px; color: #6b7280; margin: 0; }
        .icon-circle { width: 48px; height: 48px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; }
        .icon-purple { background-color: #ede9fe; }
        .icon-blue { background-color: #dbeafe; }
        .icon-green { background-color: #d1fae5; }
        .icon-yellow { background-color: #fef3c7; }
        .pricing-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; }
        .pricing-amount { font-size: 48px; font-weight: bold; margin: 10px 0; }
        .pricing-period { font-size: 18px; opacity: 0.9; }
        .pricing-subtext { font-size: 14px; opacity: 0.8; margin-top: 10px; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .cta-button:hover { box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
        .trust-badge { background: #f0fdf4; border: 2px solid #86efac; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center; }
        .trust-badge-title { font-weight: 700; color: #166534; margin: 0 0 10px 0; font-size: 16px; }
        .trust-items { font-size: 14px; color: #15803d; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .footer a { color: #667eea; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Tune My Heart</h1>
        </div>
        
        <div class="content">
          <div class="hero">
            <div class="hero-icon">🎉</div>
            <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 15px 0;">Congratulations, Test User!</h2>
            <p style="color: #6b7280; font-size: 18px; margin: 0;">You've been growing in God's Word for a whole week!</p>
          </div>
          
          <p style="font-size: 16px; color: #374151;">We're thrilled to see you engaging with the Bible narratives. You've experienced the basics of Tune My Heart, but there's so much more waiting for you with <strong>Premium</strong>.</p>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0; text-align: center;">✨ What You're Missing</h3>
          
          <div class="benefits-grid">
            <div class="benefit">
              <div class="benefit-icon">
                <div class="icon-circle icon-purple">📖</div>
              </div>
              <div class="benefit-content">
                <p class="benefit-title">Summary Content & Study Notes</p>
                <p class="benefit-desc">Deepen your understanding with expert commentary and insights for every reading</p>
              </div>
            </div>
            
            <div class="benefit">
              <div class="benefit-icon">
                <div class="icon-circle icon-blue">✍️</div>
              </div>
              <div class="benefit-content">
                <p class="benefit-title">Daily Devotionals</p>
                <p class="benefit-desc">Start each day with inspiring devotional content that connects Scripture to your life</p>
              </div>
            </div>
            
            <div class="benefit">
              <div class="benefit-icon">
                <div class="icon-circle icon-green">👨‍👩‍👧‍👦</div>
              </div>
              <div class="benefit-content">
                <p class="benefit-title">Family Sharing</p>
                <p class="benefit-desc">Track progress for up to 10 family members and grow together in faith</p>
              </div>
            </div>
            
            <div class="benefit">
              <div class="benefit-icon">
                <div class="icon-circle icon-yellow">👶</div>
              </div>
              <div class="benefit-content">
                <p class="benefit-title">Children's Bible Stories</p>
                <p class="benefit-desc">Age-appropriate content to help your little ones discover God's Word</p>
              </div>
            </div>
          </div>
          
          <div class="pricing-box">
            <div style="font-size: 16px; opacity: 0.9; margin-bottom: 10px;">Premium for just</div>
            <div class="pricing-amount">$15</div>
            <div class="pricing-period">per year</div>
            <div class="pricing-subtext">That's less than $1.25 per month! 💝</div>
            <div style="margin-top: 20px; font-size: 14px; opacity: 0.85;">
              (Family plan available for $20/year)
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${FRONTEND_URL}/upgrade" class="cta-button" style="color: white !important; text-decoration: none;">
              Start Your 7-Day Free Trial
            </a>
          </div>
          
          <div class="trust-badge">
            <p class="trust-badge-title">🛡️ 100% Risk-Free Trial</p>
            <div class="trust-items">
              ✓ Full access to all premium features<br>
              ✓ 7 days completely free<br>
              ✓ Cancel anytime with one click<br>
              ✓ No commitment required
            </div>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 14px; font-style: italic; margin: 30px 0;">
            "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
          </p>
          
          <p style="font-size: 15px; color: #374151; text-align: center;">
            Ready to take your Bible reading journey to the next level?<br>
            We can't wait to see how God uses this in your life! 🙏
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">You're receiving this email because you created a Tune My Heart account one week ago.</p>
          <p style="margin: 0;">
            <a href="${FRONTEND_URL}/subscription">Manage Subscription</a> · 
            <a href="${FRONTEND_URL}/help">Get Help</a>
          </p>
          <p style="margin: 15px 0 0 0;">© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
};
*/

// Send the email
console.log('Sending test upgrade email...\n');

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error sending email:', error);
    process.exit(1);
  } else {
    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`\n📬 Check your inbox at: ${testEmail}\n`);
    console.log('💡 If you don\'t see it, check your spam folder.\n');
  }
});

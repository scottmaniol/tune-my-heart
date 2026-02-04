/**
 * Test script for New Year Preparation Email
 * Run with: node functions/test-new-year-email.cjs
 */

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
const serviceAccount = require('./tune-my-heart-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER || 'your-email@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'your-app-password';
const TEST_EMAIL = process.env.TEST_EMAIL || 'saniol@gmail.com'; // Change to your test email

// Get frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://tunemyheart.com';

// Import the email template function
function getNewYearPrepEmailHTML(displayName, frontendUrl, nextYear) {
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
        .hero h2 { color: #1f2937; font-size: 32px; margin: 0 0 15px 0; font-weight: bold; }
        .hero p { color: #6b7280; font-size: 18px; margin: 0; }
        .main-text { font-size: 16px; color: #374151; line-height: 1.8; margin: 25px 0; }
        .tips-section { margin: 40px 0; }
        .tip { display: flex; align-items: start; margin-bottom: 30px; }
        .tip-icon { min-width: 56px; margin-right: 20px; }
        .icon-square { width: 56px; height: 56px; border-radius: 8px; background: #2a5876; color: white; font-size: 28px; line-height: 56px; text-align: center; font-weight: bold; display: block; }
        .tip-content { flex: 1; }
        .tip-title { font-weight: 700; font-size: 18px; color: #1f2937; margin: 0 0 8px 0; }
        .tip-desc { font-size: 15px; color: #6b7280; margin: 0; line-height: 1.6; }
        .cta-button { display: inline-block; background: #2a5876; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 30px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .scripture-quote { background: #f0f9ff; border-left: 4px solid #2a5876; padding: 20px; margin: 30px 0; border-radius: 4px; }
        .scripture-text { font-style: italic; color: #1f2937; font-size: 16px; margin: 0 0 10px 0; line-height: 1.7; }
        .scripture-ref { font-size: 14px; color: #6b7280; margin: 0; font-weight: 600; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .footer a { color: #2a5876; text-decoration: none; }
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
            <h2>Get Ready for a Fresh Start!</h2>
            <p>Hello, ${displayName}! A new year of growing in God's Word begins soon.</p>
          </div>
          
          <div class="main-text">
            <p>As ${nextYear} approaches, we want to encourage you to prepare your heart for another year of Bible reading and family worship. Whether you've been consistent all year or faced some challenges, God's mercies are new every morning!</p>
            
            <p>The new year is a wonderful opportunity for a fresh start in your spiritual disciplines. Many families choose to begin (or restart) their Bible reading plan on January 1st, making it a meaningful way to start the year centered on God's Word.</p>
            
            <p>We're here to support you in building lasting habits of daily Scripture reading and family worship. Here are some ways to prepare:</p>
          </div>
          
          <div class="tips-section">
            <div class="tip">
              <div class="tip-icon">
                <span class="icon-square">📅</span>
              </div>
              <div class="tip-content">
                <p class="tip-title">Set Your Start Date</p>
                <p class="tip-desc">Did you know you can customize your reading schedule start date? Many users set theirs to January 1st for a fresh start with the new year. Visit your Preferences to adjust your start date anytime.</p>
              </div>
            </div>
            
            <div class="tip">
              <div class="tip-icon">
                <span class="icon-square">🎯</span>
              </div>
              <div class="tip-content">
                <p class="tip-title">Finish Strong</p>
                <p class="tip-desc">If you're still working through this year's readings, don't give up! Use these final days to catch up or complete what you can. Remember, progress over perfection—every day in God's Word matters.</p>
              </div>
            </div>
            
            <div class="tip">
              <div class="tip-icon">
                <span class="icon-square">👨‍👩‍👧</span>
              </div>
              <div class="tip-content">
                <p class="tip-title">Make It a Family Habit</p>
                <p class="tip-desc">The new year is perfect for establishing family worship rhythms. Choose a consistent time (breakfast, dinner, or bedtime), keep it age-appropriate, and remember that even 10-15 minutes together in God's Word can transform your home.</p>
              </div>
            </div>
            
            <div class="tip">
              <div class="tip-icon">
                <span class="icon-square">📖</span>
              </div>
              <div class="tip-content">
                <p class="tip-title">Stay Consistent</p>
                <p class="tip-desc">Success in Bible reading comes from consistency, not perfection. Set a realistic time each day, use our email reminders to stay on track, and give yourself grace when life gets busy. Small, daily steps add up to big spiritual growth.</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${frontendUrl}" class="cta-button" style="color: white !important; text-decoration: none;">
              Prepare for the New Year
            </a>
          </div>
          
          <div class="scripture-quote">
            <p class="scripture-text">"The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness."</p>
            <p class="scripture-ref">— Lamentations 3:22-23 (ESV)</p>
          </div>
          
          <div class="main-text">
            <p style="text-align: center; font-size: 17px; color: #1f2937; margin-top: 30px;">
              <strong>We're praying for you as you enter this new year!</strong><br>
              May God bless your time in His Word and draw your family closer to Him.
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">You're receiving this email as part of our annual New Year encouragement to all Tune My Heart users.</p>
          <p style="margin: 0;">
            <a href="${frontendUrl}/preferences">Update Preferences</a> · 
            <a href="${frontendUrl}/help">Get Help</a>
          </p>
          <p style="margin: 15px 0 0 0;">© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendTestEmail() {
  console.log('🎊 Testing New Year Preparation Email...\n');

  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  // Calculate next year
  const nextYear = new Date().getFullYear() + 1;

  // Generate email HTML
  const emailHTML = getNewYearPrepEmailHTML(
    'Test User',
    FRONTEND_URL,
    nextYear
  );

  // Send email
  const mailOptions = {
    from: `"Tune My Heart" <${EMAIL_USER}>`,
    to: TEST_EMAIL,
    subject: `🎊 A New Year of Bible Reading Awaits!`,
    html: emailHTML,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Email sent to:', TEST_EMAIL);
    console.log('📅 Next year displayed:', nextYear);
    console.log('🆔 Message ID:', info.messageId);
    console.log('\n✨ Check your inbox to see the New Year Preparation email!');
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run the test
sendTestEmail();

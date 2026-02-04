/**
 * Test script for welcome emails
 * Run with: node functions/test-welcome-emails.cjs
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load environment variables from functions/.env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

// Import the template functions (we'll use require since this is .cjs)
const { 
  getFreeWelcomeEmailHTML,
  getIndividualWelcomeEmailHTML,
  getFamilyWelcomeEmailHTML 
} = require('./lib/email/welcome-email-templates');

const testEmail = 'saniol@gmail.com';
const frontendUrl = process.env.FRONTEND_URL || 'https://tunemyheart.com';

console.log('🧪 Testing Welcome Emails...\n');
console.log(`📧 Sending test emails to: ${testEmail}`);
console.log(`🌐 Frontend URL: ${frontendUrl}\n`);

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendTestEmail(emailType, subject, htmlContent) {
  try {
    const mailOptions = {
      from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
      to: testEmail,
      subject: `[TEST] ${subject}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ ${emailType} email sent successfully`);
  } catch (error) {
    console.error(`❌ Failed to send ${emailType} email:`, error.message);
  }
}

async function main() {
  try {
    // Test Free Plan Welcome Email
    console.log('Sending FREE plan welcome email...');
    const freeHtml = getFreeWelcomeEmailHTML('John', frontendUrl);
    await sendTestEmail(
      'FREE Plan',
      'Welcome to Tune My Heart! Your Journey Through God\'s Word Begins Today',
      freeHtml
    );

    // Wait a bit between emails
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test Individual Plan Welcome Email
    console.log('Sending INDIVIDUAL plan welcome email...');
    const individualHtml = getIndividualWelcomeEmailHTML('Sarah', frontendUrl);
    await sendTestEmail(
      'INDIVIDUAL Plan',
      'Welcome to Tune My Heart Premium! Let\'s Get Started',
      individualHtml
    );

    // Wait a bit between emails
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test Family Plan Welcome Email
    console.log('Sending FAMILY plan welcome email...');
    const familyHtml = getFamilyWelcomeEmailHTML('David', frontendUrl);
    await sendTestEmail(
      'FAMILY Plan',
      'Welcome to Tune My Heart Family! Growing Together in Faith',
      familyHtml
    );

    console.log('\n✨ All test emails sent successfully!');
    console.log(`📬 Check your inbox at: ${testEmail}`);
    
  } catch (error) {
    console.error('\n❌ Error sending test emails:', error);
    process.exit(1);
  }
}

main();

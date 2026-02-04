/**
 * Test daily email function manually
 * This simulates what the scheduled function does
 */

const admin = require('../functions/node_modules/firebase-admin');
const nodemailer = require('../functions/node_modules/nodemailer');
require('../functions/node_modules/dotenv').config({ path: './functions/.env' });

// Initialize Firebase Admin
const serviceAccount = require('./tune-my-heart-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function getEmailTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  console.log('Email User:', emailUser ? 'SET' : 'NOT SET');
  console.log('Email Password:', emailPassword ? 'SET' : 'NOT SET');

  if (!emailUser || !emailPassword) {
    throw new Error("Email credentials not configured");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
}

async function testDailyEmails() {
  try {
    console.log('=== Testing Daily Email Function ===\n');
    
    const db = admin.firestore();
    
    // Get all users
    const usersSnapshot = await db.collection('users').get();
    console.log(`Total users in database: ${usersSnapshot.size}\n`);

    // Filter for daily reminder users
    const dailyReminderUsers = usersSnapshot.docs.filter(doc => {
      const data = doc.data();
      const emailPref = data.preferences?.emailReminders;
      return emailPref === 'daily' || !emailPref;
    });

    console.log(`Users with daily reminders (or no preference): ${dailyReminderUsers.length}\n`);

    // Show first few users
    console.log('Sample of users who should get emails:');
    dailyReminderUsers.slice(0, 5).forEach(doc => {
      const data = doc.data();
      console.log(`  - ${data.email} (preference: ${data.preferences?.emailReminders || 'NOT SET'})`);
    });

    console.log('\n=== Testing Email Credentials ===\n');
    
    const transporter = getEmailTransporter();
    
    // Test sending to first user
    if (dailyReminderUsers.length > 0) {
      const testUser = dailyReminderUsers[0].data();
      console.log(`\nAttempting to send test email to: ${testUser.email}`);
      
      const mailOptions = {
        from: `"Tune My Heart" <${process.env.EMAIL_USER}>`,
        to: testUser.email,
        subject: `[TEST] Daily Reading Reminder`,
        html: `
          <h2>Test Daily Email</h2>
          <p>This is a test email to verify the daily reminder system is working.</p>
          <p>User: ${testUser.displayName}</p>
          <p>Email preference: ${testUser.preferences?.emailReminders || 'NOT SET'}</p>
          <p>Time: ${new Date().toISOString()}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ TEST EMAIL SENT SUCCESSFULLY!\n');
    } else {
      console.log('❌ No users found to send test email to\n');
    }

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error(error);
  } finally {
    process.exit(0);
  }
}

testDailyEmails();

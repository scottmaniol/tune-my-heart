/**
 * Diagnose why daily email wasn't received
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin - EXPLICITLY connect to tune-my-heart project
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function diagnoseEmailIssue() {
  try {
    // Get your user document (assuming your email is stored in the system)
    const usersSnapshot = await db.collection('users').get();
    
    console.log('\n=== EMAIL DIAGNOSIS ===\n');
    
    // Find users with daily email reminders
    const dailyReminderUsers = [];
    
    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      
      console.log(`User: ${userData.displayName} (${userData.email})`);
      console.log(`  Email Preference: ${userData.preferences?.emailReminders || 'NOT SET'}`);
      console.log(`  Account Type: ${userData.subscription?.status || 'unknown'}`);
      
      if (userData.preferences?.emailReminders === 'daily') {
        dailyReminderUsers.push({
          email: userData.email,
          displayName: userData.displayName,
          startDate: userData.progress?.startDate
        });
      }
      
      console.log('');
    }
    
    console.log('\n=== SUMMARY ===\n');
    console.log(`Total users with daily reminders: ${dailyReminderUsers.length}`);
    
    if (dailyReminderUsers.length > 0) {
      console.log('\nUsers expecting daily emails:');
      dailyReminderUsers.forEach(user => {
        console.log(`  - ${user.displayName} (${user.email})`);
      });
    }
    
    // Check what day of the week it is
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    console.log(`\n=== SCHEDULE INFO ===`);
    console.log(`Today is: ${dayNames[dayOfWeek]} (${today.toLocaleDateString()})`);
    console.log(`Daily emails are scheduled for: Monday-Friday at 5:00 AM EST`);
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      console.log('\n⚠️  REASON: Daily emails do NOT run on weekends (Saturday/Sunday)');
      console.log('You will receive your next daily email tomorrow (Monday) at 5:00 AM EST');
    } else {
      console.log('\n✓ Today is a weekday - daily emails should have been sent at 5:00 AM EST');
      console.log('If you did not receive an email, check:');
      console.log('  1. Your spam/junk folder');
      console.log('  2. Your email preferences are set to "daily"');
      console.log('  3. Email credentials are configured in Firebase Functions');
    }
    
  } catch (error) {
    console.error('Error diagnosing email issue:', error);
  } finally {
    process.exit(0);
  }
}

diagnoseEmailIssue();

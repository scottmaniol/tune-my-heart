const admin = require('firebase-admin');
const serviceAccount = require('../tune-my-heart-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function checkUser() {
  try {
    const db = admin.firestore();
    
    // Find user by email
    const usersSnapshot = await db.collection('users')
      .where('email', '==', 'saniol@gmail.com')
      .get();

    if (usersSnapshot.empty) {
      console.log('❌ No user found with email saniol@gmail.com');
      process.exit(1);
    }

    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('=== User Found ===');
    console.log('Email:', userData.email);
    console.log('Display Name:', userData.displayName);
    console.log('\n=== Email Preferences ===');
    console.log('emailReminders:', userData.preferences?.emailReminders || 'NOT SET');
    console.log('\n=== Should Get Daily Emails? ===');
    
    const emailPref = userData.preferences?.emailReminders;
    const shouldGetDaily = emailPref === 'daily' || !emailPref;
    
    if (shouldGetDaily) {
      console.log('✅ YES - Should receive daily emails');
    } else {
      console.log(`❌ NO - Preference is set to: "${emailPref}"`);
      console.log('\nTo fix: Update your preference to "daily" in the Preferences tab');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

checkUser();

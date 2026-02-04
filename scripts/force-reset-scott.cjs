const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function forceReset() {
  console.log('\n=== FORCE RESETTING SCOTT\'S ACCOUNT ===\n');
  
  try {
    const userRef = db.collection('users').doc('rrtgNhy3R7PCgMggEJwEgCBkkmJ3');
    
    console.log('Updating document directly...');
    
    await userRef.update({
      'progress.hasSeenNewYearTransition': false,
      'progress.hasSeenStartDateTip': false,
      'updatedAt': admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ UPDATED!');
    console.log('\nVerifying...');
    
    const doc = await userRef.get();
    const data = doc.data();
    
    console.log('hasSeenNewYearTransition:', data.progress?.hasSeenNewYearTransition);
    console.log('hasSeenStartDateTip:', data.progress?.hasSeenStartDateTip);
    console.log('\nNow refresh incognito browser and log in!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
}

forceReset();

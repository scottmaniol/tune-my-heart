const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function set2026Date() {
  console.log('\n=== SETTING 2026 START DATE ===\n');
  
  try {
    const userRef = db.collection('users').doc('rrtgNhy3R7PCgMggEJwEgCBkkmJ3');
    
    // 2026 default start date (first Monday of January 2026)
    const newStartDate = '2026-01-06';
    
    console.log('Setting startDate to:', newStartDate);
    
    await userRef.update({
      'progress.startDate': newStartDate,
     'progress.hasSeenNewYearTransition': true,
      'updatedAt': admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ UPDATED!');
    console.log('\nVerifying...');
    
    const doc = await userRef.get();
    const data = doc.data();
    
    console.log('startDate:', data.progress?.startDate);
    console.log('hasSeenNewYearTransition:', data.progress?.hasSeenNewYearTransition);
    console.log('\n✅ You are now on the 2026 schedule!');
    console.log('Week 1, Day 1 starts Monday, January 6, 2026');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
}

set2026Date();

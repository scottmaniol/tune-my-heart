const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function clearStartDate() {
  console.log('\n=== CLEARING START DATE ===\n');
  
  try {
    const usersSnapshot = await db.collection('users')
      .where('email', '==', 'saniol@gmail.com')
      .get();
    
    if (usersSnapshot.empty) {
      console.error('❌ User not found');
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    console.log('Found user:', userDoc.data().displayName);
    console.log('Current startDate:', userDoc.data().progress?.startDate);
    
    await userDoc.ref.update({
      'progress.startDate': admin.firestore.FieldValue.delete(),
      'updatedAt': admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('\n✅ Start date cleared!');
    console.log('You are now on the default 2026 schedule (starts Monday, January 5, 2026)');
    console.log('\nThe New Year modal should now appear when you refresh the app.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

clearStartDate();

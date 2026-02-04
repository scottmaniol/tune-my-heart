const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function checkKatelyn() {
  const katelynUid = 'N8Au5Io8nodXzvWAEmEfdtZWtDg2';
  
  const userDoc = await db.collection('users').doc(katelynUid).get();
  const userData = userDoc.data();
  
  console.log('\n=== Katelyn Aniol Data ===\n');
  console.log('Email:', userData.email);  
  console.log('Display Name:', userData.displayName);
  console.log('\nProgress Object:');
  console.log(JSON.stringify(userData.progress, null, 2));
  
  console.log('\n\nCompleted Readings Details:');
  const completed = userData.progress?.completedReadings || {};
  for (const key in completed) {
    console.log(`  ${key}:`, completed[key]);
  }
  
  process.exit(0);
}

checkKatelyn();

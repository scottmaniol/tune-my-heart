/**
 * List All Curriculum Documents
 */

const admin = require('firebase-admin');
const serviceAccount = require('../.firebase-admin-key.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function listAll() {
  const snapshot = await db.collection('curriculum').get();
  
  console.log(`\n📋 Found ${snapshot.size} documents:\n`);
  
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`${doc.id}: Week ${data.week}, Day ${data.day} - ${data.title}`);
  });
  
  console.log('');
  process.exit(0);
}

listAll().catch(console.error);

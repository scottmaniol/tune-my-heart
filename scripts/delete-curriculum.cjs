/**
 * Delete All Curriculum Data from Firestore
 */

const admin = require('firebase-admin');
const serviceAccount = require('../.firebase-admin-key.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function deleteAllCurriculum() {
  console.log('\n🗑️  Deleting All Curriculum Data from Firestore\n');
  
  const collectionRef = db.collection('curriculum');
  const snapshot = await collectionRef.get();
  
  console.log(`Found ${snapshot.size} documents to delete...\n`);
  
  const batchSize = 500;
  let batch = db.batch();
  let count = 0;
  
  for (const doc of snapshot.docs) {
    batch.delete(doc.ref);
    count++;
    
    if (count % batchSize === 0) {
      await batch.commit();
      batch = db.batch();
      console.log(`Deleted ${count} documents...`);
    }
  }
  
  if (count % batchSize !== 0) {
    await batch.commit();
  }
  
  console.log(`\n✓ Successfully deleted ${count} documents\n`);
  process.exit(0);
}

deleteAllCurriculum().catch(console.error);

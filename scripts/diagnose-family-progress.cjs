const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function diagnoseFamilyProgress() {
  try {
    // Get all families
    const familiesSnapshot = await db.collection('families').get();
    
    console.log(`\n=== Found ${familiesSnapshot.size} families ===\n`);
    
    for (const familyDoc of familiesSnapshot.docs) {
      const family = familyDoc.data();
      console.log(`\nFamily ID: ${familyDoc.id}`);
      console.log(`Members: ${family.members.length}`);
      console.log(`Head of Household UID: ${family.headOfHousehold}`);
      
      // Get each member's data
      for (const memberUid of family.members) {
        const userDoc = await db.collection('users').doc(memberUid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const progress = userData.progress || {};
          const completedReadings = progress.completedReadings || {};
          
          // Count completed readings
          let completedCount = 0;
          for (const key in completedReadings) {
            if (completedReadings[key]?.completed) {
              completedCount++;
            }
          }
          
          console.log(`\n  Member: ${userData.displayName} (${userData.email})`);
          console.log(`    UID: ${memberUid}`);
          console.log(`    Current Week: ${progress.currentWeek || 'N/A'}`);
          console.log(`    Current Day: ${progress.currentDay || 'N/A'}`);
          console.log(`    Completed Readings Count: ${completedCount} / 260`);
          console.log(`    Progress %: ${Math.round((completedCount / 260) * 100)}%`);
          console.log(`    Has completedReadings object: ${!!completedReadings}`);
          console.log(`    Sample keys: ${Object.keys(completedReadings).slice(0, 5).join(', ')}`);
        } else {
          console.log(`\n  Member UID ${memberUid}: USER DOC NOT FOUND`);
        }
      }
      
      console.log('\n' + '='.repeat(60));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

diagnoseFamilyProgress();

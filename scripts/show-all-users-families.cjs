const admin = require('firebase-admin');

// Initialize Firebase Admin - EXPLICITLY connect to tune-my-heart project
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function showAllUsers() {
  console.log('🔍 Fetching all users and showing family relationships...\n');
  
  const allUsersSnapshot = await db.collection('users').get();
  console.log(`Found ${allUsersSnapshot.size} total users\n`);
  
  const users = [];
  allUsersSnapshot.forEach(doc => {
    users.push({
      uid: doc.id,
      ...doc.data()
    });
  });
  
  // Sort by email
  users.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
  
  console.log('Users with family account type or familyId:\n');
  console.log('='.repeat(80));
  
  let count = 0;
  for (const user of users) {
    if (user.accountType === 'family' || user.familyId) {
      count++;
      console.log(`\n${count}. ${user.email}`);
      console.log(`   Name: ${user.displayName}`);
      console.log(`   UID: ${user.uid}`);
      console.log(`   Account Type: ${user.accountType}`);
      console.log(`   Is Head: ${user.isHeadOfHousehold}`);
      console.log(`   Family ID: ${user.familyId || 'NONE'}`);
      console.log(`   Plan: ${user.subscription?.plan}`);
      console.log(`   Status: ${user.subscription?.status}`);
    }
  }
  
  if (count === 0) {
    console.log('\nNo users with family accountType or familyId found.');
  }
  
  console.log(`\n\n${'='.repeat(80)}`);
  console.log('All Users (for reference):');
  console.log('='.repeat(80));
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(`${i + 1}. ${user.email} (${user.accountType}) - ${user.subscription?.plan}`);
  }
  
  // Check families collection
  const familiesSnapshot = await db.collection('families').get();
  console.log(`\n\n${'='.repeat(80)}`);
  console.log(`Families Collection: ${familiesSnapshot.size} documents`);
  console.log('='.repeat(80));
  
  if (familiesSnapshot.size > 0) {
    for (const familyDoc of familiesSnapshot.docs) {
      const familyData = familyDoc.data();
      console.log(`\nFamily ID: ${familyDoc.id}`);
      console.log(`  Head: ${familyData.headOfHousehold}`);
      console.log(`  Members: ${JSON.stringify(familyData.members)}`);
      console.log(`  Count: ${familyData.memberCount}`);
      
      // Show member emails
      for (const memberUid of familyData.members || []) {
        const memberDoc = await db.collection('users').doc(memberUid).get();
        if (memberDoc.exists) {
          const memberData = memberDoc.data();
          console.log(`    - ${memberData.email}`);
        }
      }
    }
  }
  
  console.log('\n✅ Done!\n');
}

showAllUsers()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });

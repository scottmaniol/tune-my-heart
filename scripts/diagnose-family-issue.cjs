const admin = require('firebase-admin');

// Initialize Firebase Admin
// Uses default credentials (GOOGLE_APPLICATION_CREDENTIALS env var or gcloud auth)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function diagnoseUsers() {
  console.log('🔍 Diagnosing family grouping issue...\n');
  
  // First, get ALL users from Firestore
  console.log('📊 Fetching all users from Firestore...\n');
  const allUsersSnapshot = await db.collection('users').get();
  console.log(`Found ${allUsersSnapshot.size} total users in Firestore\n`);
  
  const searchEmails = ['lminga', 'stevejanross'];
  const matchingUsers = [];
  
  // Find users that match our search
  allUsersSnapshot.forEach(doc => {
    const userData = doc.data();
    const emailLower = userData.email?.toLowerCase() || '';
    
    if (searchEmails.some(search => emailLower.includes(search.toLowerCase()))) {
      matchingUsers.push({
        uid: doc.id,
        ...userData
      });
    }
  });
  
  console.log(`Found ${matchingUsers.length} users matching search criteria:\n`);
  
  for (const user of matchingUsers) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📧 User: ${user.email}`);
    console.log(`👤 Display Name: ${user.displayName}`);
    console.log('='.repeat(60));
    console.log(`✅ UID: ${user.uid}`);
    
    console.log('\n📄 Firestore User Data:');
    console.log(`   - accountType: ${user.accountType}`);
    console.log(`   - isHeadOfHousehold: ${user.isHeadOfHousehold}`);
    console.log(`   - familyId: ${user.familyId || 'NONE'}`);
    console.log(`   - subscription.plan: ${user.subscription?.plan}`);
    console.log(`   - subscription.status: ${user.subscription?.status}`);
    console.log(`   - createdBy: ${user.createdBy || 'NONE'}`);
    
    // If user has a familyId, check the family document
    if (user.familyId) {
      console.log(`\n🏠 Checking family document: ${user.familyId}`);
      
      const familyDoc = await db.collection('families').doc(user.familyId).get();
      
      if (familyDoc.exists) {
        const familyData = familyDoc.data();
        console.log('   ✅ Family document exists');
        console.log(`   - headOfHousehold: ${familyData.headOfHousehold}`);
        console.log(`   - memberCount: ${familyData.memberCount}`);
        console.log(`   - members: ${JSON.stringify(familyData.members)}`);
        
        // Check if this user is actually in the members array
        if (familyData.members && familyData.members.includes(user.uid)) {
          console.log(`   ✅ User IS in family members array`);
        } else {
          console.log(`   ❌ User NOT in family members array (DATA CORRUPTION!)`);
        }
        
        // Get the head of household's data
        if (familyData.headOfHousehold !== user.uid) {
          const headDoc = await db.collection('users').doc(familyData.headOfHousehold).get();
          if (headDoc.exists) {
            const headData = headDoc.data();
            console.log(`\n   👤 Head of Household:`);
            console.log(`      - email: ${headData.email}`);
            console.log(`      - displayName: ${headData.displayName}`);
            console.log(`      - uid: ${familyData.headOfHousehold}`);
          }
        }
      } else {
        console.log('   ❌ Family document does NOT exist (ORPHANED REFERENCE!)');
      }
    } else {
      console.log('\n   ℹ️  No familyId - should be an individual account');
    }
  }
  
  // Also check all families to see if these users appear anywhere
  console.log(`\n\n${'='.repeat(60)}`);
  console.log(' 🔍 Searching all family documents...');
  console.log('='.repeat(60));
  
  const familiesSnapshot = await db.collection('families').get();
  console.log(`\nFound ${familiesSnapshot.size} family documents\n`);
  
  // Get UIDs for our target users from the matched users
  const targetUids = matchingUsers.map(u => u.uid);
  
  for (const familyDoc of familiesSnapshot.docs) {
    const familyData = familyDoc.data();
    const hasTargetUser = familyData.members?.some(uid => targetUids.includes(uid));
    
    if (hasTargetUser) {
      console.log(`\n📍 Family ${familyDoc.id}:`);
      console.log(`   - headOfHousehold: ${familyData.headOfHousehold}`);
      console.log(`   - members: ${JSON.stringify(familyData.members)}`);
      
      // Get emails for all members
      for (const memberUid of familyData.members || []) {
        const memberDoc = await db.collection('users').doc(memberUid).get();
        if (memberDoc.exists) {
          const memberData = memberDoc.data();
          const isTarget = targetUids.includes(memberUid) ? '⭐' : '  ';
          console.log(`   ${isTarget} - ${memberData.email} (${memberData.accountType})`);
        }
      }
    }
  }
  
  console.log('\n✅ Diagnosis complete!\n');
}

diagnoseUsers()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });

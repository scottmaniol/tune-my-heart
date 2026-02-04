const admin = require('firebase-admin');

// Initialize Firebase Admin - EXPLICITLY connect to tune-my-heart project
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function fixLaramieFamily() {
  console.log('🔧 Fixing Laramie Minga\'s family setup...\n');
  
  const laramieEmail = 'lminga@g3min.org';
  const laramieUid = 'fIuUVzXzyoVjrtogbH4yFYa9WGx1';
  
  try {
    // 1. Check current state
    const userDoc = await db.collection('users').doc(laramieUid).get();
    if (!userDoc.exists) {
      console.error('❌ User document not found!');
      return;
    }
    
    const userData = userDoc.data();
    console.log('Current state:');
    console.log(`  Email: ${userData.email}`);
    console.log(`  Account Type: ${userData.accountType}`);
    console.log(`  Is Head: ${userData.isHeadOfHousehold}`);
    console.log(`  Family ID: ${userData.familyId || 'NONE'}`);
    console.log(`  Plan: ${userData.subscription?.plan}`);
    
    // 2. Create a new family document for Laramie
    console.log('\n📝 Creating family document...');
    
    const familyRef = db.collection('families').doc();
    const familyId = familyRef.id;
    
    await familyRef.set({
      headOfHousehold: laramieUid,
      members: [laramieUid],
      memberCount: 1,
      maxMembers: 10,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ Created family document: ${familyId}`);
    
    // 3. Update Laramie's user document with the familyId
    console.log('\n📝 Updating user document...');
    
    await db.collection('users').doc(laramieUid).update({
      familyId: familyId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Updated user document with familyId');
    
    // 4. Verify the fix
    console.log('\n🔍 Verifying fix...');
    const updatedUserDoc = await db.collection('users').doc(laramieUid).get();
    const updatedData = updatedUserDoc.data();
    
    console.log('\nUpdated state:');
    console.log(`  Email: ${updatedData.email}`);
    console.log(`  Account Type: ${updatedData.accountType}`);
    console.log(`  Is Head: ${updatedData.isHeadOfHousehold}`);
    console.log(`  Family ID: ${updatedData.familyId}`);
    console.log(`  Plan: ${updatedData.subscription?.plan}`);
    
    console.log('\n✅ Fix complete! Laramie now has her own family.');
    console.log('She should no longer appear under Jan Ross in the admin dashboard.');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

fixLaramieFamily()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Failed:', error);
    process.exit(1);
  });

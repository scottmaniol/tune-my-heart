const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function moveMemberToFamily() {
  console.log('🔧 Moving bgbowman@hotmail.com to joshuadalebowman@icloud.com\'s family...\n');
  
  const memberEmail = 'bgbowman@hotmail.com';
  const headEmail = 'joshuadalebowman@icloud.com';
  
  try {
    // 1. Find both users by email
    console.log('🔍 Finding users...');
    
    const usersSnapshot = await db.collection('users').get();
    let memberUser = null;
    let headUser = null;
    
    usersSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.email === memberEmail) {
        memberUser = { uid: doc.id, ...data };
      }
      if (data.email === headEmail) {
        headUser = { uid: doc.id, ...data };
      }
    });
    
    if (!memberUser) {
      console.error(`❌ User not found: ${memberEmail}`);
      return;
    }
    
    if (!headUser) {
      console.error(`❌ User not found: ${headEmail}`);
      return;
    }
    
    console.log(`✅ Found ${memberEmail} (UID: ${memberUser.uid})`);
    console.log(`✅ Found ${headEmail} (UID: ${headUser.uid})`);
    
    // 2. Check member's current state
    console.log('\n📋 Current state of ' + memberEmail + ':');
    console.log(`  Account Type: ${memberUser.accountType}`);
    console.log(`  Is Head: ${memberUser.isHeadOfHousehold}`);
    console.log(`  Family ID: ${memberUser.familyId || 'NONE'}`);
    console.log(`  Plan: ${memberUser.subscription?.plan}`);
    
    // 3. Check head's current state
    console.log('\n📋 Current state of ' + headEmail + ':');
    console.log(`  Account Type: ${headUser.accountType}`);
    console.log(`  Is Head: ${headUser.isHeadOfHousehold}`);
    console.log(`  Family ID: ${headUser.familyId || 'NONE'}`);
    console.log(`  Plan: ${headUser.subscription?.plan}`);
    
    // 4. Verify head has a family account
    if (headUser.accountType !== 'family' || !headUser.isHeadOfHousehold) {
      console.error('\n❌ Error: ' + headEmail + ' is not a family account head!');
      return;
    }
    
    // 5. Get or create family document for head
    let familyId = headUser.familyId;
    let familyDoc = null;
    
    if (familyId) {
      familyDoc = await db.collection('families').doc(familyId).get();
      if (!familyDoc.exists) {
        console.log('\n⚠️  Family document not found, will create one...');
        familyId = null;
      } else {
        console.log(`\n✅ Found existing family document: ${familyId}`);
      }
    }
    
    // Create family if needed
    if (!familyId) {
      console.log('\n📝 Creating family document for ' + headEmail + '...');
      
      const familyRef = db.collection('families').doc();
      familyId = familyRef.id;
      
      await familyRef.set({
        headOfHousehold: headUser.uid,
        members: [headUser.uid],
        memberCount: 1,
        maxMembers: 10,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`✅ Created family document: ${familyId}`);
      
      // Update head's user document with familyId
      await db.collection('users').doc(headUser.uid).update({
        familyId: familyId,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('✅ Updated head of household with familyId');
      
      // Refresh family doc
      familyDoc = await db.collection('families').doc(familyId).get();
    }
    
    const familyData = familyDoc.data();
    
    // 6. Check if family has room
    if (familyData.memberCount >= familyData.maxMembers) {
      console.error('\n❌ Error: Family has reached maximum members!');
      return;
    }
    
    // 7. Update member's user document
    console.log('\n📝 Converting ' + memberEmail + ' to family member...');
    
    await db.collection('users').doc(memberUser.uid).update({
      accountType: 'family',
      familyId: familyId,
      isHeadOfHousehold: false,
      createdBy: headUser.uid,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Updated user document');
    
    // 8. Add member to family document
    console.log('\n📝 Adding member to family...');
    
    const updatedMembers = [...familyData.members];
    if (!updatedMembers.includes(memberUser.uid)) {
      updatedMembers.push(memberUser.uid);
    }
    
    await db.collection('families').doc(familyId).update({
      members: updatedMembers,
      memberCount: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Updated family document');
    
    // 9. Verify the changes
    console.log('\n🔍 Verifying changes...');
    
    const updatedMemberDoc = await db.collection('users').doc(memberUser.uid).get();
    const updatedMemberData = updatedMemberDoc.data();
    
    const updatedFamilyDoc = await db.collection('families').doc(familyId).get();
    const updatedFamilyData = updatedFamilyDoc.data();
    
    console.log('\n✅ Updated state of ' + memberEmail + ':');
    console.log(`  Account Type: ${updatedMemberData.accountType}`);
    console.log(`  Is Head: ${updatedMemberData.isHeadOfHousehold}`);
    console.log(`  Family ID: ${updatedMemberData.familyId}`);
    console.log(`  Created By: ${updatedMemberData.createdBy}`);
    
    console.log('\n✅ Family members:');
    for (const memberId of updatedFamilyData.members) {
      const memberDoc = await db.collection('users').doc(memberId).get();
      const memberData = memberDoc.data();
      console.log(`  - ${memberData.email} ${memberData.isHeadOfHousehold ? '(Head)' : ''}`);
    }
    
    console.log('\n✅ Conversion complete!');
    console.log(`${memberEmail} is now a family member under ${headEmail}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

moveMemberToFamily()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Failed:', error);
    process.exit(1);
  });

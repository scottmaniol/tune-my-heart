/**
 * Fix Family Plan Account Types
 * 
 * This script finds users with subscription.plan = "family" but accountType = "individual"
 * and updates them to properly configure their family account.
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function fixFamilyAccountTypes() {
  console.log('🔍 Searching for family plan users with incorrect accountType...\n');

  try {
    // Get all users with family plan
    const usersSnapshot = await db.collection('users')
      .where('subscription.plan', '==', 'family')
      .get();

    if (usersSnapshot.empty) {
      console.log('✅ No family plan users found.');
      return;
    }

    console.log(`Found ${usersSnapshot.size} family plan subscriber(s)\n`);

    const usersToFix = [];
    const alreadyCorrect = [];

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      const userId = doc.id;

      console.log(`\n📧 ${userData.email} (${userData.displayName})`);
      console.log(`   Current accountType: ${userData.accountType}`);
      console.log(`   Current subscription.plan: ${userData.subscription?.plan}`);
      console.log(`   Current isHeadOfHousehold: ${userData.isHeadOfHousehold}`);
      console.log(`   Current familyId: ${userData.familyId || 'NONE'}`);

      if (userData.accountType !== 'family' || !userData.isHeadOfHousehold) {
        usersToFix.push({ userId, userData });
        console.log(`   ❌ NEEDS FIX`);
      } else if (!userData.familyId) {
        usersToFix.push({ userId, userData });
        console.log(`   ⚠️  Missing familyId - NEEDS FAMILY CREATION`);
      } else {
        alreadyCorrect.push(userData.email);
        console.log(`   ✅ Already correct`);
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 Summary:`);
    console.log(`   Total family plan users: ${usersSnapshot.size}`);
    console.log(`   Already correct: ${alreadyCorrect.length}`);
    console.log(`   Need fixing: ${usersToFix.length}`);
    console.log(`${'='.repeat(60)}\n`);

    if (usersToFix.length === 0) {
      console.log('✅ All family plan users are correctly configured!');
      return;
    }

    // Fix each user
    console.log('🔧 Fixing users...\n');

    for (const { userId, userData } of usersToFix) {
      console.log(`\n🔧 Fixing ${userData.email}...`);

      try {
        // Update accountType and isHeadOfHousehold
        const updates = {
          accountType: 'family',
          isHeadOfHousehold: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await db.collection('users').doc(userId).update(updates);
        console.log(`   ✅ Updated accountType to "family"`);
        console.log(`   ✅ Set isHeadOfHousehold to true`);

        // Create family document if needed
        if (!userData.familyId) {
          const familyRef = db.collection('families').doc();
          await familyRef.set({
            id: familyRef.id,
            headOfHousehold: userId,
            members: [userId],
            memberCount: 1,
            maxMembers: 6,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          // Update user with familyId
          await db.collection('users').doc(userId).update({
            familyId: familyRef.id,
          });

          console.log(`   ✅ Created family document: ${familyRef.id}`);
          console.log(`   ✅ Linked user to family`);
        }

        console.log(`   ✅ ${userData.email} successfully fixed!`);
      } catch (error) {
        console.error(`   ❌ Error fixing ${userData.email}:`, error.message);
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('✅ Fix complete!');
    console.log(`${'='.repeat(60)}\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
fixFamilyAccountTypes();

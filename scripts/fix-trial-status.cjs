/**
 * Fix Trial Status for Users
 * 
 * This script finds users who are marked as "active" but have a trialEndsAt date
 * in the future, and updates their status to "trial".
 * 
 * Run with: node scripts/fix-trial-status.cjs
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
// Uses default credentials (GOOGLE_APPLICATION_CREDENTIALS env var or gcloud auth)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function fixTrialStatus() {
  try {
    console.log('🔍 Searching for users with incorrect trial status...\n');

    // Get all users with active subscription
    const usersSnapshot = await db.collection('users')
      .where('subscription.status', '==', 'active')
      .get();

    if (usersSnapshot.empty) {
      console.log('No users found with active status.');
      return;
    }

    console.log(`Found ${usersSnapshot.docs.length} users with active status.`);
    console.log('Checking for users with future trial end dates...\n');

    const now = new Date();
    const usersToFix = [];

    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      const trialEndsAt = userData.subscription?.trialEndsAt?.toDate();

      if (trialEndsAt && trialEndsAt > now) {
        const daysRemaining = Math.ceil((trialEndsAt - now) / (1000 * 60 * 60 * 24));
        usersToFix.push({
          uid: doc.id,
          email: userData.email,
          displayName: userData.displayName,
          trialEndsAt,
          daysRemaining
        });
      }
    }

    if (usersToFix.length === 0) {
      console.log('✅ No users found with incorrect trial status. All good!');
      return;
    }

    console.log(`⚠️  Found ${usersToFix.length} user(s) who should be on trial:\n`);

    for (const user of usersToFix) {
      console.log(`  - ${user.displayName} (${user.email})`);
      console.log(`    Trial ends: ${user.trialEndsAt.toLocaleDateString()}`);
      console.log(`    Days remaining: ${user.daysRemaining}`);
      console.log('');
    }

    console.log('🔧 Updating user statuses to "trial"...\n');

    const batch = db.batch();
    for (const user of usersToFix) {
      const userRef = db.collection('users').doc(user.uid);
      batch.update(userRef, {
        'subscription.status': 'trial',
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      });
    }

    await batch.commit();

    console.log('✅ Successfully updated all users!');
    console.log(`\nUpdated ${usersToFix.length} user(s) from "active" to "trial" status.`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the script
fixTrialStatus();

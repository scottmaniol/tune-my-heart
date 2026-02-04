/**
 * Fix users who are marked as "active" but should be "trial"
 * 
 * This script finds users who:
 * - Have subscription.status = "active"
 * - Have a valid trialEndsAt date in the future
 * 
 * And updates their status to "trial"
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
// Uses default credentials (GOOGLE_APPLICATION_CREDENTIALS env var or gcloud auth)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function fixActiveTrialUsers() {
  try {
    console.log('🔍 Finding users with active status who should be on trial...\n');

    // Get all users with active subscription
    const usersSnapshot = await db.collection('users')
      .where('subscription.status', '==', 'active')
      .get();

    if (usersSnapshot.empty) {
      console.log('No active users found.');
      return;
    }

    console.log(`Found ${usersSnapshot.size} active users. Checking trial status...\n`);

    const now = new Date();
    const usersToFix = [];

    // Check each active user to see if they have an active trial
    usersSnapshot.forEach(doc => {
      const user = doc.data();
      const trialEndsAt = user.subscription?.trialEndsAt;

      // Check if user has a trial end date and it's in the future
      if (trialEndsAt) {
        const trialEndDate = trialEndsAt.toDate ? trialEndsAt.toDate() : new Date(trialEndsAt);
        
        if (trialEndDate > now) {
          usersToFix.push({
            uid: doc.id,
            email: user.email,
            displayName: user.displayName,
            trialEndsAt: trialEndDate,
            daysRemaining: Math.ceil((trialEndDate - now) / (1000 * 60 * 60 * 24))
          });
        }
      }
    });

    if (usersToFix.length === 0) {
      console.log('✅ No users need to be fixed. All active users have expired or no trials.');
      return;
    }

    console.log(`📋 Found ${usersToFix.length} users who should be marked as "trial":\n`);
    
    usersToFix.forEach((user, index) => {
      console.log(`${index + 1}. ${user.displayName} (${user.email})`);
      console.log(`   Trial ends: ${user.trialEndsAt.toLocaleDateString()} (${user.daysRemaining} days remaining)`);
      console.log(`   UID: ${user.uid}\n`);
    });

    // Confirm before making changes
    console.log('⚠️  Ready to update these users to "trial" status.');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to proceed...\n');

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🔧 Updating user statuses...\n');

    // Update each user
    const batch = db.batch();
    let updateCount = 0;

    for (const user of usersToFix) {
      const userRef = db.collection('users').doc(user.uid);
      batch.update(userRef, {
        'subscription.status': 'trial',
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      });
      updateCount++;
    }

    await batch.commit();

    console.log(`✅ Successfully updated ${updateCount} users to "trial" status!\n`);
    
    console.log('Summary:');
    usersToFix.forEach(user => {
      console.log(`  ✓ ${user.displayName} - Trial ends ${user.trialEndsAt.toLocaleDateString()}`);
    });

  } catch (error) {
    console.error('❌ Error fixing trial users:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
fixActiveTrialUsers();

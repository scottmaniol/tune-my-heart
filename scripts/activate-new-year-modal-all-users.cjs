const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function activateNewYearModalForAllUsers() {
  console.log('\n=== ACTIVATING NEW YEAR TRANSITION MODAL FOR ALL USERS ===\n');
  
  try {
    const usersSnapshot = await db.collection('users').get();
    
    console.log(`Found ${usersSnapshot.docs.length} total users.`);
    console.log('');
    
    let snapshotsCreated = 0;
    let modalsActivated = 0;
    let usersSkipped = 0;
    let usersAlreadyHaveSnapshot = 0;
    let usersWithCustomStartDate = 0;
    let usersCompleted = 0;
    
    const batch = db.batch();
    let batchCount = 0;
    const currentYear = new Date().getFullYear();
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const progress = userData.progress || {};
      
      const hasCustomStartDate = !!progress.startDate;
      const hasCompleted = progress.hasCompletedAllWeeks;
      const hasExistingSnapshot = !!progress.newYearSnapshot;
      const currentWeek = progress.currentWeek || 1;
      const currentDay = progress.currentDay || 1;
      
      // Log user info
      console.log(`Processing: ${userData.displayName || 'Unknown'} (${userData.email})`);
      console.log(`  Current: Week ${currentWeek}, Day ${currentDay}`);
      console.log(`  Custom Start Date: ${hasCustomStartDate ? 'Yes' : 'No'}`);
      console.log(`  Completed Curriculum: ${hasCompleted ? 'Yes' : 'No'}`);
      console.log(`  Has Snapshot: ${hasExistingSnapshot ? 'Yes' : 'No'}`);
      
      // Track statistics
      if (hasCustomStartDate) {
        usersWithCustomStartDate++;
        console.log('  ⏭️  SKIPPED - Has custom start date');
        console.log('');
        usersSkipped++;
        continue;
      }
      
      if (hasCompleted) {
        usersCompleted++;
        console.log('  ⏭️  SKIPPED - Already completed curriculum (gets auto-reset)');
        console.log('');
        usersSkipped++;
        continue;
      }
      
      const updates = {
        'progress.hasSeenNewYearTransition': false,
        'updatedAt': admin.firestore.FieldValue.serverTimestamp()
      };
      
      // Create snapshot if it doesn't exist and user isn't on Week 1, Day 1
      if (!hasExistingSnapshot && (currentWeek > 1 || currentDay > 1)) {
        const snapshot = {
          year: currentYear,
          week: currentWeek,
          day: currentDay,
          startDate: progress.startDate || null,
          completedReadings: progress.completedReadings || {},
          snapshotDate: new Date().toISOString(),
        };
        
        updates['progress.newYearSnapshot'] = snapshot;
        snapshotsCreated++;
        console.log(`  ✅ Created snapshot (Week ${currentWeek}, Day ${currentDay})`);
      } else if (hasExistingSnapshot) {
        usersAlreadyHaveSnapshot++;
        console.log(`  ℹ️  Snapshot already exists`);
      } else {
        console.log(`  ℹ️  On Week 1, Day 1 - no snapshot needed`);
      }
      
      console.log(`  ✅ Activated modal`);
      modalsActivated++;
      console.log('');
      
      // Add to batch
      batch.update(userDoc.ref, updates);
      batchCount++;
      
      // Commit batch if it reaches 500 operations
      if (batchCount >= 500) {
        console.log('⚙️  Committing batch of 500 updates...');
        await batch.commit();
        batchCount = 0;
      }
    }
    
    // Commit any remaining operations
    if (batchCount > 0) {
      console.log('⚙️  Committing final batch...');
      await batch.commit();
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ NEW YEAR MODAL ACTIVATION COMPLETE!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('📊 SUMMARY:');
    console.log(`  Total Users: ${usersSnapshot.docs.length}`);
    console.log(`  Snapshots Created: ${snapshotsCreated}`);
    console.log(`  Users Already Had Snapshot: ${usersAlreadyHaveSnapshot}`);
    console.log(`  Modals Activated: ${modalsActivated}`);
    console.log('');
    console.log('📋 SKIPPED (excluded from modal):');
    console.log(`  Users with Custom Start Date: ${usersWithCustomStartDate}`);
    console.log(`  Users Who Completed Curriculum: ${usersCompleted}`);
    console.log(`  Total Skipped: ${usersSkipped}`);
    console.log('');
    console.log('📝 WHAT HAPPENS NEXT:');
    console.log('  - All eligible users will see the New Year transition modal');
    console.log('  - Users can choose to keep their progress or start fresh');
    console.log('  - Users with custom start dates were excluded (correct behavior)');
    console.log('  - Users who completed the curriculum were excluded (get auto-reset)');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error activating New Year modal for all users:', error);
    throw error;
  }
}

activateNewYearModalForAllUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });

const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'tune-my-heart'
  });
}

const db = admin.firestore();

async function simulateCompletion(userId) {
  try {
    console.log(`\n🎯 Simulating completion for user: ${userId}\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error('❌ User not found!');
      return;
    }

    const userData = userDoc.data();
    console.log(`📝 User: ${userData.displayName} (${userData.email})`);

    // Create completed readings object for all 260 readings
    const completedReadings = {};
    for (let week = 1; week <= 52; week++) {
      for (let day = 1; day <= 5; day++) {
        const key = `${week}-${day}`;
        completedReadings[key] = {
          userId: userId,
          week: week,
          day: day,
          completed: true,
          completedAt: admin.firestore.Timestamp.now(),
          reference: `Test Reading ${week}-${day}`,
          translation: 'ESV'
        };
      }
    }

    console.log('✅ Generated 260 completed readings');

    // Get existing cycles (if any)
    const existingCycles = userData.progress?.completionCycles || [];
    const cycleNumber = existingCycles.length + 1;

    // Create new completion cycle
    const newCycle = {
      cycleNumber: cycleNumber,
      completedAt: admin.firestore.Timestamp.now(),
      certificateDownloaded: false,
    };

    console.log(`🏆 Creating completion cycle #${cycleNumber}`);

    // Update user document
    await userRef.update({
      'progress.completedReadings': completedReadings,
      'progress.currentWeek': 52,
      'progress.currentDay': 5,
      'progress.hasCompletedAllWeeks': true,
      'progress.showCompletionModal': true,
      'progress.completionCycles': [...existingCycles, newCycle],
      'progress.lastAccessDate': new Date().toISOString(),
      updatedAt: admin.firestore.Timestamp.now(),
    });

    console.log('\n🎉 SUCCESS! Completion simulation complete!\n');
    console.log('📋 What was done:');
    console.log('  ✓ Marked all 260 readings as complete');
    console.log('  ✓ Set week to 52, day to 5');
    console.log('  ✓ Created completion cycle record');
    console.log('  ✓ Set showCompletionModal flag to true');
    console.log(`  ✓ This is completion cycle #${cycleNumber}\n`);
    console.log('🚀 Next steps:');
    console.log('  1. Log in to https://tune-my-heart.web.app');
    console.log('  2. Go to Dashboard');
    console.log('  3. You should see the celebration modal with confetti! 🎊\n');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function resetCompletion(userId) {
  try {
    console.log(`\n🔄 Resetting completion for user: ${userId}\n`);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error('❌ User not found!');
      return;
    }

    const userData = userDoc.data();
    console.log(`📝 User: ${userData.displayName} (${userData.email})`);

    await userRef.update({
      'progress.completedReadings': {},
      'progress.currentWeek': 1,
      'progress.currentDay': 1,
      'progress.hasCompletedAllWeeks': false,
      'progress.showCompletionModal': false,
      'progress.lastAccessDate': new Date().toISOString(),
      updatedAt: admin.firestore.Timestamp.now(),
    });

    console.log('\n✅ Completion reset successfully!');
    console.log('📋 What was done:');
    console.log('  ✓ Cleared all completed readings');
    console.log('  ✓ Reset to Week 1, Day 1');
    console.log('  ✓ Removed completion flags');
    console.log('  ✓ Completion cycle history preserved\n');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];
const userId = args[1];

if (!command || !userId) {
  console.log('\n📚 Completion Test Script\n');
  console.log('Usage:');
  console.log('  node test-completion.cjs simulate <userId>  - Simulate completion');
  console.log('  node test-completion.cjs reset <userId>     - Reset to start\n');
  console.log('Example:');
  console.log('  node test-completion.cjs simulate abc123xyz\n');
  process.exit(1);
}

if (command === 'simulate') {
  simulateCompletion(userId).then(() => process.exit(0));
} else if (command === 'reset') {
  resetCompletion(userId).then(() => process.exit(0));
} else {
  console.error('❌ Invalid command. Use "simulate" or "reset"');
  process.exit(1);
}

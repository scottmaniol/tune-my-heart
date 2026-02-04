const admin = require('firebase-admin');

// Initialize Firebase Admin
// Uses default credentials (GOOGLE_APPLICATION_CREDENTIALS env var or gcloud auth)
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function diagnoseNewYearIssue() {
  console.log('\n=== NEW YEAR TRANSITION DIAGNOSTIC ===\n');
  
  try {
    // Get your user document (saniol@gmail.com)
    const usersSnapshot = await db.collection('users')
      .where('email', '==', 'saniol@gmail.com')
      .get();
    
    if (usersSnapshot.empty) {
      console.error('❌ User not found with email saniol@gmail.com');
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();
    const progress = userData.progress || {};
    
    console.log('📋 USER INFORMATION:');
    console.log('User ID:', userDoc.id);
    console.log('Email:', userData.email);
    console.log('Display Name:', userData.displayName);
    console.log('');
    
    console.log('📊 CURRENT PROGRESS:');
    console.log('Current Week:', progress.currentWeek || 'Not set');
    console.log('Current Day:', progress.currentDay || 'Not set');
    console.log('Start Date:', progress.startDate || 'Not set (using default)');
    console.log('Has Completed All Weeks:', progress.hasCompletedAllWeeks || false);
    console.log('');
    
    console.log('🔔 MODAL FLAGS:');
    console.log('Has Seen New Year Transition:', progress.hasSeenNewYearTransition || false);
    console.log('Has Seen Start Date Tip:', progress.hasSeenStartDateTip || false);
    console.log('');
    
    console.log('📸 SNAPSHOT STATUS:');
    if (progress.newYearSnapshot) {
      console.log('✅ Snapshot exists!');
      console.log('  - Snapshot Week:', progress.newYearSnapshot.week);
      console.log('  - Snapshot Day:', progress.newYearSnapshot.day);
      console.log('  - Snapshot Year:', progress.newYearSnapshot.year);
      console.log('  - Snapshot Date:', progress.newYearSnapshot.snapshotDate);
      console.log('  - Snapshot Start Date:', progress.newYearSnapshot.startDate || 'None (default)');
    } else {
      console.log('❌ No snapshot found');
    }
    console.log('');
    
    // Analyze why modal didn't show
    console.log('🔍 DIAGNOSTIC ANALYSIS:');
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentDayOfMonth = now.getDate();
    const isInModalWindow = 
      (currentMonth === 11 && currentDayOfMonth >= 26) || 
      (currentMonth === 0 && currentDayOfMonth <= 15);
    
    console.log('Current Date:', now.toLocaleDateString());
    console.log('In Modal Window (Dec 26 - Jan 15):', isInModalWindow ? '✅ YES' : '❌ NO');
    console.log('');
    
    console.log('WHY MODAL MAY NOT HAVE SHOWN:');
    
    if (!isInModalWindow) {
      console.log('❌ Not in modal window period (should be Dec 26 - Jan 15)');
    } else {
      console.log('✅ Currently in modal window period');
    }
    
    if (progress.hasSeenNewYearTransition) {
      console.log('❌ User has already seen the transition modal');
    } else {
      console.log('✅ User has NOT seen the transition modal yet');
    }
    
    if (progress.startDate) {
      console.log('❌ User has a custom start date set (excluded from auto-reset)');
    } else {
      console.log('✅ User does NOT have custom start date (eligible for reset)');
    }
    
    if (progress.hasCompletedAllWeeks) {
      console.log('❌ User has completed all weeks (gets automatic reset, no prompt)');
    } else {
      console.log('✅ User has NOT completed all weeks');
    }
    
    if (!progress.newYearSnapshot && isInModalWindow) {
      console.log('⚠️  WARNING: User should have a snapshot but none exists!');
      console.log('   This means the scheduled function did not run or skipped this user.');
    }
    
    console.log('');
    console.log('📝 RECOMMENDATION:');
    
    if (progress.startDate) {
      console.log('You have a custom start date set, so your schedule should NOT reset.');
      console.log('This is expected behavior - only users on the default schedule reset.');
    } else if (!progress.newYearSnapshot && isInModalWindow) {
      console.log('The snapshot was not created for you. Possible reasons:');
      console.log('1. The scheduled function did not run on Dec 31, 2025');
      console.log('2. You were already on Week 1, Day 1 when it tried to run');
      console.log('3. Technical issue with the cloud function');
      console.log('');
      console.log('Would you like me to:');
      console.log('A) Manually create a snapshot with your current position');
      console.log('B) Check if you were on Week 1, Day 1 on Dec 31');
    } else if (progress.hasSeenNewYearTransition) {
      console.log('You already dismissed or acted on the New Year transition modal.');
      console.log('Your choice has been saved.');
    } else if (progress.hasCompletedAllWeeks) {
      console.log('You completed the entire curriculum, so you get an automatic fresh start!');
    } else {
      console.log('The modal should be showing! There might be a frontend issue.');
    }
    
  } catch (error) {
    console.error('Error diagnosing new year issue:', error);
  }
}

diagnoseNewYearIssue();

const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function fixUserProgress() {
  console.log('\n=== FIXING USER PROGRESS ===\n');
  
  try {
    // Get your user document
    const usersSnapshot = await db.collection('users')
      .where('email', '==', 'saniol@gmail.com')
      .get();
    
    if (usersSnapshot.empty) {
      console.error('❌ User not found');
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();
    const progress = userData.progress || {};
    
    console.log('📋 CURRENT STATE:');
    console.log('Current Week:', progress.currentWeek || 'Not set');
    console.log('Current Day:', progress.currentDay || 'Not set');
    console.log('Start Date:', progress.startDate || 'Not set');
    console.log('Has Seen New Year Transition:', progress.hasSeenNewYearTransition || false);
    console.log('');
    
    // Calculate what week/day they SHOULD be on based on the default start date
    // Default start date for 2026 is Monday, January 5, 2026
    const defaultStartDate = new Date(2026, 0, 5); // Jan 5, 2026
   
 const now = new Date();
    const daysSinceStart = Math.floor((now - defaultStartDate) / (1000 * 60 * 60 * 24));
    
    let calculatedWeek, calculatedDay;
    
    if (daysSinceStart < 0) {
      // Before start date
      calculatedWeek = 1;
      calculatedDay = 1;
    } else {
      // Week runs Monday-Sunday (5 reading days Mon-Fri, weekend Sat-Sun)
      const weeksSinceStart = Math.floor(daysSinceStart / 7);
      const dayOfWeekOffset = daysSinceStart % 7;
      
      calculatedWeek = Math.min(weeksSinceStart + 1, 52);
      
      // Monday=0, Tuesday=1, ... Friday=4, Sat=5, Sun=6
      if (dayOfWeekOffset < 5) {
        calculatedDay = dayOfWeekOffset + 1; // Mon=Day 1, Fri=Day 5
      } else {
        calculatedDay = 5; // Weekend, show Day 5 (catch-up)
      }
    }
    
    console.log('📅 CALCULATED POSITION (based on default schedule):');
    console.log('Should be on Week:', calculatedWeek);
    console.log('Should be on Day:', calculatedDay);
    console.log('');
    
    console.log('🔧 FIXING PROGRESS DATA...');
    console.log('');
    console.log('Actions to perform:');
    console.log('1. Set currentWeek to', calculatedWeek);
    console.log('2. Set currentDay to', calculatedDay);
    console.log('3. Initialize other missing progress fields');
    console.log('4. Clear hasSeenNewYearTransition flag so modal will show');
    console.log('');
    
    // Update the user document
    await userDoc.ref.update({
      'progress.currentWeek': calculatedWeek,
      'progress.currentDay': calculatedDay,
      'progress.lastAccessDate': admin.firestore.FieldValue.serverTimestamp(),
      'progress.completedReadings': progress.completedReadings || {},
      'progress.hasSeenNewYearTransition': false, // Reset this so modal shows
      'progress.hasSeenStartDateTip': progress.hasSeenStartDateTip || false,
      'updatedAt': admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ SUCCESS! Progress data has been fixed.');
    console.log('');
    console.log('📝 WHAT HAPPENS NEXT:');
    console.log('1. Your schedule is now properly initialized');
    console.log('2. You are on Week', calculatedWeek + ', Day', calculatedDay);
    console.log('3. The New Year transition modal should now appear when you log in');
    console.log('4. You can choose to either:');
    console.log('   a) Keep your current progress, OR');
    console.log('   b) Start fresh from Week 1, Day 1');
    console.log('');
    console.log('💡 TIP: Refresh your browser after seeing this message!');
    
  } catch (error) {
    console.error('❌ Error fixing progress:', error);
  } finally {
    process.exit(0);
  }
}

fixUserProgress();

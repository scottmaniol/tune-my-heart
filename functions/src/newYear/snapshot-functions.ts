import {onSchedule} from 'firebase-functions/v2/scheduler';
import {onCall, HttpsError} from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Scheduled function that runs on December 31st at 11:59 PM EST
 * Creates snapshots of user progress for those without custom start dates
 * who haven't completed the curriculum
 */
export const createNewYearSnapshots = onSchedule(
  {
    schedule: '59 23 31 12 *', // Run at 11:59 PM on Dec 31 every year
    timeZone: 'America/New_York',
  },
  async () => {
    console.log('Starting new year snapshot creation...');
    
    const now = new Date();
    const currentYear = now.getFullYear();
    
    try {
      // Get all users without custom start dates who haven't completed
      const usersSnapshot = await db.collection('users').get();
      
      let snapshotsCreated = 0;
      let usersSkipped = 0;
      const batch = db.batch();
      let batchCount = 0;
      
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        
        // Skip if user has custom start date
        if (progress.startDate) {
          usersSkipped++;
          continue;
        }
        
        // Skip if user has completed all weeks (they get automatic reset)
        if (progress.hasCompletedAllWeeks) {
          usersSkipped++;
          continue;
        }
        
        // Skip if user is already on Week 1, Day 1 (nothing to preserve)
        if (progress.currentWeek === 1 && progress.currentDay === 1) {
          usersSkipped++;
          continue;
        }
        
        // Create snapshot
        const snapshot = {
          year: currentYear,
          week: progress.currentWeek || 1,
          day: progress.currentDay || 1,
          startDate: progress.startDate || null,
          completedReadings: progress.completedReadings || {},
          snapshotDate: admin.firestore.Timestamp.now().toDate().toISOString(),
        };
        
        // Add update to batch
        batch.update(userDoc.ref, {
          'progress.newYearSnapshot': snapshot,
          updatedAt: admin.firestore.Timestamp.now(),
        });
        
        batchCount++;
        snapshotsCreated++;
        
        // Firestore batches can only handle 500 operations
        if (batchCount >= 500) {
          await batch.commit();
          batchCount = 0;
        }
        
        console.log(`Created snapshot for user ${userDoc.id}: Week ${snapshot.week}, Day ${snapshot.day}`);
      }
      
      // Commit any remaining batched updates
      if (batchCount > 0) {
        await batch.commit();
      }
      
      console.log(`
        New Year Snapshot Creation Complete:
        - Snapshots created: ${snapshotsCreated}
        - Users skipped: ${usersSkipped}
        - Total users processed: ${usersSnapshot.size}
      `);
      
    } catch (error) {
      console.error('Error creating new year snapshots:', error);
      throw error;
    }
  });

/**
 * Manual trigger function for testing snapshot creation
 * Can be called via HTTP to test the snapshot logic without waiting for Dec 31
 */
export const createNewYearSnapshotsManual = onCall(async (request) => {
    // Require authentication and admin role
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'User must be authenticated to create snapshots.'
      );
    }
    
    // Get user document to check if admin
    const userDoc = await db.collection('users').doc(request.auth.uid).get();
    if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
      throw new HttpsError(
        'permission-denied',
        'Only admins can manually create snapshots.'
      );
    }
    
    console.log(`Manual snapshot creation triggered by admin: ${request.auth.uid}`);
    
    const now = new Date();
    const currentYear = now.getFullYear();
    
    try {
      // Get all users without custom start dates who haven't completed
      const usersSnapshot = await db.collection('users').get();
      
      let snapshotsCreated = 0;
      let usersSkipped = 0;
      const batch = db.batch();
      let batchCount = 0;
      
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        
        // Skip if user has custom start date
        if (progress.startDate) {
          usersSkipped++;
          continue;
        }
        
        // Skip if user has completed all weeks
        if (progress.hasCompletedAllWeeks) {
          usersSkipped++;
          continue;
        }
        
        // Skip if user is already on Week 1, Day 1
        if (progress.currentWeek === 1 && progress.currentDay === 1) {
          usersSkipped++;
          continue;
        }
        
        // Create snapshot
        const snapshot = {
          year: currentYear,
          week: progress.currentWeek || 1,
          day: progress.currentDay || 1,
          startDate: progress.startDate || null,
          completedReadings: progress.completedReadings || {},
          snapshotDate: admin.firestore.Timestamp.now().toDate().toISOString(),
        };
        
        // Add update to batch
        batch.update(userDoc.ref, {
          'progress.newYearSnapshot': snapshot,
          updatedAt: admin.firestore.Timestamp.now(),
        });
        
        batchCount++;
        snapshotsCreated++;
        
        // Commit batch if it reaches 500 operations
        if (batchCount >= 500) {
          await batch.commit();
          batchCount = 0;
        }
      }
      
      // Commit any remaining operations
      if (batchCount > 0) {
        await batch.commit();
      }
      
      return {
        success: true,
        message: `Created ${snapshotsCreated} snapshots, skipped ${usersSkipped} users`,
        snapshotsCreated,
        usersSkipped,
        totalUsers: usersSnapshot.size,
      };
      
    } catch (error) {
      console.error('Error in manual snapshot creation:', error);
      throw new HttpsError(
        'internal',
        'Failed to create snapshots'
      );
    }
  });

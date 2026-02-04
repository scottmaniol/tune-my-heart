/**
 * Email Notification Functions for Tune My Heart
 * Sends daily, weekly, and late reminder emails based on user preferences
 */

import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import {Resend} from "resend";
import {getUpgradeEmailHTML} from "./upgrade-email-template";
import {getNewYearPrepEmailHTML} from "./new-year-prep-email-template";

// Resend email client
function getResendClient() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("Resend API key not configured. Please set RESEND_API_KEY environment variable.");
  }

  return new Resend(resendApiKey);
}

// Get frontend URL
function getFrontendUrl(): string {
  return process.env.FRONTEND_URL || "https://tunemyheart.com";
}

/**
 * Get the next incomplete reading based on what's been completed
 */
function getNextIncompleteReading(completedReadings: Record<string, any>): { week: number; day: number } {
  // Loop through all 52 weeks, 5 days each
  for (let week = 1; week <= 52; week++) {
    for (let day = 1; day <= 5; day++) {
      const key = `${week}-${day}`;
      // If this reading is not completed, it's the next one to do
      if (!completedReadings[key]?.completed) {
        return { week, day };
      }
    }
  }
  
  // If all readings are complete, return the last one
  return { week: 52, day: 5 };
}

/**
 * Calculate which week and day we should be on based on start date
 */
function getCurrentSchedulePosition(startDate: Date): { week: number; day: number } {
  const now = new Date();
  const diffTime = now.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate week and day (5 days per week)
  const totalWeeks = Math.floor(diffDays / 7); // Assuming 5 reading days + 2 rest days per week
  const dayOfWeek = diffDays % 7;
  
  // Only count weekdays (Mon-Fri are reading days)
  const readingDay = dayOfWeek < 5 ? dayOfWeek + 1 : 0; // 0 means it's a weekend
  
  return {
    week: Math.min(totalWeeks + 1, 52), // Cap at 52 weeks
    day: readingDay,
  };
}

/**
 * Check if user is behind schedule
 */
function isUserBehind(
  userProgress: { week: number; day: number },
  expectedPosition: { week: number; day: number }
): boolean {
  if (userProgress.week < expectedPosition.week) {
    return true;
  }
  if (userProgress.week === expectedPosition.week && userProgress.day < expectedPosition.day) {
    return true;
  }
  return false;
}

/**
 * Get today's reading for a user
 */
function getTodaysReading(week: number, day: number): string {
  // This would ideally import from the reading schedule data
  // For now, return a generic reference
  return `Week ${week}, Day ${day}`;
}

/**
 * Send daily reminder email
 */
async function sendDailyReminderEmail(
  email: string,
  displayName: string,
  week: number,
  day: number
): Promise<void> {
  const resend = getResendClient();
  const frontendUrl = getFrontendUrl();
  const reading = getTodaysReading(week, day);

  await resend.emails.send({
    from: "Tune My Heart <admin@g3min.org>",
    to: [email],
    subject: `Your Daily Reading - Week ${week}, Day ${day}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .reading { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; font-size: 18px; font-weight: 600; text-align: center; }
          .button { display: inline-block; background: #2a5876; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 10px;" />
            <h2 style="margin: 0; color: white; font-weight: bold;">Tune My Heart</h2>
          </div>
          <div class="content">
            <h2>Good morning, ${displayName}!</h2>
            <p>Your daily reading is ready:</p>
            
            <div class="reading">
              ${reading}
            </div>
            
            <p style="text-align: center;">
              <a href="${frontendUrl}/reading" class="button" style="color: white !important; text-decoration: none;">Start Reading</a>
            </p>
            
            <p><strong>Remember:</strong> "Your word is a lamp to my feet and a light to my path." - Psalm 119:105</p>
            
            <p>May the Lord bless your time in His Word today.</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for daily reading reminders.</p>
            <p><a href="${frontendUrl}/preferences" style="color: #2a5876;">Update your email preferences</a></p>
            <p>© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

/**
 * Send weekly reminder email
 */
async function sendWeeklyReminderEmail(
  email: string,
  displayName: string,
  week: number
): Promise<void> {
  const resend = getResendClient();
  const frontendUrl = getFrontendUrl();

  await resend.emails.send({
    from: "Tune My Heart <admin@g3min.org>",
    to: [email],
    subject: `Week ${week} Reading Plan`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .week-banner { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .button { display: inline-block; background: #2a5876; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 10px;" />
            <h2 style="margin: 0; color: white; font-weight: bold;">Tune My Heart</h2>
          </div>
          <div class="content">
            <h2>Hello, ${displayName}!</h2>
            <p>Welcome to a new week of reading God's Word!</p>
            
            <div class="week-banner">
              <h1 style="margin: 0; color: #2a5876;">Week ${week}</h1>
              <p style="margin: 10px 0 0 0;">5 days of readings await you this week</p>
            </div>
            
            <p style="text-align: center;">
              <a href="${frontendUrl}/schedule" class="button" style="color: white !important; text-decoration: none;">View This Week's Schedule</a>
            </p>
            
            <p><strong>This week's focus:</strong> Continue your journey through the Bible narratives as you grow closer to God through His Word.</p>
            
            <p><strong>Tip:</strong> Try setting aside a specific time each day for your readings to build a consistent habit of spending time with the Lord.</p>
            
            <p>May this week be filled with spiritual growth and joy in the Lord.</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for weekly reading reminders.</p>
            <p><a href="${frontendUrl}/preferences" style="color: #2a5876;">Update your email preferences</a></p>
            <p>© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

/**
 * Send one-week upgrade reminder email to free users
 */
async function sendOneWeekUpgradeEmail(
  email: string,
  displayName: string
): Promise<void> {
  const resend = getResendClient();
  const frontendUrl = getFrontendUrl();

  await resend.emails.send({
    from: "Tune My Heart <admin@g3min.org>",
    to: [email],
    subject: `✨ You've Been Using Tune My Heart for a Week!`,
    html: getUpgradeEmailHTML(displayName, frontendUrl),
  });
}

/**
 * Send "you're behind" reminder email
 */
async function sendBehindReminderEmail(
  email: string,
  displayName: string,
  userProgress: { week: number; day: number },
  expectedProgress: { week: number; day: number }
): Promise<void> {
  const resend = getResendClient();
  const frontendUrl = getFrontendUrl();

  await resend.emails.send({
    from: "Tune My Heart <admin@g3min.org>",
    to: [email],
    subject: `Catching Up on Your Reading Plan`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2a5876; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .progress-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F59E0B; }
          .button { display: inline-block; background: #2a5876; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 10px;" />
            <h2 style="margin: 0; color: white; font-weight: bold;">Tune My Heart</h2>
          </div>
          <div class="content">
            <h2>Hello, ${displayName}!</h2>
            <p>We noticed you've fallen a bit behind on your reading schedule. Don't worry - it happens to all of us!</p>
            
            <div class="progress-box">
              <p style="margin: 0;"><strong>Your current progress:</strong> Week ${userProgress.week}, Day ${userProgress.day}</p>
              <p style="margin: 10px 0 0 0;"><strong>Schedule position:</strong> Week ${expectedProgress.week}, Day ${expectedProgress.day}</p>
            </div>
            
            <p><strong>Remember:</strong> The goal isn't perfection, it's consistency and growth. Here are some tips to get back on track:</p>
            
            <ul>
              <li>Start with today's reading and don't worry about catching up all at once</li>
              <li>Set a specific time each day for Bible reading</li>
              <li>Even 10-15 minutes a day can make a big difference</li>
              <li>Consider using the weekend to catch up if needed</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="${frontendUrl}/reading" class="button" style="color: white !important; text-decoration: none;">Resume Your Reading</a>
            </p>
            
            <p><em>"Let us not grow weary of doing good, for in due season we will reap, if we do not give up." - Galatians 6:9</em></p>
            
            <p>We're praying for you as you continue in God's Word!</p>
          </div>
          <div class="footer">
            <p>You're receiving this email because you signed up for "when behind" reading reminders.</p>
            <p><a href="${frontendUrl}/preferences" style="color: #2a5876;">Update your email preferences</a></p>
            <p>© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

/**
 * Daily reminder function - runs every weekday at 5 AM EST
 * Cron: "0 5 * * 1-5" = At 5:00 AM, Monday through Friday
 * 
 * FIXED: Now sends user's NEXT INCOMPLETE READING instead of schedule position
 */
export const sendDailyReminders = onSchedule(
  {
    schedule: "0 5 * * 1-5",
    timeZone: "America/New_York",
  },
  async () => {
    console.log("Starting daily reminder emails...");

    try {
      const db = admin.firestore();
      
      // Get all users - we'll filter for daily reminders in code
      // This catches both users with "daily" and users without the field set (legacy users)
      const usersSnapshot = await db.collection("users").get();

      // Filter for users who want daily emails (explicit "daily" or no preference set)
      const dailyReminderUsers = usersSnapshot.docs.filter(doc => {
        const data = doc.data();
        const emailPref = data.preferences?.emailReminders;
        // Include if set to "daily" OR if not set (backward compatibility - default to daily)
        return emailPref === "daily" || !emailPref;
      });

      console.log(`Found ${dailyReminderUsers.length} users for daily reminders (${usersSnapshot.size} total users)`);

      let successCount = 0;
      let failureCount = 0;

      for (const doc of dailyReminderUsers) {
        const userData = doc.data();
        const progress = userData.progress || { completedReadings: {} };
        
        // FIX: Get user's NEXT INCOMPLETE reading instead of schedule position
        const completedReadings = progress.completedReadings || {};
        const nextReading = getNextIncompleteReading(completedReadings);
        
        try {
          await sendDailyReminderEmail(
            userData.email,
            userData.displayName,
            nextReading.week,
            nextReading.day
          );
          console.log(`Daily reminder sent to ${userData.email} for Week ${nextReading.week}, Day ${nextReading.day}`);
          successCount++;
        } catch (error) {
          console.error(`Failed to send daily reminder to ${userData.email}:`, error);
          failureCount++;
        }
      }

      console.log(`Daily reminder summary: ${successCount} sent, ${failureCount} failed`);
      console.log("Daily reminder emails completed");
    } catch (error) {
      console.error("Error in daily reminder function:", error);
    }
  });

/**
 * Weekly reminder function - runs every Monday at 5 AM EST
 * Cron: "0 5 * * 1" = At 5:00 AM on Monday
 */
export const sendWeeklyReminders = onSchedule(
  {
    schedule: "0 5 * * 1",
    timeZone: "America/New_York",
  },
  async () => {
    console.log("Starting weekly reminder emails...");

    try {
      const db = admin.firestore();
      
      // Get all users who have weekly email reminders enabled
      const usersSnapshot = await db
        .collection("users")
        .where("preferences.emailReminders", "==", "weekly")
        .get();

      console.log(`Found ${usersSnapshot.size} users with weekly reminders enabled`);

      let successCount = 0;
      let failureCount = 0;

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        const progress = userData.progress || { completedReadings: {} };
        
        // Get the next incomplete reading to determine which week they should focus on
        const completedReadings = progress.completedReadings || {};
        const nextReading = getNextIncompleteReading(completedReadings);
        
        try {
          await sendWeeklyReminderEmail(
            userData.email,
            userData.displayName,
            nextReading.week
          );
          console.log(`Weekly reminder sent to ${userData.email} for Week ${nextReading.week}`);
          successCount++;
        } catch (error) {
          console.error(`Failed to send weekly reminder to ${userData.email}:`, error);
          failureCount++;
        }
      }

      console.log(`Weekly reminder summary: ${successCount} sent, ${failureCount} failed`);
      console.log("Weekly reminder emails completed");
    } catch (error) {
      console.error("Error in weekly reminder function:", error);
    }
  });

/**
 * Check for users behind schedule - runs every Monday at 5:05 AM EST
 * Cron: "5 5 * * 1" = At 5:05 AM on Monday (5 min after weekly to avoid conflicts)
 */
export const sendBehindReminders = onSchedule(
  {
    schedule: "5 5 * * 1",
    timeZone: "America/New_York",
  },
  async () => {
    console.log("Checking for users behind schedule...");

    try {
      const db = admin.firestore();
      
      // Get all users who have "when-behind" email reminders enabled
      const usersSnapshot = await db
        .collection("users")
        .where("preferences.emailReminders", "==", "when-behind")
        .get();

      console.log(`Found ${usersSnapshot.size} users with 'when-behind' reminders enabled`);

      let successCount = 0;
      let failureCount = 0;

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        const progress = userData.progress || { completedReadings: {} };
        
        // Get their actual next incomplete reading
        const completedReadings = progress.completedReadings || {};
        const nextReading = getNextIncompleteReading(completedReadings);
        
        // Calculate where they should be based on start date
        const startDateStr = progress.startDate || userData.createdAt?.toDate?.() || new Date();
        const startDate = startDateStr instanceof Date ? startDateStr : new Date(startDateStr);
        const expectedPosition = getCurrentSchedulePosition(startDate);
        
        // Check if user is behind (compare next incomplete reading to expected position)
        if (isUserBehind(nextReading, expectedPosition)) {
          try {
            await sendBehindReminderEmail(
              userData.email,
              userData.displayName,
              nextReading,
              expectedPosition
            );
            console.log(`Behind reminder sent to ${userData.email} - Next: Week ${nextReading.week} Day ${nextReading.day}, Expected: Week ${expectedPosition.week} Day ${expectedPosition.day}`);
            successCount++;
          } catch (error) {
            console.error(`Failed to send behind reminder to ${userData.email}:`, error);
            failureCount++;
          }
        }
      }

      console.log(`Behind reminder summary: ${successCount} sent, ${failureCount} failed`);
      console.log("Behind reminder check completed");
    } catch (error) {
      console.error("Error in behind reminder function:", error);
    }
  });

/**
 * One-week upgrade reminder - runs every day at 6 AM EST
 * Targets free users who created their account exactly 7 days ago
 * Cron: "0 6 * * *" = At 6:00 AM every day
 */
export const sendOneWeekUpgradeReminder = onSchedule(
  {
    schedule: "0 6 * * *",
    timeZone: "America/New_York",
  },
  async () => {
    console.log("Starting one-week upgrade reminder emails...");

    try {
      const db = admin.firestore();
      
      // Calculate date range for users created 7 days ago (24-hour window)
      const now = new Date();
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      
      const sevenDaysAgoEnd = new Date(sevenDaysAgo);
      sevenDaysAgoEnd.setHours(23, 59, 59, 999);

      console.log(`Looking for free users created between ${sevenDaysAgo.toISOString()} and ${sevenDaysAgoEnd.toISOString()}`);
      
      // Get all users who:
      // 1. Are still on free plan
      // 2. Created their account 7 days ago
      const usersSnapshot = await db
        .collection("users")
        .where("subscription.status", "==", "free")
        .where("createdAt", ">=", sevenDaysAgo)
        .where("createdAt", "<=", sevenDaysAgoEnd)
        .get();

      console.log(`Found ${usersSnapshot.size} free users from 7 days ago`);

      let successCount = 0;
      let failureCount = 0;

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        
        try {
          await sendOneWeekUpgradeEmail(
            userData.email,
            userData.displayName || "Friend"
          );
          console.log(`One-week upgrade email sent to ${userData.email}`);
          successCount++;
        } catch (error) {
          console.error(`Failed to send upgrade email to ${userData.email}:`, error);
          failureCount++;
        }
      }

      console.log(`Upgrade reminder summary: ${successCount} sent, ${failureCount} failed`);
      console.log("One-week upgrade reminder emails completed");
    } catch (error) {
      console.error("Error in one-week upgrade reminder function:", error);
    }
  });

/**
 * New Year Preparation Email - runs annually on December 28th at 9 AM EST
 * Sends to ALL users to encourage them for the new year
 * Cron: "0 9 28 12 *" = At 9:00 AM on December 28th every year
 */
export const sendNewYearPrepReminders = onSchedule(
  {
    schedule: "0 9 28 12 *",
    timeZone: "America/New_York",
  },
  async () => {
    console.log("Starting New Year Preparation emails...");

    try {
      const db = admin.firestore();
      const resend = getResendClient();
      const frontendUrl = getFrontendUrl();
      
      // Get ALL users (no filtering by preferences - this is an annual encouragement)
      const usersSnapshot = await db.collection("users").get();

      console.log(`Found ${usersSnapshot.size} users for New Year Preparation email`);

      // Calculate next year for the email
      const now = new Date();
      const nextYear = now.getFullYear() + 1;

      let successCount = 0;
      let failureCount = 0;

      for (const doc of usersSnapshot.docs) {
        const userData = doc.data();
        
        try {
          await resend.emails.send({
            from: "Tune My Heart <admin@g3min.org>",
            to: [userData.email],
            subject: `🎊 A New Year of Bible Reading Awaits!`,
            html: getNewYearPrepEmailHTML(
              userData.displayName || "Friend",
              frontendUrl,
              nextYear
            ),
          });
          console.log(`New Year Preparation email sent to ${userData.email}`);
          successCount++;
        } catch (error) {
          console.error(`Failed to send New Year Preparation email to ${userData.email}:`, error);
          failureCount++;
        }
      }

      console.log(`New Year Preparation summary: ${successCount} sent, ${failureCount} failed`);
      console.log("New Year Preparation emails completed");
    } catch (error) {
      console.error("Error in New Year Preparation email function:", error);
    }
  });

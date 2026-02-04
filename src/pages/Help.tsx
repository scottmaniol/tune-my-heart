import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, HelpCircle, BookOpen, Church, Music, Lightbulb, Baby, Settings, Crown, Users, Calendar, Info, ArrowLeft, Smartphone } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: any;
  content: JSX.Element;
}

const Help = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections: Section[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Info,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body leading-relaxed">
            <strong>Welcome to Tune My Heart!</strong> This app provides a 52-week worship curriculum designed to help you and your family grow in faith through daily spiritual disciplines.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Account Types:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li><strong>Free:</strong> Access to basic reading plan</li>
              <li><strong>Individual ($15/year):</strong> Premium content for one user</li>
              <li><strong>Family ($20/year):</strong> Premium content for up to 10 family members</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">The 52-Week Structure:</h4>
            <p className="text-sm text-text-light">Each week includes 5 days (Monday-Friday) of content:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Daily Bible reading with notes</li>
              <li>Weekly catechism question</li>
              <li>Scripture memory verse</li>
              <li>Hymn of the week</li>
              <li>Children's Bible story</li>
              <li>Daily liturgy</li>
            </ul>
            <p className="text-sm text-text-light italic mt-2">
              💡 Weekends are designed for rest and catching up on any missed content.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'navigation',
      title: 'Navigation & Controls',
      icon: Calendar,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">The bottom navigation bar gives you complete control over your schedule:</p>
          <div className="space-y-2">
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-text mb-1">Week & Day Selectors</h4>
              <p className="text-sm text-text-light">Choose any week (1-52) and day (1-5) to view that day's content. You can manually type in numbers or use the forward/back arrows.</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-text mb-1">Forward/Back Arrows</h4>
              <p className="text-sm text-text-light">Navigate one day at a time. Going back from Day 1 takes you to the previous week's Day 5.</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-text mb-1">"Today" Button</h4>
              <p className="text-sm text-text-light">Instantly jump to the current calendar day's reading. Weekends default to Monday.</p>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-text mb-1">Bible Translation</h4>
              <p className="text-sm text-text-light">Choose from ESV, KJV, NKJV, NASB, or LSB. Your selection applies throughout the entire app.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'reading-plan',
      title: 'Reading Plan',
      icon: BookOpen,
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Two Reading Plans Available:</h4>
            <div className="bg-green-50 p-3 rounded">
              <p className="font-semibold text-text mb-1">📖 Narrative Plan (Default)</p>
              <p className="text-sm text-text-light">Focuses on Bible narratives, Psalms, and Proverbs. Perfect for understanding the story arc of Scripture.</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="font-semibold text-text mb-1">📚 Whole Bible Plan</p>
              <p className="text-sm text-text-light">Read through the entire Bible in a year, including all historical, prophetic, and epistolary books.</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Scripture passages displayed in your chosen translation</li>
              <li><strong>Premium:</strong> Study notes explaining difficult passages</li>
              <li><strong>Premium:</strong> Devotional reflections and applications</li>
              <li><strong>Premium:</strong> Discussion questions for personal or family reflection</li>
              <li>Mark readings as complete to track your progress</li>
              <li>Add personal journal reflections</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'liturgy',
      title: 'Daily Liturgy',
      icon: Church,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            The Daily Liturgy provides a structured guide for individual or family worship, following historic Christian patterns.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">What's Included:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Call to Worship</li>
              <li>Opening prayers and confessions</li>
              <li>Scripture readings (aligned with daily plan)</li>
              <li>Catechism question for the week</li>
              <li>Memory verse practice</li>
              <li>Hymn singing</li>
              <li>Closing prayers and benediction</li>
            </ul>
            <p className="text-sm text-text-light italic mt-2">
              💡 Perfect for morning or evening family devotions. Adapt it to fit your family's needs and schedule.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'catechism',
      title: 'Catechism',
      icon: HelpCircle,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            Learn foundational Christian doctrine through 52 carefully selected questions and answers from historic catechisms.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">What You'll Find:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>One catechism question per week</li>
              <li>Clear, biblical answers</li>
              <li><strong>Premium:</strong> Video explanations from theologians</li>
              <li><strong>Premium:</strong> Audio recordings for listening on-the-go</li>
              <li>Scriptural proofs supporting each answer</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">💡 Memorization Tips:</h4>
            <p className="text-sm text-text-light">
              Focus on one question per week. Recite it daily with your family. By the end of the year, you'll have memorized 52 doctrinal truths!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'memory',
      title: 'Scripture Memory',
      icon: Lightbulb,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            Hide God's Word in your heart with our progressive memory system and spaced repetition review.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Practice Mode - 5 Difficulty Levels:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-text-light ml-4">
              <li><strong>Level 1:</strong> Every 5th word hidden</li>
              <li><strong>Level 2:</strong> Every 3rd word hidden</li>
              <li><strong>Level 3:</strong> Every other word hidden</li>
              <li><strong>Level 4:</strong> Only first letters shown</li>
              <li><strong>Level 5:</strong> All words hidden (hardest)</li>
            </ol>
          </div>
          <div className="bg-yellow-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">📅 Review System:</h4>
            <p className="text-sm text-text-light mb-2">Your memory verses automatically appear for review on a strategic schedule:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li><strong>Daily:</strong> Current week's verse reviews every day</li>
              <li><strong>Odd/Even Weeks:</strong> Past verses alternate by week number</li>
              <li><strong>Day-Based:</strong> Verses assigned to specific weekdays</li>
              <li><strong>Monthly:</strong> Long-term review on specific dates</li>
            </ul>
            <p className="text-sm text-text-light italic mt-2">
              The system ensures you review at optimal intervals for long-term retention!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'hymnal',
      title: 'Hymn of the Week',
      icon: Music,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            Learn historic hymns that correspond to each week's biblical themes.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">What's Included:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Complete lyrics for all verses</li>
              <li><strong>Premium:</strong> Sheet music PDF downloads</li>
              <li><strong>Premium:</strong> Piano accompaniment audio tracks</li>
              <li><strong>Premium:</strong> Vocal recordings to learn the melody</li>
              <li>Historical background and context</li>
            </ul>
          </div>
          <div className="bg-pink-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">🎵 Learning Tips:</h4>
            <p className="text-sm text-text-light">
              Listen to the vocal track several times, then practice with the piano accompaniment. Sing one verse per day until you know it by heart. Use it in your family worship!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'childrens-bible',
      title: "Children's Bible",
      icon: Baby,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            Age-appropriate Bible stories with beautiful illustrations, perfect for children ages 4-10.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Simplified retellings of Bible narratives</li>
              <li>Colorful illustrations for each story</li>
              <li>Discussion questions for families</li>
              <li>Aligned with the weekly reading themes</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">💡 Using with Your Family:</h4>
            <p className="text-sm text-text-light">
              Read the story together, look at the pictures, and use the discussion questions to help your children understand and apply biblical truths.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'preferences',
      title: 'User Preferences',
      icon: Settings,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            Customize your experience in the User Dashboard (accessed via the user menu).
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Available Settings:</h4>
            <div className="space-y-2">
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold text-sm text-text">Bible Translation</p>
                <p className="text-xs text-text-light">Choose from ESV, KJV, NKJV, NASB, or LSB</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold text-sm text-text">Reading Plan</p>
                <p className="text-xs text-text-light">Select Narrative or Whole Bible plan</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold text-sm text-text">Schedule Pace Mode</p>
                <p className="text-xs text-text-light"><strong>Automatic:</strong> Follows calendar dates (5 days/week)</p>
                <p className="text-xs text-text-light"><strong>Manual:</strong> Advance at your own pace</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold text-sm text-text">Start Date</p>
                <p className="text-xs text-text-light">Set when you began the curriculum (only affects automatic mode)</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold text-sm text-text">Email Reminders</p>
                <p className="text-xs text-text-light">Choose: Daily, Weekly, When Behind, or Never</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-semibold text-sm text-text">App Installation</p>
                <p className="text-xs text-text-light">Install the app on your device for easy access</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'app-installation',
      title: 'Install to Your Device',
      icon: Smartphone,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            <strong>Tune My Heart is a Progressive Web App (PWA)</strong> that can be installed on your device for quick access, just like a native app!
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Benefits of Installing:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Launch directly from your home screen (mobile) or desktop</li>
              <li>Works like a native app with its own window</li>
              <li>Faster loading and better performance</li>
              <li>No app store approval required - install instantly</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">How to Install:</h4>
            <div className="bg-blue-50 p-3 rounded">
              <p className="font-semibold text-sm text-text mb-2">📱 iPhone/iPad (Safari)</p>
              <ol className="list-decimal list-inside space-y-1 text-xs text-text-light ml-2">
                <li>Tap the Share button (square with arrow)</li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" in the top right</li>
              </ol>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="font-semibold text-sm text-text mb-2">📱 Android (Chrome)</p>
              <ol className="list-decimal list-inside space-y-1 text-xs text-text-light ml-2">
                <li>Tap the menu (three dots) in the top right</li>
                <li>Tap "Add to Home screen" or "Install app"</li>
                <li>Tap "Add"</li>
              </ol>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <p className="font-semibold text-sm text-text mb-2">💻 Desktop (Chrome/Edge)</p>
              <ol className="list-decimal list-inside space-y-1 text-xs text-text-light ml-2">
                <li>Look for the install icon in the address bar (⊕)</li>
                <li>Or click menu (three dots) → "Install Tune My Heart"</li>
                <li>Click "Install" in the dialog</li>
              </ol>
            </div>
          </div>
          <p className="text-sm text-text-light italic mt-2">
            💡 Look for the installation instructions in your browser's menu or address bar. Not all browsers support PWA installation.
          </p>
        </div>
      ),
    },
    {
      id: 'completion',
      title: 'Completion & Celebration',
      icon: Crown,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            <strong>Celebrate your achievement!</strong> When you complete all 52 weeks of the reading plan, you'll unlock a special celebration and receive a personalized certificate.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">When You Complete All 52 Weeks:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>🎉 Celebration modal with confetti animation</li>
              <li>📜 Personalized completion certificate with your name</li>
              <li>🖨️ Download or print your certificate</li>
              <li>🔁 Option to start over and track multiple completion cycles</li>
              <li>🏆 Badge showing how many times you've completed the plan</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">📜 Your Certificate Includes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Your name and completion date</li>
              <li>Tune My Heart branding</li>
              <li>Inspirational Scripture verse</li>
              <li>Professional, printable design</li>
              <li>Completion cycle number (1st, 2nd, 3rd, etc.)</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">🔁 Starting Over:</h4>
            <p className="text-sm text-text-light">
              After completing all 52 weeks, you must manually click "Start Over" to begin a new cycle. Your completion history is preserved, and you can track how many times you've gone through the entire curriculum!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'email-notifications',
      title: 'Email Notifications',
      icon: HelpCircle,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            <strong>Stay on track with automated email reminders!</strong> Choose the reminder frequency that works best for you.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Email Reminder Options:</h4>
            <div className="bg-blue-50 p-3 rounded">
              <p className="font-semibold text-text mb-1">📧 Daily (Monday-Friday)</p>
              <p className="text-sm text-text-light mb-1">Sent at 5:00 AM EST every weekday</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-text-light ml-4">
                <li>Shows your current week and day</li>
                <li>Direct link to start reading</li>
                <li>Inspirational Scripture verse</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="font-semibold text-text mb-1">📅 Weekly (Monday)</p>
              <p className="text-sm text-text-light mb-1">Sent every Monday at 5:00 AM EST</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-text-light ml-4">
                <li>Overview of the week's reading plan</li>
                <li>Motivational content and tips</li>
                <li>Link to view the weekly schedule</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <p className="font-semibold text-text mb-1">⏰ When Behind (Monday)</p>
              <p className="text-sm text-text-light mb-1">Sent every Monday at 5:05 AM EST (only if behind)</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-text-light ml-4">
                <li>Compares your progress to schedule</li>
                <li>Only sends if you're behind</li>
                <li>Encouraging message with catch-up tips</li>
                <li>Emphasis on grace over perfection</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold text-text mb-1">🔕 Never</p>
              <p className="text-sm text-text-light">No email reminders will be sent</p>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">⚙️ Change Your Preference:</h4>
            <p className="text-sm text-text-light">
              Go to User Dashboard → Preferences → Email Reminders to update your preference at any time.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'subscription',
      title: 'Subscription Plans',
      icon: Crown,
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="border-2 border-gray-300 p-3 rounded-lg">
              <h4 className="font-semibold text-text mb-1">Free Plan</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
                <li>Basic Bible reading plan access</li>
                <li>Weekly catechism questions (text only)</li>
                <li>Scripture memory verses</li>
                <li>Hymn lyrics</li>
              </ul>
            </div>
            <div className="border-2 border-blue-400 bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-text mb-1">Individual Plan - $15/year</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
                <li>Everything in Free, plus:</li>
                <li>Study notes & devotionals</li>
                <li>Discussion questions</li>
                <li>Catechism videos & audio</li>
                <li>Hymn sheet music & recordings</li>
                <li>Children's Bible stories</li>
              </ul>
            </div>
            <div className="border-2 border-yellow-500 bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-semibold text-text mb-1">Family Plan - $20/year</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
                <li>Everything in Individual, plus:</li>
                <li>Up to 10 family members</li>
                <li>Each member has own account</li>
                <li>Independent progress tracking</li>
                <li>Family progress dashboard</li>
                <li>Co-manager capabilities</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-text-light italic">
            ✨ All premium plans include a 7-day free trial. Cancel anytime from the User Dashboard.
          </p>
        </div>
      ),
    },
    {
      id: 'family-features',
      title: 'Family Features',
      icon: Users,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-text font-body">
            <strong>Family plans are perfect for households who want to worship together!</strong>
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Adding Family Members:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Go to User Dashboard → Family Management</li>
              <li>Click "Add Member"</li>
              <li>Enter their name, email, and create a password</li>
              <li>They can log in with those credentials</li>
              <li>Each member can change their password after first login</li>
            </ol>
          </div>
          <div className="bg-indigo-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">👥 Manager Roles:</h4>
            <p className="text-sm text-text-light mb-2">
              <strong>Head of Household:</strong> The account creator. Full control over family.
            </p>
            <p className="text-sm text-text-light">
              <strong>Co-Managers:</strong> Other family members you designate can also add/remove members and view family progress.
            </p>
          </div>
          <div className="bg-indigo-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">📊 Family Progress Dashboard:</h4>
            <p className="text-sm text-text-light">Managers can view:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Each member's current week and day</li>
              <li>Overall progress percentage</li>
              <li>Journal reflections and answers</li>
              <li>Calendar view of completed readings</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-text">Individual Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Each member tracks their own progress independently</li>
              <li>Personal journal entries and reflections</li>
              <li>Individual preferences (translation, pace mode, etc.)</li>
              <li>All members share access to premium content</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'tips',
      title: 'Tips & Best Practices',
      icon: Lightbulb,
      content: (
        <div className="space-y-3">
          <div className="bg-green-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">🌅 Build Consistent Habits</h4>
            <p className="text-sm text-text-light">
              Choose a specific time each day for your reading. Morning devotions work well for many families. Consistency is more important than perfection!
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">👨‍👩‍👧‍👦 Family Worship Ideas</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-light ml-4">
              <li>Gather everyone for the daily liturgy</li>
              <li>Take turns reading Scripture passages aloud</li>
              <li>Discuss the reflection questions together</li>
              <li>Practice the memory verse as a family</li>
              <li>Sing the hymn of the week together</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">📅 Staying On Track</h4>
            <p className="text-sm text-text-light">
              Life happens! If you fall behind, use the weekend to catch up. The "manual pace mode" is perfect if you want to go at your own speed without feeling pressure.
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <h4 className="font-semibold text-text mb-1">✍️ Journal Reflections</h4>
            <p className="text-sm text-text-light">
              Writing down your thoughts helps you internalize what you learn. Answer the discussion questions thoughtfully, and you'll build a year-long record of spiritual growth.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      icon: HelpCircle,
      content: (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-text mb-1">Q: Can I start mid-year?</h4>
            <p className="text-sm text-text-light">
              A: Yes! Use manual pace mode and start at Week 1, or use automatic mode and set your start date. You can begin anytime.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-1">Q: What if I miss a day?</h4>
            <p className="text-sm text-text-light">
              A: No problem! Use the weekend to catch up, or just continue forward. The goal is spiritual growth, not perfection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-1">Q: Can children have their own accounts?</h4>
            <p className="text-sm text-text-light">
              A: Yes, with a family plan. Each family member gets their own login and can track their progress independently.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-1">Q: How do I change my Bible translation?</h4>
            <p className="text-sm text-text-light">
              A: Use the translation selector in the bottom navigation bar, or change it permanently in User Dashboard → Preferences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-1">Q: Can I cancel my subscription?</h4>
            <p className="text-sm text-text-light">
              A: Yes, anytime. Go to User Dashboard → Manage Billing to view or cancel your subscription through the Stripe portal.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-1">Q: How does the memory review system work?</h4>
            <p className="text-sm text-text-light">
              A: It uses spaced repetition! Verses appear for review at strategic intervals to help you retain them long-term. Check the Scripture Memory page for the full schedule explanation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-1">Q: What's the difference between automatic and manual pace mode?</h4>
            <p className="text-sm text-text-light">
              A: Automatic follows the calendar (5 days per week, Monday-Friday). Manual lets you advance at your own speed regardless of dates.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="card">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-body font-semibold">Back</span>
        </button>
        
        <div className="flex items-center gap-3">
          <HelpCircle className="text-primary" size={32} />
          <div>
            <h1 className="text-3xl font-heading text-primary">
              Help & Documentation
            </h1>
            <p className="text-text-light font-body">
              Everything you need to know about using Tune My Heart for your daily worship and spiritual growth.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <div key={section.id} className="card">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-heading text-text text-lg font-semibold">
                    {section.title}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-text-light flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-text-light flex-shrink-0" />
                )}
              </button>
              
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="card bg-blue-50 border border-blue-200">
        <p className="text-sm text-text font-body text-center">
          <strong>Need more help?</strong> Contact support at{' '}
          <a href="mailto:admin@g3min.org" className="text-primary underline">
            admin@g3min.org
          </a>
        </p>
      </div>
    </div>
  );
};

export default Help;

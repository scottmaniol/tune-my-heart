/**
 * Welcome email templates for new users
 * Three variants: Free, Individual, Family
 * All use primary color #2a5876 and flat icons
 */

/**
 * FREE PLAN WELCOME EMAIL
 */
export function getFreeWelcomeEmailHTML(displayName: string, frontendUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2a5876; color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; }
        .hero { text-align: center; margin: 30px 0; }
        .hero-icon { margin-bottom: 20px; display: flex; justify-content: center; }
        .icon-circle { width: 80px; height: 80px; border-radius: 50%; background: #2a5876; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 40px; }
        .feature-list { margin: 30px 0; }
        .feature-item { display: flex; align-items: start; margin-bottom: 16px; }
        .feature-icon { min-width: 30px; color: #10b981; font-size: 18px; font-weight: bold; }
        .feature-text { font-size: 15px; color: #374151; line-height: 1.5; }
        .cta-button { display: inline-block; background: #2a5876; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .tip-box { background: #eff6ff; border-left: 4px solid #2a5876; padding: 20px; border-radius: 4px; margin: 30px 0; }
        .tip-title { font-weight: 700; color: #2a5876; margin: 0 0 10px 0; font-size: 16px; display: flex; align-items: center; }
        .tip-icon { display: inline-block; width: 24px; height: 24px; border-radius: 4px; background: #2a5876; color: white; font-size: 16px; line-height: 24px; text-align: center; margin-right: 8px; }
        .premium-grid { margin: 30px 0; }
        .premium-feature { background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 12px; }
        .premium-feature-title { font-weight: 700; color: #1f2937; font-size: 15px; margin: 0 0 5px 0; display: flex; align-items: center; }
        .premium-feature-icon { display: inline-block; width: 32px; height: 32px; border-radius: 6px; background: #2a5876; color: white; font-size: 18px; line-height: 32px; text-align: center; margin-right: 10px; }
        .premium-feature-desc { font-size: 14px; color: #6b7280; margin: 0; padding-left: 42px; }
        .pricing-highlight { background: #fef3c7; border: 2px solid #fbbf24; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
        .pricing-amount { font-size: 36px; font-weight: bold; color: #92400e; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .footer a { color: #2a5876; text-decoration: none; }
        .divider { border-top: 1px solid #e5e7eb; margin: 30px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Tune My Heart</h1>
        </div>
        
        <div class="content">
          <div class="hero">
            <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 15px 0;">Welcome, ${displayName}!</h2>
            <p style="color: #6b7280; font-size: 18px; margin: 0;">Your journey through God's Word begins today</p>
          </div>
          
          <p style="font-size: 16px; color: #374151;">Thank you for joining Tune My Heart! We're excited to help you grow in your knowledge of Scripture through our narrative Bible reading plan.</p>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0;">What's Included in Your Free Account</h3>
          
          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>52-Week Bible Reading Schedule</strong> - Follow the narrative arc of Scripture through the year</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Multiple Bible Translations</strong> - Choose from ESV, KJV, NKJV, and more</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Progress Tracking</strong> - See your reading progress and completed weeks</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Customizable Schedule</strong> - Set your own start date to match your journey</div>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/reading" class="cta-button" style="color: white !important; text-decoration: none;">
              Start Reading Today
            </a>
          </div>
          
          <div class="tip-box">
            <p class="tip-title">
              <span class="tip-icon">💡</span>
              Customize Your Start Date
            </p>
            <p style="font-size: 14px; color: #1e40af; margin: 0;">
              Your reading schedule automatically follows the calendar year, but you can set a custom start date in <a href="${frontendUrl}/preferences" style="color: #2a5876; font-weight: 600;">Preferences</a> to match your personal schedule. This is perfect if you're joining mid-year!
            </p>
          </div>
          
          <div class="divider"></div>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0; text-align: center;">Want More?</h3>
          <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">Upgrade to Premium for deeper study tools and family features</p>
          
          <div class="premium-grid">
            <div class="premium-feature">
              <p class="premium-feature-title">
                <span class="premium-feature-icon">📚</span>
                Study Notes & Commentary
              </p>
              <p class="premium-feature-desc">Deepen your understanding with expert insights and historical context</p>
            </div>
            
            <div class="premium-feature">
              <p class="premium-feature-title">
                <span class="premium-feature-icon">✍️</span>
                Daily Devotionals
              </p>
              <p class="premium-feature-desc">Start each day with inspiring devotional content</p>
            </div>
            
            <div class="premium-feature">
              <p class="premium-feature-title">
                <span class="premium-feature-icon">🎯</span>
                Scripture Memory Tools
              </p>
              <p class="premium-feature-desc">Memorize and review key verses with our memory system</p>
            </div>
            
            <div class="premium-feature">
              <p class="premium-feature-title">
                <span class="premium-feature-icon">👶</span>
                Children's Bible Stories
              </p>
              <p class="premium-feature-desc">Age-appropriate content for your little ones</p>
            </div>
            
            <div class="premium-feature">
              <p class="premium-feature-title">
                <span class="premium-feature-icon">👨‍👩‍👧‍👦</span>
                Family Sharing (Family Plan)
              </p>
              <p class="premium-feature-desc">Add up to 10 family members with shared progress tracking</p>
            </div>
          </div>
          
          <div class="pricing-highlight">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #92400e; font-weight: 600;">Premium Plans</p>
            <div style="margin-bottom: 15px;">
              <span class="pricing-amount">$15</span>
              <span style="font-size: 18px; color: #92400e;">/year</span>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #92400e;">Individual Plan</p>
            </div>
            <div style="margin-bottom: 15px;">
              <span class="pricing-amount">$20</span>
              <span style="font-size: 18px; color: #92400e;">/year</span>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #92400e;">Family Plan (Best Value!)</p>
            </div>
            <p style="margin: 15px 0 0 0; font-size: 14px; color: #92400e; font-weight: 600;">✨ 7-Day Free Trial</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/upgrade" class="cta-button" style="color: white !important; text-decoration: none;">
              Upgrade to Premium
            </a>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 14px; font-style: italic; margin: 30px 0;">
            "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">You're receiving this email because you created a Tune My Heart account.</p>
          <p style="margin: 0;">
            <a href="${frontendUrl}/preferences">Preferences</a> · 
            <a href="${frontendUrl}/help">Get Help</a>
          </p>
          <p style="margin: 15px 0 0 0;">© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * FAMILY PLAN WELCOME EMAIL
 */
export function getFamilyWelcomeEmailHTML(displayName: string, frontendUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2a5876; color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; position: relative; }
        .family-badge { position: absolute; top: 15px; right: 20px; background: #fbbf24; color: #92400e; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; }
        .badge-icon { margin-right: 4px; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; }
        .hero { text-align: center; margin: 30px 0; }
        .hero-icon { margin-bottom: 20px; display: flex; justify-content: center; }
        .icon-circle { width: 80px; height: 80px; border-radius: 50%; background: #2a5876; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 40px; }
        .feature-list { margin: 30px 0; }
        .feature-item { display: flex; align-items: start; margin-bottom: 16px; }
        .feature-icon { min-width: 30px; color: #10b981; font-size: 18px; font-weight: bold; }
        .feature-text { font-size: 15px; color: #374151; line-height: 1.5; }
        .family-features { margin: 30px 0; }
        .family-feature-box { background: #eff6ff; border: 2px solid #2a5876; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
        .family-feature-header { display: flex; align-items: center; margin-bottom: 12px; }
        .family-feature-icon { display: inline-block; width: 40px; height: 40px; border-radius: 8px; background: #2a5876; color: white; font-size: 22px; line-height: 40px; text-align: center; margin-right: 12px; }
        .family-feature-title { font-weight: 700; font-size: 17px; color: #1f2937; margin: 0; }
        .family-feature-desc { font-size: 14px; color: #374151; margin: 0; line-height: 1.6; }
        .family-feature-list { list-style: none; padding: 0; margin: 8px 0 0 0; }
        .family-feature-list li { font-size: 14px; color: #374151; padding-left: 24px; position: relative; margin-top: 6px; }
        .family-feature-list li:before { content: "•"; position: absolute; left: 8px; color: #2a5876; font-weight: bold; }
        .cta-button { display: inline-block; background: #2a5876; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .tip-box { background: #eff6ff; border-left: 4px solid #2a5876; padding: 20px; border-radius: 4px; margin: 30px 0; }
        .tip-title { font-weight: 700; color: #2a5876; margin: 0 0 10px 0; font-size: 16px; display: flex; align-items: center; }
        .tip-icon { display: inline-block; width: 24px; height: 24px; border-radius: 4px; background: #2a5876; color: white; font-size: 16px; line-height: 24px; text-align: center; margin-right: 8px; }
        .getting-started { background: #f0fdf4; border: 2px solid #86efac; border-radius: 8px; padding: 24px; margin: 30px 0; }
        .getting-started-title { font-weight: 700; color: #166534; margin: 0 0 15px 0; font-size: 18px; }
        .step-list { list-style: none; padding: 0; margin: 0; }
        .step-list li { padding: 10px 0 10px 35px; position: relative; font-size: 15px; color: #15803d; }
        .step-number { position: absolute; left: 0; width: 24px; height: 24px; border-radius: 50%; background: #22c55e; color: white; font-size: 14px; line-height: 24px; text-align: center; font-weight: 700; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .footer a { color: #2a5876; text-decoration: none; }
        .divider { border-top: 1px solid #e5e7eb; margin: 30px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Tune My Heart</h1>
        </div>
        
        <div class="content">
          <div class="hero">
            <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 15px 0;">Welcome to the Family Plan, ${displayName}!</h2>
            <p style="color: #6b7280; font-size: 18px; margin: 0;">Growing together in faith as a family</p>
          </div>
          
          <p style="font-size: 16px; color: #374151;">Thank you for subscribing to the Tune My Heart Family Plan! We're honored to be part of your family's discipleship journey. Your plan includes everything you need to help your entire household grow in God's Word together.</p>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0;">All Premium Features Included</h3>
          
          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Bible Reading Schedule</strong> - 52-week narrative plan through Scripture</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Study Notes & Commentary</strong> - Expert insights and historical context</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Daily Devotionals</strong> - Inspiring content to start each day</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Scripture Memory Tools</strong> - Memorize and review key verses</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Children's Bible Stories</strong> - Age-appropriate content for kids</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">✓</div>
              <div class="feature-text"><strong>Hymnal Resources</strong> - Sheet music and audio recordings</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0;">Plus Exclusive Family Features</h3>
          
          <div class="family-features">
            <div class="family-feature-box">
              <div class="family-feature-header">
                <div class="family-feature-icon">👥</div>
                <p class="family-feature-title">Family Management</p>
              </div>
              <p class="family-feature-desc">Add up to 10 family members to your plan, each with their own account and preferences.</p>
              <ul class="family-feature-list">
                <li>Individual accounts for each family member</li>
                <li>Age-appropriate content for everyone</li>
                <li>Easy account creation and management</li>
              </ul>
            </div>
            
            <div class="family-feature-box">
              <div class="family-feature-header">
                <div class="family-feature-icon">📊</div>
                <p class="family-feature-title">Family Dashboard</p>
              </div>
              <p class="family-feature-desc">Track everyone's reading progress in one convenient place.</p>
              <ul class="family-feature-list">
                <li>See who's keeping up with their reading</li>
                <li>View completed readings for each member</li>
                <li>Celebrate milestones together</li>
              </ul>
            </div>
            
            <div class="family-feature-box">
              <div class="family-feature-header">
                <div class="family-feature-icon">⚙️</div>
                <p class="family-feature-title">Individual Preferences</p>
              </div>
              <p class="family-feature-desc">Each family member can customize their own experience.</p>
              <ul class="family-feature-list">
                <li>Choose preferred Bible translation</li>
                <li>Set personal reading schedule</li>
                <li>Customize start dates individually</li>
              </ul>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/family" class="cta-button" style="color: white !important; text-decoration: none;">
              Add Family Members
            </a>
          </div>
          
          <div class="getting-started">
            <p class="getting-started-title">Getting Started</p>
            <ul class="step-list">
              <li><span class="step-number">1</span> Add your family members from the Family Management page</li>
              <li><span class="step-number">2</span> Each person sets their own preferences and start date</li>
              <li><span class="step-number">3</span> Begin reading together and track progress as a family!</li>
            </ul>
          </div>
          
          <div class="tip-box">
            <p class="tip-title">
              <span class="tip-icon">💡</span>
              Customize Each Family Member's Start Date
            </p>
            <p style="font-size: 14px; color: #1e40af; margin: 0;">
              Each family member can set their own start date in <a href="${frontendUrl}/preferences" style="color: #2a5876; font-weight: 600;">Preferences</a>! This is perfect if some family members are joining mid-year or want to start at different times. Everyone can move at their own pace while you track progress together.
            </p>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 14px; font-style: italic; margin: 30px 0;">
            "These words that I command you today shall be on your heart. You shall teach them diligently to your children, and shall talk of them when you sit in your house, and when you walk by the way, and when you lie down, and when you rise." - Deuteronomy 6:6-7
          </p>
          
          <p style="font-size: 15px; color: #374151; text-align: center;">
            We're honored to support your family's journey through Scripture!<br>
            May God richly bless your household as you grow together in His Word.
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">You're receiving this email because you subscribed to the Tune My Heart Family Plan.</p>
          <p style="margin: 0;">
            <a href="${frontendUrl}/family">Family Management</a> · 
            <a href="${frontendUrl}/subscription">Manage Subscription</a> · 
            <a href="${frontendUrl}/help">Get Help</a>
          </p>
          <p style="margin: 15px 0 0 0;">© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * INDIVIDUAL PLAN WELCOME EMAIL
 */
export function getIndividualWelcomeEmailHTML(displayName: string, frontendUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2a5876; color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; position: relative; }
        .premium-badge { position: absolute; top: 15px; right: 20px; background: #fbbf24; color: #92400e; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; }
        .badge-icon { margin-right: 4px; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; }
        .hero { text-align: center; margin: 30px 0; }
        .hero-icon { margin-bottom: 20px; display: flex; justify-content: center; }
        .icon-circle { width: 80px; height: 80px; border-radius: 50%; background: #2a5876; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 40px; }
        .feature-section { margin: 30px 0; }
        .feature-item { display: flex; align-items: start; margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; }
        .feature-icon-box { min-width: 48px; margin-right: 16px; }
        .feature-icon { display: inline-block; width: 48px; height: 48px; border-radius: 8px; background: #2a5876; color: white; font-size: 24px; line-height: 48px; text-align: center; }
        .feature-content { flex: 1; }
        .feature-title { font-weight: 700; font-size: 16px; color: #1f2937; margin: 0 0 5px 0; }
        .feature-desc { font-size: 14px; color: #6b7280; margin: 0; line-height: 1.5; }
        .feature-list { list-style: none; padding: 0; margin: 8px 0 0 0; }
        .feature-list li { font-size: 13px; color: #6b7280; padding-left: 20px; position: relative; margin-top: 4px; }
        .feature-list li:before { content: "•"; position: absolute; left: 8px; color: #2a5876; }
        .cta-button { display: inline-block; background: #2a5876; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .tip-box { background: #eff6ff; border-left: 4px solid #2a5876; padding: 20px; border-radius: 4px; margin: 30px 0; }
        .tip-title { font-weight: 700; color: #2a5876; margin: 0 0 10px 0; font-size: 16px; display: flex; align-items: center; }
        .tip-icon { display: inline-block; width: 24px; height: 24px; border-radius: 4px; background: #2a5876; color: white; font-size: 16px; line-height: 24px; text-align: center; margin-right: 8px; }
        .getting-started { background: #f0fdf4; border: 2px solid #86efac; border-radius: 8px; padding: 24px; margin: 30px 0; }
        .getting-started-title { font-weight: 700; color: #166534; margin: 0 0 15px 0; font-size: 18px; }
        .step-list { list-style: none; padding: 0; margin: 0; }
        .step-list li { padding: 10px 0 10px 35px; position: relative; font-size: 15px; color: #15803d; }
        .step-number { position: absolute; left: 0; width: 24px; height: 24px; border-radius: 50%; background: #22c55e; color: white; font-size: 14px; line-height: 24px; text-align: center; font-weight: 700; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .footer a { color: #2a5876; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Tune My Heart</h1>
        </div>
        
        <div class="content">
          <div class="hero">
            <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 15px 0;">Welcome to Premium, ${displayName}!</h2>
            <p style="color: #6b7280; font-size: 18px; margin: 0;">Thank you for subscribing to Tune My Heart Premium</p>
          </div>
          
          <p style="font-size: 16px; color: #374151;">You now have full access to all our premium features designed to deepen your understanding of Scripture and strengthen your walk with God.</p>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0;">Your Premium Features</h3>
          
          <div class="feature-section">
            <div class="feature-item">
              <div class="feature-icon-box">
                <div class="feature-icon">📖</div>
              </div>
              <div class="feature-content">
                <p class="feature-title">Bible Reading Schedule</p>
                <p class="feature-desc">Follow the narrative arc of Scripture through the year</p>
                <ul class="feature-list">
                  <li>52-week guided plan</li>
                  <li>Multiple translations</li>
                </ul>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon-box">
                <div class="feature-icon">📚</div>
              </div>
              <div class="feature-content">
                <p class="feature-title">Study Notes & Commentary</p>
                <p class="feature-desc">Deepen your understanding with expert insights</p>
                <ul class="feature-list">
                  <li>Historical context</li>
                  <li>Theological insights</li>
                </ul>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon-box">
                <div class="feature-icon">✍️</div>
              </div>
              <div class="feature-content">
                <p class="feature-title">Daily Devotionals</p>
                <p class="feature-desc">Start each day with inspiring content</p>
                <ul class="feature-list">
                  <li>Morning inspiration</li>
                  <li>Scripture applications</li>
                </ul>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon-box">
                <div class="feature-icon">🎯</div>
              </div>
              <div class="feature-content">
                <p class="feature-title">Scripture Memory Tools</p>
                <p class="feature-desc">Memorize and review key verses</p>
                <ul class="feature-list">
                  <li>Memory verse system</li>
                  <li>Progress tracking</li>
                </ul>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon-box">
                <div class="feature-icon">👶</div>
              </div>
              <div class="feature-content">
                <p class="feature-title">Children's Bible Stories</p>
                <p class="feature-desc">Age-appropriate content for little ones</p>
                <ul class="feature-list">
                  <li>Family-friendly narratives</li>
                  <li>Engaging illustrations</li>
                </ul>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon-box">
                <div class="feature-icon">🎵</div>
              </div>
              <div class="feature-content">
                <p class="feature-title">Hymnal Resources</p>
                <p class="feature-desc">Rich worship through traditional hymns</p>
                <ul class="feature-list">
                  <li>Sheet music & audio</li>
                  <li>Full hymnal access</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/reading" class="cta-button" style="color: white !important; text-decoration: none;">
              Start Reading Today
            </a>
          </div>
          
          <div class="tip-box">
            <p class="tip-title">
              <span class="tip-icon">💡</span>
              Customize Your Start Date
            </p>
            <p style="font-size: 14px; color: #1e40af; margin: 0;">
              Your reading schedule automatically follows the calendar year, but you can set a custom start date in <a href="${frontendUrl}/preferences" style="color: #2a5876; font-weight: 600;">Preferences</a> to match your personal schedule. This is perfect if you're joining mid-year or want to start at a different time!
            </p>
          </div>
          
          <div class="getting-started">
            <p class="getting-started-title">Getting Started</p>
            <ul class="step-list">
              <li><span class="step-number">1</span> Set your preferred Bible translation in Preferences</li>
              <li><span class="step-number">2</span> Choose your start date (or keep the default)</li>
              <li><span class="step-number">3</span> Begin with Week 1, Day 1 and start your journey!</li>
            </ul>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 14px; font-style: italic; margin: 30px 0;">
            "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
          </p>
          
          <p style="font-size: 15px; color: #374151; text-align: center;">
            We're excited to see how God uses this in your life!<br>
            May the Lord bless your time in His Word.
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">You're receiving this email because you subscribed to Tune My Heart Premium.</p>
          <p style="margin: 0;">
            <a href="${frontendUrl}/subscription">Manage Subscription</a> · 
            <a href="${frontendUrl}/preferences">Preferences</a> · 
            <a href="${frontendUrl}/help">Get Help</a>
          </p>
          <p style="margin: 15px 0 0 0;">© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

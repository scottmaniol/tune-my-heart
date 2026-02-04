/**
 * Upgrade email template with flat Lucide-style SVG icons
 */

export function getUpgradeEmailHTML(displayName: string, frontendUrl: string): string {
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
        .benefits-grid { margin: 30px 0; }
        .benefit { display: flex; align-items: start; margin-bottom: 24px; }
        .benefit-icon { min-width: 48px; margin-right: 16px; }
        .benefit-content { flex: 1; }
        .benefit-title { font-weight: 700; font-size: 16px; color: #1f2937; margin: 0 0 5px 0; }
        .benefit-desc { font-size: 14px; color: #6b7280; margin: 0; line-height: 1.5; }
        .pricing-amount { font-size: 48px; font-weight: bold; margin: 10px 0; }
        .pricing-period { font-size: 18px; opacity: 0.9; }
        .pricing-subtext { font-size: 14px; opacity: 0.8; margin-top: 10px; }
        .cta-button { display: inline-block; background: #2a5876; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .trust-badge { background: #f0fdf4; border: 2px solid #86efac; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center; }
        .trust-badge-title { font-weight: 700; color: #166534; margin: 0 0 10px 0; font-size: 16px; }
        .trust-items { font-size: 14px; color: #15803d; line-height: 1.8; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .footer a { color: #2a5876; text-decoration: none; }
        .plan-box { border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 15px 0; }
        .plan-box.featured { border-color: #2a5876; background: #f0f9ff; }
        .plan-title { font-size: 20px; font-weight: 700; color: #2a5876; margin: 0 0 10px 0; }
        .plan-price { font-size: 32px; font-weight: 700; color: #1f2937; margin: 10px 0; }
        .plan-feature { font-size: 14px; color: #374151; margin: 8px 0; padding-left: 24px; position: relative; }
        .checkmark { color: #10b981; font-weight: bold; position: absolute; left: 0; }
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
            <div style="margin-bottom: 20px;">
              <div style="display: inline-block; width: 80px; height: 80px; border-radius: 50%; background: #2a5876; color: white; font-size: 40px; line-height: 80px; text-align: center; font-weight: bold;">★</div>
            </div>
            <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 15px 0;">Congratulations, ${displayName}!</h2>
            <p style="color: #6b7280; font-size: 18px; margin: 0;">You've been growing in God's Word for a whole week!</p>
          </div>
          
          <p style="font-size: 16px; color: #374151;">We're thrilled to see you engaging with the Bible narratives. You've experienced the basics of Tune My Heart, but there's so much more waiting for you with <strong>Premium</strong>.</p>
          
          <h3 style="color: #1f2937; font-size: 22px; margin: 30px 0 20px 0; text-align: center;">Choose Your Plan</h3>
          
          <div class="plan-box">
            <p class="plan-title"><span style="display: inline-block; width: 40px; height: 40px; border-radius: 6px; background: #2a5876; color: white; font-size: 20px; line-height: 40px; text-align: center; font-weight: bold; margin-right: 10px; vertical-align: middle; font-family: Arial, sans-serif;">◐</span> Individual Plan</p>
            <p class="plan-price">$15<span style="font-size: 16px; font-weight: normal; color: #6b7280;">/year</span></p>
            <div class="plan-feature"><span class="checkmark">✓</span> All free features</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Summary content & study notes</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Daily devotionals</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Scripture memory tools</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Children's Bible stories</div>
            <div class="plan-feature"><span class="checkmark">✓</span> 7-day free trial</div>
          </div>
          
          <div class="plan-box featured">
            <p class="plan-title"><span style="display: inline-block; width: 40px; height: 40px; border-radius: 6px; background: #2a5876; color: white; font-size: 20px; line-height: 40px; text-align: center; font-weight: bold; margin-right: 10px; vertical-align: middle; font-family: Arial, sans-serif;">◉◉</span> Family Plan (Best Value!)</p>
            <p class="plan-price">$20<span style="font-size: 16px; font-weight: normal; color: #6b7280;">/year</span></p>
            <div class="plan-feature"><span class="checkmark">✓</span> All Individual features</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Up to 10 family members</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Shared progress tracking</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Family dashboard</div>
            <div class="plan-feature"><span class="checkmark">✓</span> Multiple reading plans</div>
            <div class="plan-feature"><span class="checkmark">✓</span> 7-day free trial</div>
          </div>
          
          
          <div style="text-align: center;">
            <a href="${frontendUrl}/upgrade" class="cta-button" style="color: white !important; text-decoration: none;">
              Start Your 7-Day Free Trial
            </a>
          </div>
          
          <div class="trust-badge">
            <p class="trust-badge-title"><span style="display: inline-block; width: 28px; height: 28px; border-radius: 4px; background: #10b981; color: white; font-size: 18px; line-height: 28px; text-align: center; font-weight: bold; margin-right: 6px; vertical-align: middle;">✓</span> 100% Risk-Free Trial</p>
            <div class="trust-items">
              ✓ Full access to all premium features<br>
              ✓ 7 days completely free<br>
              ✓ Cancel anytime with one click<br>
              ✓ No commitment required
            </div>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 14px; font-style: italic; margin: 30px 0;">
            "Your word is a lamp to my feet and a light to my path." - Psalm 119:105
          </p>
          
          <p style="font-size: 15px; color: #374151; text-align: center;">
            Ready to take your Bible reading journey to the next level?<br>
            We can't wait to see how God uses this in your life!
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;">You're receiving this email because you created a Tune My Heart account one week ago.</p>
          <p style="margin: 0;">
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

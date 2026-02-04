/**
 * Password Reset Email Template for Tune My Heart
 * Branded email template for custom password reset flow
 */

export function getPasswordResetEmailHTML(displayName: string, resetLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2a5876; color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; }
        .icon-box { text-align: center; margin: 20px 0; }
        .icon-circle { width: 80px; height: 80px; border-radius: 50%; background: #dbeafe; display: inline-flex; align-items: center; justify-content: center; }
        .cta-button { display: inline-block; background: #2a5876; color: white !important; padding: 16px 40px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: 700; font-size: 18px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .cta-button:hover { background: #1e3a4f; box-shadow: 0 6px 12px rgba(0,0,0,0.15); }
        .info-box { background: #fef3c7; border-left: 4px solid #F59E0B; padding: 15px 20px; border-radius: 4px; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 30px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
        .footer a { color: #2a5876; text-decoration: none; }
        .security-notice { background: #e0f2fe; padding: 15px 20px; border-radius: 6px; margin: 20px 0; font-size: 14px; color: #0c4a6e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/images%2Ftune-my-heart-logo.png?alt=media" alt="Tune My Heart" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Password Reset Request</h1>
        </div>
        
        <div class="content">
          <div class="icon-box">
            <img src="https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/public%2Fpassword.jpg?alt=media" alt="Password Reset" style="width: 80px; height: 80px; display: block; margin: 0 auto;" />
          </div>
          
          <h2 style="color: #1f2937; font-size: 24px; margin: 20px 0;">Hello, ${displayName}!</h2>
          
          <p style="font-size: 16px; color: #374151; margin: 15px 0;">We received a request to reset your password for your Tune My Heart account.</p>
          
          <p style="font-size: 16px; color: #374151; margin: 15px 0;">Click the button below to choose a new password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" class="cta-button" style="color: white !important; text-decoration: none;">
              Reset My Password
            </a>
          </div>
          
          <div class="security-notice">
            <p style="margin: 0; font-weight: 600;">🛡️ Security Notice</p>
            <p style="margin: 10px 0 0 0;">This link will expire in <strong>30 minutes</strong> and can only be used once. If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
          
          <div class="info-box">
            <p style="margin: 0; font-size: 14px;"><strong>Can't click the button?</strong></p>
            <p style="margin: 10px 0 0 0; font-size: 13px; word-break: break-all; color: #6b7280;">Copy and paste this link into your browser:</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; word-break: break-all; color: #2563eb;">${resetLink}</p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin: 25px 0 0 0; text-align: center; font-style: italic;">
            "The Lord is my strength and my shield; in him my heart trusts." - Psalm 28:7
          </p>
        </div>
        
        <div class="footer">
          <p style="margin: 0 0 10px 0;"><strong>Need help?</strong></p>
          <p style="margin: 0 0 15px 0;">
            If you're having trouble resettting your password, please contact our support team.
          </p>
          <p style="margin: 0;">
            <a href="https://tunemyheart.com/help">Get Help</a> · 
            <a href="https://tunemyheart.com">Visit Tune My Heart</a>
          </p>
          <p style="margin: 20px 0 0 0; color: #9ca3af;">© ${new Date().getFullYear()} Tune My Heart. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

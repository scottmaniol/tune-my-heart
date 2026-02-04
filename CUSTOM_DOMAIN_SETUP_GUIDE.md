# Custom Domain Setup Guide - Tune My Heart

This guide will walk you through setting up **tunemyheart.com** (primary) and **tunemyheart.org** (redirect) for your Firebase-hosted app.

---

## Overview

- **Primary Domain**: tunemyheart.com
- **Secondary Domain**: tunemyheart.org (redirects to .com)
- **Domain Registrar**: GoDaddy
- **Hosting**: Firebase Hosting
- **SSL**: Automatically provisioned by Firebase

---

## Part 1: Firebase Console Setup

### Step 1: Add tunemyheart.com (Primary Domain)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **tune-my-heart**
3. In the left sidebar, click **Hosting**
4. Scroll down to the "Domains" section
5. Click **Add custom domain**
6. Enter: `tunemyheart.com`
7. Click **Continue**

**You'll see a verification screen with DNS records. Keep this window open!**

Firebase will provide you with:
- **A Records** (usually 2 IP addresses)
- **TXT Record** (for domain verification)

### Step 2: Add tunemyheart.org (Redirect Domain)

1. After completing tunemyheart.com setup, click **Add custom domain** again
2. Enter: `tunemyheart.org`
3. Select: **Redirect to an existing website**
4. Choose: `tunemyheart.com` as the redirect target
5. Select: **Permanent redirect (301)**
6. Click **Continue**

Firebase will provide DNS records for this domain too.

### Step 3: Set Primary Domain

1. Once both domains are added (after SSL provisioning completes)
2. In the Domains section, find `tunemyheart.com`
3. Click the three-dot menu and select **Set as primary domain**

---

## Part 2: GoDaddy DNS Configuration

### For tunemyheart.com:

1. Log in to your [GoDaddy Account](https://www.godaddy.com)
2. Go to **My Products**
3. Find **tunemyheart.com** and click **DNS**
4. Scroll to the DNS Records section

**Add A Records** (Firebase will give you these - typically two):
- Click **Add**
- Type: **A**
- Name: **@** (represents the root domain)
- Value: `151.101.1.195` (first IP from Firebase)
- TTL: **1 hour** (or 600 seconds)
- Click **Save**
- Repeat for the second A record IP (usually `151.101.65.195`)

**Add TXT Record** (for verification):
- Click **Add**
- Type: **TXT**
- Name: **@**
- Value: (paste the TXT value from Firebase - looks like `firebase=project-id...`)
- TTL: **1 hour**
- Click **Save**

**Remove or Update Conflicting Records**:
- If there's an existing A record with Name "@", delete it or update it
- If there's a CNAME record with Name "@", delete it

### For tunemyheart.org:

Repeat the same process:
1. In GoDaddy, go to **tunemyheart.org** → DNS
2. Add the A records (same IPs as .com)
3. Add the TXT record for verification
4. Remove conflicting records

---

## Part 3: DNS Propagation & SSL Provisioning

### Timeline:
- **DNS Propagation**: 15 minutes to 48 hours (usually much faster)
- **SSL Certificate Provisioning**: Automatic, starts after DNS verification
- **Full Setup**: Usually complete within 24 hours

### Check Status:

**In Firebase Console:**
- Go to Hosting → Domains
- You'll see status for each domain:
  - ⏳ **Pending** - Waiting for DNS verification
  - 🔄 **Provisioning SSL** - DNS verified, creating certificate
  - ✅ **Connected** - Fully operational with SSL

**Check DNS Propagation:**
```bash
# Check if DNS has propagated
dig tunemyheart.com
dig tunemyheart.org

# Or use online tools:
# https://www.whatsmydns.net
```

---

## Part 4: Application Configuration Updates

### ✅ Already Updated Files:

The following have been updated to use `https://tunemyheart.com`:

1. **functions/.env** - `FRONTEND_URL` updated
2. All hardcoded URLs in codebase checked

### Firebase Functions Environment Config

After DNS is working, set the production environment variable:

```bash
firebase functions:config:set frontend.url="https://tunemyheart.com"
```

Then redeploy functions:

```bash
cd functions
npm run build
cd ..
firebase deploy --only functions
```

---

## Part 5: Update External Services

### Stripe Configuration (If Applicable)

If you're using Stripe for payments:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Settings** → **Branding**
3. Update your website URL to `https://tunemyheart.com`

**Update Checkout URLs:**
- Go to **Developers** → **Checkout settings**
- Update success/cancel redirect URLs to use tunemyheart.com

**Update Webhook URLs (if using):**
- Go to **Developers** → **Webhooks**
- Update endpoint URLs to use your custom domain

### Google OAuth (If Using Google Sign-In)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Update OAuth 2.0 Client IDs:
   - Add `https://tunemyheart.com` to **Authorized JavaScript origins**
   - Add `https://tunemyheart.com/__/auth/handler` to **Authorized redirect URIs**

---

## Part 6: Testing Checklist

### Once SSL is provisioned (domains show "Connected" in Firebase):

- [ ] **Visit tunemyheart.com** - Should load with SSL (🔒)
- [ ] **Visit tunemyheart.org** - Should redirect to tunemyheart.com
- [ ] **Test www subdomain** - Visit www.tunemyheart.com (Firebase handles this)
- [ ] **Test all routes**:
  - [ ] Login page
  - [ ] Sign up page
  - [ ] Dashboard
  - [ ] Reading plan
  - [ ] Family management
- [ ] **Test email functionality**:
  - [ ] Add a test family member
  - [ ] Check that invitation email arrives
  - [ ] Verify email links use tunemyheart.com
  - [ ] Click login link in email - should work
- [ ] **Test authentication**:
  - [ ] Sign up for new account
  - [ ] Log in
  - [ ] Password reset email
  - [ ] OAuth (if configured)
- [ ] **Test payment flows** (if applicable):
  - [ ] Subscription checkout
  - [ ] Customer portal
  - [ ] Webhook delivery

### Browser Testing:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Troubleshooting

### Domain shows "Pending" for a long time
- **Check DNS records** - Make sure A records and TXT record are correctly configured
- **Wait longer** - DNS can take up to 48 hours (though usually much faster)
- **Remove conflicting records** - Delete old A or CNAME records in GoDaddy

### SSL Certificate Not Provisioning
- **Verify DNS first** - Firebase can't provision SSL until DNS is verified
- **Check for CAA records** - GoDaddy may have CAA records that block Let's Encrypt
- **Wait 24 hours** - SSL provisioning is automatic but can take time

### Emails Still Using Old Domain
- **Check functions/.env** - Make sure FRONTEND_URL is updated
- **Redeploy functions** - Changes require redeployment
- **Check Firebase config** - Run `firebase functions:config:get` to verify

### 404 Errors on Routes
- **Check firebase.json** - Rewrites should be configured (already done)
- **Rebuild and redeploy** - Run `npm run build && firebase deploy --only hosting`

### Redirect Not Working (tunemyheart.org)
- **Check Firebase setup** - Make sure .org is configured as redirect
- **Clear browser cache** - Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- **Check SSL** - Both domains need SSL before redirect works

---

## GoDaddy-Specific Tips

### Finding DNS Settings:
1. My Products → Domain Name → DNS
2. Or use direct link: `https://dcc.godaddy.com/control/[yourdomain]/dns`

### DNS Propagation Time:
- GoDaddy TTL defaults to 1 hour
- You can temporarily set to 600 seconds (10 minutes) for faster propagation
- After setup is complete, you can increase TTL back to 1 hour or more

### Common GoDaddy Issues:
- **Forwarding vs DNS**: Don't use GoDaddy's forwarding feature - use DNS records
- **Parking Page**: Make sure domain forwarding is disabled
- **Default Records**: GoDaddy adds default records - replace them with Firebase records

---

## Final Deployment Commands

Once DNS is configured and SSL is provisioned:

### 1. Deploy Functions (with updated environment):
```bash
# Set production config
firebase functions:config:set frontend.url="https://tunemyheart.com"

# Build and deploy
cd functions
npm run build
cd ..
firebase deploy --only functions
```

### 2. Deploy Hosting:
```bash
# Build production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### 3. Verify Deployment:
```bash
# Check which URLs are active
firebase hosting:channel:list

# View recent deployments
firebase hosting:releases:list
```

---

## Post-Setup Maintenance

### Updating Content:
- Regular deployments don't require DNS changes
- Your custom domains will continue to work

### Renewing Domains:
- Renew domains at GoDaddy before expiration
- DNS records remain the same
- SSL certificates auto-renew via Firebase

### Adding More Domains:
- Follow the same process for any additional domains
- Can add as many as needed

---

## Important Security Notes

1. **Always use HTTPS** - Firebase enforces this automatically
2. **Keep DNS records** - Don't delete A records or TXT records
3. **Monitor SSL expiration** - Firebase handles renewal, but monitor status
4. **Update services** - When changing domains, update all external integrations

---

## Support Resources

- **Firebase Hosting Docs**: https://firebase.google.com/docs/hosting/custom-domain
- **GoDaddy DNS Help**: https://www.godaddy.com/help/manage-dns-records-680
- **DNS Propagation Checker**: https://www.whatsmydns.net
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

## Summary Checklist

- [ ] Add tunemyheart.com in Firebase Console
- [ ] Add tunemyheart.org in Firebase Console (as redirect)
- [ ] Configure DNS records in GoDaddy for both domains
- [ ] Wait for DNS propagation and SSL provisioning
- [ ] Update functions/.env with new FRONTEND_URL ✅ (Already done)
- [ ] Set Firebase Functions config
- [ ] Deploy functions
- [ ] Test both domains
- [ ] Test email links
- [ ] Update Stripe (if applicable)
- [ ] Update OAuth providers (if applicable)
- [ ] Set tunemyheart.com as primary in Firebase Console

---

**You're all set!** Follow this guide, and your custom domains will be up and running. Most setups complete within a few hours.

# Custom Domain Testing Checklist - tunemyheart.com

## ✅ Setup Complete

Your custom domain is now fully configured! Here's what to test to ensure everything works perfectly.

---

## 🌐 Domain & SSL Tests

### Basic Access Tests:
- [ ] Visit **https://tunemyheart.com** - Should load with SSL (🔒 padlock)
- [ ] Visit **http://tunemyheart.com** - Should redirect to HTTPS
- [ ] Visit **https://www.tunemyheart.com** - Should work (Firebase handles www)
- [ ] Visit **https://tunemyheart.org** - Should redirect to tunemyheart.com

**Expected Result:** All URLs should work with SSL and show your app

---

## 📧 Email Link Tests (CRITICAL)

These are the most important tests to ensure automated emails use the correct domain:

### Family Member Invitation Test:
1. [ ] Log in to your app at tunemyheart.com
2. [ ] Go to **Family Management**
3. [ ] Click **Add Family Member**
4. [ ] Create a test family member with a real email you can check
5. [ ] Check the email inbox
6. [ ] **Verify the email arrived**
7. [ ] **Check the login link** - It should be: `https://tunemyheart.com/login`
8. [ ] Click the login link - Should take you to tunemyheart.com login page
9. [ ] Test logging in with the credentials

**❌ FAIL if:** Email links still show `tune-my-heart.web.app`
**✅ PASS if:** Email links show `tunemyheart.com`

### Password Reset Email Test:
1. [ ] Go to **https://tunemyheart.com/login**
2. [ ] Click **Forgot Password?**
3. [ ] Enter your email
4. [ ] Check email inbox
5. [ ] **Verify the reset link uses:** `https://tunemyheart.com/`
6. [ ] Click the reset link
7. [ ] Should take you to reset password page on tunemyheart.com

---

## 🔐 Authentication Tests

### Sign Up Test:
- [ ] Go to **https://tunemyheart.com/signup**
- [ ] Create a new test account
- [ ] Should successfully create account
- [ ] Should stay on tunemyheart.com domain

### Login Test:
- [ ] Go to **https://tunemyheart.com/login**
- [ ] Log in with existing account
- [ ] Should successfully log in
- [ ] Should redirect to dashboard on tunemyheart.com

### Logout Test:
- [ ] Click logout
- [ ] Should redirect to login page
- [ ] URL should remain tunemyheart.com

---

## 📱 App Functionality Tests

### Core Features:
- [ ] **Dashboard** - Loads correctly at tunemyheart.com/dashboard
- [ ] **Reading Plan** - Access Bible readings
- [ ] **Scripture Memory** - View memory verses
- [ ] **Hymnal** - Play hymns
- [ ] **Catechism** - View catechism questions
- [ ] **Children's Bible** - Access stories
- [ ] **Resources** - View curriculum resources
- [ ] **Preferences** - Update user settings
- [ ] **Family Management** - Manage family members (if applicable)

### Navigation:
- [ ] All internal links keep you on tunemyheart.com
- [ ] No links redirect back to tune-my-heart.web.app
- [ ] Browser back/forward buttons work correctly

---

## 💳 Payment Tests (If Using Stripe)

If you have Stripe subscriptions configured:

- [ ] Go to **Subscription** page
- [ ] Click **Upgrade** or **Subscribe**
- [ ] Stripe checkout opens correctly
- [ ] After payment, redirects back to tunemyheart.com
- [ ] Billing portal link works (if configured)

**Note:** You may need to update Stripe settings:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Settings → Branding → Update website to `https://tunemyheart.com`
3. Developers → Checkout settings → Update redirect URLs

---

## 🖥️ Browser Testing

Test on multiple browsers to ensure compatibility:

### Desktop:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

### Mobile:
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Mobile responsiveness works

---

## 🔍 Console & Network Tests

### Check for Errors:
1. [ ] Open Developer Tools (F12)
2. [ ] Go to **Console** tab
3. [ ] Navigate around the app
4. [ ] **Look for errors** - Should be minimal warnings only

### Check Network Requests:
1. [ ] Open Developer Tools → **Network** tab
2. [ ] Filter to **XHR/Fetch**
3. [ ] Verify API calls are successful
4. [ ] Check for any 404 or 500 errors

---

## 📊 Performance Tests

- [ ] Homepage loads in under 3 seconds
- [ ] No broken images or missing resources
- [ ] Audio files (hymns) play correctly
- [ ] PDF resources open correctly

---

## 🎯 DNS & Redirect Verification

### Check tunemyheart.org redirect:
```bash
curl -I https://tunemyheart.org
```
**Expected:** Should show `301 Moved Permanently` and `Location: https://tunemyheart.com`

### Check DNS resolution:
```bash
dig tunemyheart.com
dig tunemyheart.org
```
**Expected:** Both should resolve to Firebase IPs (151.101.x.x)

---

## ✉️ Email Configuration Verification

### Verify Environment Variables:
```bash
# Check local functions config
cat functions/.env

# Check Firebase production config
firebase functions:config:get
```

**Expected output:**
- Local: `FRONTEND_URL=https://tunemyheart.com`
- Production: Should include `frontend.url: "https://tunemyheart.com"`

---

## 🐛 Troubleshooting

### If Email Links Still Use Old Domain:

1. **Check functions/.env:**
   ```bash
   cat functions/.env | grep FRONTEND_URL
   ```
   Should show: `FRONTEND_URL=https://tunemyheart.com`

2. **Check production config:**
   ```bash
   firebase functions:config:get
   ```
   Should show: `"frontend": { "url": "https://tunemyheart.com" }`

3. **Redeploy if needed:**
   ```bash
   cd functions
   npm run build
   cd ..
   firebase deploy --only functions
   ```

4. **Clear test data and retry**

### If Domain Doesn't Load:

1. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
2. Try incognito/private window
3. Check Firebase Console → Hosting → Domains for status
4. Verify DNS records in GoDaddy haven't changed

### If SSL Shows Warning:

1. Wait - SSL can take up to 24 hours
2. Check Firebase Console for SSL status
3. Verify domain shows "Connected" in Firebase

---

## 📝 Success Criteria

Your custom domain setup is **COMPLETE** when:

✅ tunemyheart.com loads with SSL (🔒)
✅ tunemyheart.org redirects to .com
✅ All email links use tunemyheart.com
✅ Authentication works on custom domain
✅ All app features function correctly
✅ No console errors
✅ Mobile responsive

---

## 🎉 Post-Setup

Once all tests pass:

1. **Update your marketing materials** to use tunemyheart.com
2. **Inform users** of the new domain (if changing from another)
3. **Monitor Firebase Hosting** for any issues
4. **Check email deliverability** periodically
5. **Set up monitoring** (optional) for uptime

---

## 📞 Support

- **Setup Guide:** CUSTOM_DOMAIN_SETUP_GUIDE.md
- **Quick Start:** DOMAIN_SETUP_QUICK_START.md
- **Email Setup:** EMAIL_SETUP_GUIDE.md

---

**Domain Setup Date:** December 25, 2025
**Primary Domain:** tunemyheart.com
**Secondary Domain:** tunemyheart.org (redirect)
**SSL:** Enabled (Firebase-managed)
**Email Links:** Configured ✅
**Functions:** Deployed ✅

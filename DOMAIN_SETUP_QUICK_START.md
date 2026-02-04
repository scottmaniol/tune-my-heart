# Custom Domain Setup - Quick Start Guide

## ✅ Completed Steps

- [x] Updated FRONTEND_URL in functions/.env to https://tunemyheart.com
- [x] Updated fallback URLs in functions code
- [x] Updated documentation with new domain
- [x] Deployed functions with new configuration

---

## 🎯 Your Next Steps

### Step 1: Add Custom Domains in Firebase Console

1. Go to **[Firebase Console](https://console.firebase.google.com/project/tune-my-heart/hosting/sites)**
2. Click on **Hosting** in the left sidebar
3. Scroll to the **Domains** section

**Add tunemyheart.com:**
- Click **Add custom domain**
- Enter: `tunemyheart.com`
- Click **Continue**
- **IMPORTANT:** Copy the DNS records provided (A records and TXT record)
- Keep this window open or save the DNS records

**Add tunemyheart.org:**
- Click **Add custom domain** again
- Enter: `tunemyheart.org`
- Select: **"Redirect to an existing website"**
- Choose: `tunemyheart.com` as redirect target
- Select: **"Permanent redirect (301)"**
- Click **Continue**
- **IMPORTANT:** Copy the DNS records provided
- Keep this window open or save the DNS records

---

### Step 2: Configure DNS in GoDaddy

**For tunemyheart.com:**

1. Log in to **[GoDaddy](https://www.godaddy.com)**
2. Go to **My Products**
3. Find **tunemyheart.com** → Click **DNS**

**Add A Records** (Firebase gives you 2):
```
Type: A
Name: @
Value: [First IP from Firebase - usually 151.101.1.195]
TTL: 600 (10 minutes for faster propagation)
```
Click **Add** and repeat for the second A record IP.

**Add TXT Record** (for domain verification):
```
Type: TXT
Name: @
Value: [Paste from Firebase - looks like "firebase=tune-my-heart..."]
TTL: 600
```

**Remove Conflicting Records:**
- Delete any existing A record with Name "@"
- Delete any CNAME record with Name "@"

**For tunemyheart.org:**

Repeat the same process:
1. Go to **tunemyheart.org** → **DNS**
2. Add the same A records
3. Add the TXT record from Firebase
4. Remove any conflicting records

---

### Step 3: Wait for DNS Propagation & SSL

**Timeline:**
- DNS propagation: 10 minutes to 48 hours (usually 1-2 hours)
- SSL certificate: Automatic after DNS verification

**Check Status:**
- In Firebase Console → Hosting → Domains
- Watch for status changes:
  - ⏳ **Pending** → DNS not verified yet
  - 🔄 **Provisioning SSL** → DNS verified, creating certificate
  - ✅ **Connected** → Ready to use!

**Quick DNS Check:**
```bash
# Check if DNS has updated
dig tunemyheart.com
dig tunemyheart.org
```

Or use: https://www.whatsmydns.net

---

### Step 4: Set Production Environment Config

Once domains are working, set the production Firebase config:

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

### Step 5: Set Primary Domain in Firebase

Once both domains show "Connected":
1. Go to Firebase Console → Hosting → Domains
2. Find **tunemyheart.com**
3. Click the **⋮** menu
4. Select **"Set as primary domain"**

---

## 📋 Testing Checklist

Once SSL provisioning is complete:

### Basic Tests:
- [ ] Visit https://tunemyheart.com (should load with SSL 🔒)
- [ ] Visit https://tunemyheart.org (should redirect to .com)
- [ ] Visit https://www.tunemyheart.com (Firebase handles www automatically)

### App Functionality:
- [ ] Login page works
- [ ] Sign up works
- [ ] Dashboard loads
- [ ] All routes accessible

### Email Tests (CRITICAL):
- [ ] Go to Family Management
- [ ] Add a test family member
- [ ] Check email arrives
- [ ] **Verify email links use tunemyheart.com** (not tune-my-heart.web.app)
- [ ] Click login link in email - should work

### Authentication:
- [ ] New user signup
- [ ] Login/logout
- [ ] Password reset email

---

## 🔧 If You Need to Update Stripe

If you're using Stripe subscriptions, update these settings:

1. **[Stripe Dashboard](https://dashboard.stripe.com)**
2. Go to **Settings** → **Branding**
3. Update website URL to: `https://tunemyheart.com`

**Checkout URLs:**
- Go to **Developers** → **Checkout settings**
- Update redirect URLs to use tunemyheart.com

---

## 🆘 Troubleshooting

**Domains stuck on "Pending":**
- Double-check A records and TXT record in GoDaddy
- Make sure you deleted old conflicting records
- Wait longer (can take up to 48 hours, but usually faster)

**SSL not provisioning:**
- DNS must be verified first
- Can take up to 24 hours after DNS verification
- Check Firebase Console for any error messages

**Emails still showing old domain:**
- Check functions/.env has `FRONTEND_URL=https://tunemyheart.com` ✅
- Run `firebase functions:config:get` to verify production config
- Redeploy functions if needed

**Can't access site on new domain:**
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Try incognito/private window
- Check DNS propagation with dig or whatsmydns.net

---

## 📞 Need Help?

Refer to the detailed guide: **CUSTOM_DOMAIN_SETUP_GUIDE.md**

---

## ✨ Summary

**What's Done:**
- ✅ Code updated for new domain
- ✅ Functions deployed
- ✅ Email system configured

**What You Need to Do:**
1. Add domains in Firebase Console (5 minutes)
2. Configure DNS in GoDaddy (5 minutes)
3. Wait for DNS & SSL (1-24 hours)
4. Test everything
5. Update Stripe (if applicable)

**Expected Result:**
- tunemyheart.com → Your app (primary)
- tunemyheart.org → Redirects to .com
- All email links use tunemyheart.com
- Full SSL encryption
- Professional custom domain! 🎉

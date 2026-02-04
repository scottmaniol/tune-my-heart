# Bible API Setup Guide

This guide will help you get API keys for different Bible translations.

## Option 1: ESV API (Highly Recommended)

**Best for:** ESV translation (most popular modern translation)

### Steps:
1. Go to https://api.esv.org
2. Click "Get API Key" or "Register"
3. Fill out the form (name, email, organization)
4. Accept the terms of service
5. You'll receive an API key immediately

### Free Tier:
- 5,000 requests per day
- No credit card required
- Perfect for personal/church use

### Add to .env.local:
```
VITE_ESV_API_KEY=your_esv_api_key_here
```

---

## Option 2: API.Bible (Currently Used)

**Best for:** Multiple translations (KJV, NKJV, NASB, etc.)

### Steps:
1. Go to https://scripture.api.bible
2. Click "Get Started" or "Sign Up"
3. Create an account
4. Go to your dashboard
5. Create a new API key

### Free Tier:
- Multiple translations available
- Reasonable rate limits
- Good for testing

### Add to .env.local:
```
VITE_BIBLE_API_KEY=your_api_bible_key_here
```

---

## Option 3: Self-Hosted Bible Database (Advanced)

For complete control and no API limits, you can:
1. Download Bible JSON files from open sources
2. Store in Firebase Firestore
3. Modify `bibleApi.ts` to read from Firestore instead of external APIs

**Pros:** No rate limits, works offline, complete control
**Cons:** Requires more setup, larger database

---

## Testing Without API Keys

The app is configured to show placeholder text when API keys aren't configured:

```
[Scripture text for Genesis 1:1-2:3 will appear here once API key is configured]
```

Users can still:
- Navigate the

 reading plan
- See which passages to read
- Read from their physical Bible
- Use the journaling features

---

## Current Configuration

The app checks for API keys in this order:

1. **ESV:** If `VITE_ESV_API_KEY` is set and ESV is selected → uses ESV API
2. **API.Bible:** For all other translations → uses API.Bible
3. **Placeholder:** If no keys are set → shows placeholder text

---

## Recommended Setup for Production

1. Get ESV API key (free, easy, popular translation)
2. Get API.Bible key (covers KJV, NKJV, NASB)
3. For LSB, either:
   - Contact Legacy Standard Bible for API access
   - Self-host LSB text in Firestore
   - Use KJV as fallback (similar language)

---

## Rate Limits & Best Practices

### ESV API:
- 5,000 requests/day (free tier)
- Cache responses in browser/Firestore
- One request per passage per translation

### API.Bible:
- Check current rate limits on their dashboard
- Similar caching strategy recommended

### Firestore Caching Strategy:
Store fetched scripture in a `cached_scripture` collection:
```
{
  reference: "Genesis 1:1-2:3",
  translation: "ESV",
  text: "...",
  cachedAt: timestamp
}
```

This reduces API calls and improves performance!

---

## Need Help?

- ESV API Support: https://api.esv.org/docs
- API.Bible Docs: https://scripture.api.bible/docs
- Tune My Heart Support: Contact your development team

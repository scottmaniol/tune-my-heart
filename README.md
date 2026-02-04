# Tune My Heart - Daily Worship App

A digital companion for family and personal worship based on the curriculum by G3 Ministries and Dr. Scott Aniol.

## 🎯 Project Overview

This Progressive Web App (PWA) provides a comprehensive 52-week worship curriculum including:

- **5-Day Bible Reading Plans** (Narrative & Whole Bible)
- **52-Week Catechism** with multimedia resources
- **Weekly Hymns** with sheet music and audio
- **Scripture Memory Tools** with progressive hiding
- **Children's Bible Companion** with illustrations

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom theme matching cover art)
- **Backend**: Firebase (Auth, Firestore, Storage, Hosting)
- **Routing**: React Router v6
- **PWA**: Vite PWA Plugin + Workbox
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier works for development)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Firebase**
   
   a. Go to [Firebase Console](https://console.firebase.google.com)
   
   b. Create a new project (or use existing)
   
   c. Enable the following services:
      - Authentication (Email/Password + Google)
      - Cloud Firestore
      - Storage
      - Hosting (optional for deployment)
   
   d. Get your Firebase config from Project Settings
   
   e. Create `.env.local` file in the root directory:
      ```bash
      cp .env.example .env.local
      ```
   
   f. Fill in your Firebase credentials in `.env.local`

3. **Set Up Firestore Security Rules**
   
   ```javascript
   // firestore.rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read/write their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Anyone authenticated can read curriculum
       match /curriculum_weeks/{weekId} {
         allow read: if request.auth != null;
         allow write: if false; // Only admins via Firebase Console
       }
       
       // Users can manage their own journal entries
       match /journal_entries/{entryId} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
         allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
       }
     }
   }
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Optional: Get Bible API Keys

To enable multiple Bible translations:

- **ESV API**: Register at [api.esv.org](https://api.esv.org)
- **API.Bible**: Register at [scripture.api.bible](https://scripture.api.bible)

Add to your `.env.local`:
```
VITE_ESV_API_KEY=your_esv_api_key
VITE_BIBLE_API_KEY=your_bible_api_key
```

## 📁 Project Structure

```
tune-my-heart/
├── src/
│   ├── config/          # Firebase, theme configuration
│   ├── contexts/        # Auth, UserPreferences contexts
│   ├── layouts/         # Auth and Dashboard layouts
│   ├── pages/           # Main application pages
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Root component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles + Tailwind
├── public/              # Static assets (logo, icons)
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

## 🎨 Design Philosophy

- **Aesthetic**: Puritan experiential Calvinism - serious yet joyful
- **Color Palette**: Extracted from Tune My Heart cover art
  - Primary: Deep Blue (#2B5876)
  - Accent: Coral/Red (#D8886F)
  - Background: Cream (#F5F1E8)
- **Typography**: Merriweather (headings), Crimson Text (body)
- **NO Gamification**: No badges, streaks, or confetti

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔄 Current Status: MVP Foundation

### ✅ Completed
- [x] Project setup with React + TypeScript + Vite
- [x] Firebase configuration (Auth, Firestore, Storage)
- [x] Tailwind CSS with brand design tokens
- [x] Authentication flow (Email/Password + Google)
- [x] Dashboard layout with navigation
- [x] Routing structure for all main pages
- [x] User preferences context
- [x] Offline-first architecture setup

### 🚧 In Progress
- [ ] Reading Plan with Bible API integration
- [ ] Catechism component with media players
- [ ] Hymnal with PDF and audio playback
- [ ] Scripture Memory hiding tool
- [ ] Children's Bible component
- [ ] Journal entry system
- [ ] Weekend catch-up logic
- [ ] Service worker optimization

## 📚 Next Steps for Development

1. **Populate Firestore** with curriculum data (52 weeks)
2. **Implement Bible API** integration for multiple translations
3. **Build out individual page components** with full functionality
4. **Add media storage** structure in Firebase Storage
5. **Optimize offline caching** for PWA
6. **Test across devices** and browsers
7. **Deploy to Firebase Hosting**

## 🤝 Contributing

This is a private project for G3 Ministries curriculum. For questions or support, contact the development team.

## 📄 License

Proprietary - © G3 Ministries / Dr. Scott Aniol

---

**Built with reverence for God's Word and the heritage of faithful worship.**

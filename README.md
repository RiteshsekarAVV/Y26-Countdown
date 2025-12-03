# Yugam 2026 - Launch Countdown

A React TypeScript project featuring a countdown timer for Yugam 2026 event with Firebase authentication and admin dashboard.

## Features

- ⏰ Real-time countdown timer
- 🔐 Firebase Authentication
- 👨‍💼 Admin Dashboard to manage countdown target date
- 🎨 Beautiful UI matching the Yugam 2026 design
- 📱 Responsive design
- 🎯 Color scheme: #99031e, #ea4736, #f1a837
- 🔤 Poppins font family

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up Firebase:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase configuration from Project Settings

3. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

4. Add your Firebase configuration to `.env`:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

5. Set up Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

6. Create an admin user in Firebase Authentication (Email/Password)

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── CountdownTimer.tsx      # Countdown timer component
│   │   ├── CountdownPage.tsx       # Main countdown page
│   │   ├── Login.tsx               # Admin login page
│   │   ├── AdminDashboard.tsx     # Admin dashboard
│   │   └── PrivateRoute.tsx       # Protected route component
│   ├── context/
│   │   └── AuthContext.tsx         # Firebase authentication context
│   ├── config/
│   │   └── firebase.ts             # Firebase configuration
│   ├── App.tsx                     # Main app component with routing
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles
├── public/
│   ├── BG/                         # Background images
│   └── FG/                         # Foreground images
├── index.html                      # HTML entry point
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite configuration
```

## Technologies

- React 18
- TypeScript
- Vite
- Firebase (Authentication & Firestore)
- React Router
- CSS Modules
- Poppins Font

## Color Scheme

- Primary Red: `#99031e`
- Orange Red: `#ea4736`
- Golden Orange: `#f1a837`

## Routes

- `/` - Countdown page (public)
- `/login` - Admin login page
- `/admin` - Admin dashboard (protected)

## Admin Features

- View countdown preview
- Update target date and time
- Real-time countdown updates
- Secure authentication

## License

MIT


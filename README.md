# TryThis

**TryThis** is an interactive, motivational web app that helps you discover and complete new activities every day. Whether you're aiming to build better habits, break out of your routine, or simply have some fun, TryThis is your daily dose of inspiration and action.

---

## Live Demo

[https://trythis.vercel.app](https://trythis.vercel.app)](https://trythis-azure.vercel.app/)

---

## Features

- **Swipe to Discover:** Browse through a curated set of daily activities.
- **Daily Goals:** Add activities to your to-do list for today.
- **Track Progress:** Keep track of what you completed or missed.
- **Past Activity Log:** Reflect on your habits and growth over time.
- **Firebase Auth:** Sign in with Email/Password or **Facebook** for a personalized experience.

---

## Why TryThis?

Many people struggle to stay motivated and consistent with daily routines. TryThis offers a lighthearted, interactive way to:

- Break monotony
- Spark creativity
- Form meaningful habits
- Stay accountable

---

## 🛠️ Tech Stack

| Tech        | Description                  |
| ----------- | ---------------------------- |
| ⚛️ React  | Component-based UI             |
| 🎨 CSS      | Responsive and modern design |
| 🔥 Firebase | Authentication (Google)      |
| 🚀 Vercel   | Fast and easy deployment     |

---

## How to Run TryThis Locally

Follow these steps to set up and run the **TryThis** app on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trythis.git
cd trythis
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed.

```bash
npm install
```

### 3. Set up Firebase

1) Create a Firebase Project

* Go to Firebase Console and create a new project.

2) Enable Google Authentication

* Go to Authentication → Sign-in method
* Enable Google
* Add your app’s public-facing name and support email

3) Enable Firestore

* Go to Firestore Database
* Click Create Database and follow the setup steps

### 4. Create Environment File

In the root of the project, create a .env file and paste your Firebase config:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
cd trythis
```

You can find these values in Firebase Console → Project Settings → General → Web App Config.

### 5. Run the Development Server

```bash
npm run dev
```

Then open your browser and go to *[http://localhost:5173]()*

🎉 That’s it — you're ready to TryThis locally!

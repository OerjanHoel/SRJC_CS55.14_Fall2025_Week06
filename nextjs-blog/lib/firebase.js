// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Imported from firebase module
import { getFirestore } from "firebase/firestore"; // Imported from firebase module
// import { getAnalytics } from "firebase/analytics"; // No in use

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Secrets saved in other location to prevent push to git repo
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// Export the db so other files
export { db };

// Not using analytics commented out
// const analytics = getAnalytics(app);
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyDv211GZQSPMBVYo3hBTfUo9EN8z5id0Oc",
  authDomain: "promodoro-b5c7e.firebaseapp.com",
  projectId: "promodoro-b5c7e",
  storageBucket: "promodoro-b5c7e.firebasestorage.app",
  messagingSenderId: "20963982886",
  appId: "1:20963982886:web:378124f013a0632774f0e7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
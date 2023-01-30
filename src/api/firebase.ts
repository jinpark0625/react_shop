import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// type
type DispatchType = Dispatch<SetStateAction<User | null>>;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function login() {
  return await signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  await signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: DispatchType) {
  onAuthStateChanged(auth, (user: User | null) => {
    callback(user);
  });
}

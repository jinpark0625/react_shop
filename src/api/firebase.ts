/* eslint-disable @typescript-eslint/return-await */
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
import { getDatabase, ref, get } from 'firebase/database';

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
const database = getDatabase(app);

export async function login() {
  return await signInWithPopup(auth, provider).catch(console.error);
}

export async function logout() {
  await signOut(auth).catch(console.error);
}

export function onUserStateChange(callback: DispatchType) {
  onAuthStateChanged(auth, (user: User | null) => {
    void (async () => {
      const unpdatedUser = user ? await adminUser(user) : null;
      callback(unpdatedUser);
    })();
  });
}

async function adminUser(user: User) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user?.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

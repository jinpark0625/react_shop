import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { ProductType, SelectedProductType } from '../utils/interfaces';

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

export async function login(): Promise<undefined | UserCredential> {
  try {
    return await signInWithPopup(auth, provider);
  } catch (e) {
    console.log(e);
  }
}

export async function logout(): Promise<void> {
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
  return await get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user?.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product: ProductType, image: URL) {
  const id: string = uuid();
  return await set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(`${product.price}`),
    image,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  return await get(ref(database, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

export async function getCart(userId: string) {
  return await get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(
  userId: string,
  product: SelectedProductType,
) {
  return await set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId: string, productId: number) {
  return await remove(ref(database, `carts/${userId}/${productId}`));
}

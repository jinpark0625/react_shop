import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  Auth,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { ProductType, SelectedProductType } from '../utils/interfaces';
import {
  getStorage,
  ref as uploadRef,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
};

// type
type DispatchType = Dispatch<SetStateAction<User | null>>;

type ImageType = FileList | null | undefined;
type ImageBlob = Blob | Uint8Array | ArrayBuffer;
interface SignUpType {
  email: string;
  password: string;
  name: string;
  image?: ImageType;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const storage = getStorage(app);

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/** User State */
export async function loginEmail(
  email: string,
  password: string,
): Promise<undefined | UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

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
    if (user) {
      adminUser(user)
        .then((res) => callback(res))
        .catch(console.log);
    } else callback(null);
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

/** Products State */
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

/**
 * @param auth : Auth
 * @param email : string type, user email
 * @param password : string type, user password
 * @param name : string type, user name
 * @param image : FileList type, user image (not required)
 * @returns
 */

async function createUser(auth: Auth, email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

async function uploadData(storageRef: StorageReference, image: ImageBlob) {
  return await uploadBytes(storageRef, image);
}

async function uploadImage(image: ImageType): Promise<string> {
  if (image) {
    const storageRef = uploadRef(storage, `users/${image[0].name}`);
    const upload = await uploadData(storageRef, image[0]);
    return await getDownloadURL(upload.ref);
  }
  return 'default';
}

async function updateUserProfile(user: User, name: string, image: string) {
  await updateProfile(user, {
    displayName: name,
    photoURL: image,
  });
}

export async function signUp({ email, name, password, image }: SignUpType) {
  try {
    const userCredential = await createUser(auth, email, password);
    const photoUrl = await uploadImage(image);
    return await updateUserProfile(userCredential.user, name, photoUrl);
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

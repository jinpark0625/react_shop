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
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword as editPassword,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import {
  collection,
  getFirestore,
  getDocs,
  query as storeQuery,
  where,
  QueryConstraint,
  orderBy,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import {
  ProductType,
  SelectedProductType,
  ImageBlob,
  ProductQueryType,
  ProfileOption,
  SignUpType,
  CheckoutFormTypes,
} from '../utils/interfaces';
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
type SetLoadingType = Dispatch<SetStateAction<boolean>>;
type ValueTypes = SelectedProductType | CheckoutFormTypes;
type ImageType = FileList | null | undefined;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const storage = getStorage(app);
const storeDB = getFirestore(app);

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

export function onUserStateChange(
  callback: DispatchType,
  setLoading: SetLoadingType,
) {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      adminUser(user)
        .then((res) => {
          callback(res);
          setLoading(false);
        })
        .catch(console.log);
    } else {
      callback(null);
      setLoading(false);
    }
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

export async function reauthenticate(
  email: string,
  currentPassword: string,
  newPassword: string,
) {
  const user = auth.currentUser;
  if (user) {
    const cred = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, cred)
      .then(async () => {
        return await updatePassword(newPassword);
      })
      .catch((e) => {
        throw new Error(getErrorMessage(e));
      });
  }
}

// export async function changePassword() {}

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

export async function getProducts({
  key,
  value,
  color,
  sizes,
  sort,
  item,
}: ProductQueryType) {
  const filters: QueryConstraint[] = [];

  color && filters.push(where('color', '==', color));
  sizes && filters.push(where('sizes', 'array-contains', sizes));
  item && filters.push(where('tags', '==', item));

  if (!key && !sort) {
    filters.push(orderBy('category'));
  } else if (key === 'category' && !sort) {
    filters.push(where(key, '==', value));
  } else {
    key && filters.push(where(key, '==', value));
    !sort && filters.push(orderBy('category'));
  }
  if (sort === 'priceAsc') {
    filters.push(orderBy('price'));
  } else if (sort === 'priceDesc') {
    filters.push(orderBy('price', 'desc'));
  } else {
    sort && filters.push(orderBy(sort, 'desc'));
  }

  const query = storeQuery(collection(storeDB, 'products'), ...filters);
  return await getDocs(query).then((snapshot) => {
    const results: ProductType[] = [];
    snapshot.forEach((doc) => {
      results.push(doc.data() as ProductType);
    });
    return results;
  });
}

export async function getCartOrOrderItem(
  containerType: string,
  userId: string,
) {
  return await get(ref(database, `${containerType}/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateCartOrOrderItem(
  containerType: string,
  userId: string,
  productId: number | string,
  product: ValueTypes,
) {
  return await set(
    ref(database, `${containerType}/${userId}/${productId}`),
    product,
  );
}

export async function removeFromCart(userId: string, productId: number) {
  return await remove(ref(database, `carts/${userId}/${productId}`));
}

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

export async function editUser(name: string, image: ImageType) {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const profileOption: ProfileOption = {
      ...(image && { photoURL: await uploadImage(image) }),
      displayName: name,
    };

    await updateProfile(currentUser, profileOption)
      .then((res) => res)
      .catch((e) => {
        throw new Error(getErrorMessage(e));
      });
  }
}

async function updatePassword(password: string) {
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      editPassword(user, password)
        .then((res) => res)
        .catch((e) => {
          throw new Error(getErrorMessage(e));
        });
    }
  });
}

async function updateUserProfile(user: User, option: ProfileOption) {
  await updateProfile(user, option);
}

export async function signUp({ email, name, password, image }: SignUpType) {
  try {
    const userCredential = await createUser(auth, email, password);

    const profileOption: ProfileOption = {
      ...(image && { photoURL: await uploadImage(image) }),
      displayName: name,
    };

    return await updateUserProfile(userCredential.user, profileOption);
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

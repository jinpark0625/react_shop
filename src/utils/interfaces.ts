// Product
export interface ProductType {
  title: string;
  price: number;
  category: string;
  subCategory: string;
  tags: string;
  registrationDate?: number;
  color: string;
  description: string;
  options: string;
  sizes: string[];
  id: number;
  image: string[];
  details?: string;
  highlights?: string[];
}
export interface SelectedProductType {
  id: number;
  image: string;
  title: string;
  price: number;
  option?: string;
  size: string;
  quantity: number;
}
export interface FilterProps {
  setSortParams: (key: string, value: string) => void;
  deleteSortParams: (key: string) => void;
  params: string | null;
  searchParams: URLSearchParams;
}

// NFT
export interface NftType {
  id: number;
  background: string;
  body: string;
  eyes: string;
  hat: string;
  nose: string;
  title: string;
  image: string;
  token_id: string;
}

export interface InfiniteReturnType {
  data: NftType[];
  nextPage: number;
}

// Filters
export interface FilterPropsType {
  isLoading?: boolean;
  allCategories: string[];
  filters: filterType[];
  colors: string[];
  sizes: string[];
  setSortParams: (key: string, value: string) => void;
  deleteSortParams: (key: string) => void;
  searchParams: URLSearchParams;
  pageData?: string;
}

interface filterType {
  name: string;
}

// Account
type imageType = FileList | null;
export interface AccountInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  image: imageType;
}

// Checkout
export type Focused = 'name' | 'number' | 'expiry' | 'cvc';
export interface CardTypes {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export interface UserFormTypes {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  paymentMethod: string;
}

// Histroy
export interface OrderTypes {
  address: string;
  apartment: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  orderDate: string;
  orderNumber: string;
  paymentMethod: string;
  postalCode: string;
  state: string;
  product: SelectedProductType[];
}

// Firebase

export type ImageType = FileList | null | undefined;
export type ImageBlob = Blob | Uint8Array | ArrayBuffer;
export interface SignUpType {
  email: string;
  password: string;
  name: string;
  image?: ImageType;
}
export interface ProductQueryType {
  key?: string;
  value?: string;
  color?: string;
  sizes?: string;
  sort?: string;
  item?: string;
}
export interface ProfileOption {
  displayName?: string;
  photoURL?: string;
}

export interface CheckoutFormTypes {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  paymentMethod: string;
  product: [
    {
      id: number;
      image: string;
      title: string;
      price: number;
      option?: string;
      size: string;
      quantity: number;
    },
  ];
}

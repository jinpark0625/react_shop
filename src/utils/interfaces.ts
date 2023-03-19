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

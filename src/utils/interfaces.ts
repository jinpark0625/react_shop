export interface ProductType {
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
  id?: number;
  image?: string;
}

export interface SelectedProductType {
  id: number;
  image: string;
  title: string;
  price: number;
  option: string;
  quantity: number;
}

type imageType = FileList | null;
export interface AccountInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  image: imageType;
}

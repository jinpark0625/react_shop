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

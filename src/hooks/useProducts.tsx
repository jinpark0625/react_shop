import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { getProducts as fetchProdcuts, addNewProduct } from 'api/firebase';
import { ProductType } from '../utils/interfaces';

interface NewProductType {
  product: ProductType;
  url: URL;
}

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery: UseQueryResult<ProductType[], Error> = useQuery(
    ['products'],
    async () => await fetchProdcuts('products'),
    {
      staleTime: 1000 * 60,
    },
  );

  const addProduct = useMutation(
    async ({ product, url }: NewProductType) =>
      await addNewProduct(product, url),
    {
      onSuccess: async () => await queryClient.invalidateQueries(['products']),
    },
  );

  return { productsQuery, addProduct };
}

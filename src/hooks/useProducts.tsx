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

  // 기존의 getProducts 부분
  const productsQuery: UseQueryResult<ProductType[], Error> = useQuery(
    ['products'],
    fetchProdcuts,
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

  // 필요한 hook 만 return
  return { productsQuery, addProduct };
}

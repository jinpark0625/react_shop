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

interface QueryProps {
  color?: string;
  sizes?: string;
  sort?: string;
  item?: string;
}

interface FilterProps {
  key?: string;
  value?: string;
}

export default function useProducts(
  query: Partial<QueryProps> = {},
  filter: Partial<FilterProps> = {},
) {
  const queryClient = useQueryClient();

  const { color, sizes, sort, item } = query;
  const { key, value } = filter;

  const productsQuery: UseQueryResult<ProductType[], Error> = useQuery(
    ['products', query, filter],
    async () =>
      await fetchProdcuts({
        key,
        value,
        color,
        sizes,
        sort,
        item,
      }),
    {
      staleTime: 1000 * 60,
      keepPreviousData: true,
    },
  );

  const productFilterQuery: UseQueryResult<ProductType[], Error> = useQuery(
    ['products', filter],
    async () =>
      await fetchProdcuts({
        key,
        value,
      }),
    {
      staleTime: 1000 * 60,
      keepPreviousData: true,
    },
  );

  const addProduct = useMutation(
    async ({ product, url }: NewProductType) =>
      await addNewProduct(product, url),
    {
      onSuccess: async () => await queryClient.invalidateQueries(['products']),
    },
  );

  return {
    productsQuery,
    addProduct,
    productFilterQuery,
  };
}

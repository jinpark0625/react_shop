import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  addOrUpdateCartOrOrderItem,
  getCartOrOrderItem,
  removeFromCart,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { SelectedProductType } from 'utils/interfaces';

export default function useCart() {
  const { ...contextData } = useAuthContext();
  const { uid } = contextData;

  const queryClient = useQueryClient();

  const cartQuery: UseQueryResult<SelectedProductType[], Error> = useQuery(
    ['carts', uid || ''],
    async () => await getCartOrOrderItem('carts', uid),
    {
      enabled: !!uid,
    },
  );

  const addOrUpdateItem = useMutation(
    async (product: SelectedProductType) =>
      await addOrUpdateCartOrOrderItem('carts', uid, product.id, product),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(['carts', uid])
          .then((res) => {
            return res;
          })
          .catch(console.log);
      },
    },
  );

  const removeItem = useMutation(
    async (id: number) => await removeFromCart(uid, id),
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries(['carts', uid])
          .then((res) => {
            return res;
          })
          .catch(console.log);
      },
    },
  );

  return { cartQuery, addOrUpdateItem, removeItem };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateCartOrOrderItem, removeFromCart } from '../api/firebase';
import { v4 as uuid } from 'uuid';
import { CheckoutFormTypes } from 'utils/interfaces';

export default function useCheckout() {
  const { ...contextData } = useAuthContext();
  const { uid } = contextData;

  const queryClient = useQueryClient();

  const addItemToOrder = useMutation(
    async (item: CheckoutFormTypes) => {
      await addOrUpdateCartOrOrderItem('orders', uid, uuid(), item);
      item.product.map(async ({ id }) => {
        await removeFromCart(uid, id);
      });
    },
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

  return { addItemToOrder };
}

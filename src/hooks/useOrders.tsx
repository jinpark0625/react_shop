import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuthContext } from 'context/AuthContext';
import { getCartOrOrderItem } from 'api/firebase';
import { OrderTypes } from 'utils/interfaces';

export default function useHistory() {
  const { ...contextData } = useAuthContext();
  const { uid } = contextData;

  const orderQuery: UseQueryResult<OrderTypes[], Error> = useQuery(
    ['order'],
    async () => await getCartOrOrderItem('orders', uid),
    {
      enabled: !!uid,
    },
  );

  return { orderQuery };
}

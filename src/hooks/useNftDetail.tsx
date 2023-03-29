import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { NftType } from 'utils/interfaces';
import { fetchSelectedNFT } from 'api/supabase';
import { opensea } from 'api/opensea';

interface ReturnDataType {
  data: NftType[];
  permalink: string;
  eth_price: number;
  usd_price: number;
}

export default function useNftDetail(id: string) {
  const selectedNftQuery: UseQueryResult<ReturnDataType, Error> = useQuery(
    ['nft', id],
    async () => {
      const data = await fetchSelectedNFT(id);
      const {
        data: {
          permalink,
          collection: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            payment_tokens: [{ eth_price, usd_price }],
          },
        },
      } = await opensea(data?.[0].token_id ?? '');
      return { data, permalink, eth_price, usd_price };
    },
    {
      staleTime: 1000 * 60,
    },
  );

  return selectedNftQuery;
}

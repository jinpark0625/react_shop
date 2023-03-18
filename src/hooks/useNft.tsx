import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { InfiniteReturnType, NftType } from '../utils/interfaces';
import { ParsedQuery } from 'query-string';
import { fetchNFTAll, fetchNFT } from 'api/supabase';

export default function useNft(query: ParsedQuery<string>) {
  const nftsAllData: UseQueryResult<NftType[], Error> = useQuery(
    ['nftsAll'],
    async () => await fetchNFTAll(),
    {
      staleTime: 1000 * 60,
    },
  );

  const nftsQuery: UseInfiniteQueryResult<InfiniteReturnType, Error> =
    useInfiniteQuery(
      ['nfts', query],
      async ({ pageParam = 0 }) => {
        const {
          props: { data, page },
        } = await fetchNFT({
          query,
          pageParam,
        });

        if (data && data.length < 10) return { data, nextPage: undefined };

        return {
          data,
          nextPage: Number(page) + 1,
        };
      },
      {
        getNextPageParam: (pageParam) => {
          return pageParam.nextPage ?? undefined;
        },
        staleTime: 1000 * 60,
      },
    );

  return { nftsAllData, nftsQuery };
}

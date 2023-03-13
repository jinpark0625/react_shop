import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getNFTs, getProducts as fetchProdcuts } from 'api/firebase';
import { NftType, ProductType } from '../utils/interfaces';

export default function useSlide() {
  const nftsQuerySlide: UseQueryResult<
    { results: NftType[]; pageParam: number },
    Error
  > = useQuery(
    ['nftSlide'],
    async () => {
      const { results } = await getNFTs({ key: 'nft' });
      return {
        results,
      };
    },
    {
      staleTime: 1000 * 60,
    },
  );
  const productSlideQuery: UseQueryResult<ProductType[], Error> = useQuery(
    ['productSlide'],
    async () => await fetchProdcuts({}),
    {
      staleTime: 1000 * 60,
      keepPreviousData: true,
    },
  );

  return { nftsQuerySlide, productSlideQuery };
}

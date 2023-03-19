import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getProducts as fetchProdcuts } from 'api/firebase';
import { NftType, ProductType } from '../utils/interfaces';
import { fetchNFTSlide } from 'api/supabase';

export default function useSlide() {
  const nftsQuerySlide: UseQueryResult<NftType[], Error> = useQuery(
    ['nftSlide'],
    async () => await fetchNFTSlide(),
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

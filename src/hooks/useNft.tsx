import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getNFTs } from 'api/firebase';
import { NftType } from '../utils/interfaces';

export default function useNft() {
  const nftsQuery: UseQueryResult<NftType[], Error> = useQuery(
    ['nfts'],
    async () => await getNFTs('NFT'),
    {
      staleTime: 1000 * 60,
    },
  );

  return { nftsQuery };
}

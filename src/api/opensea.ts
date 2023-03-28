/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';

// Waiting for Opensea API Key
// const baseURl = process.env.REACT_APP_NFT_API_URL!;
const contract = process.env.REACT_APP_CONTRACT_ID!;

const baseURl = process.env.REACT_APP_COINGECKO!;
const CHAIN = 'ethereum';
const CURRENCY = 'usd';

const instance = axios.create({
  baseURL: baseURl,
  timeout: 1000,
});

export async function opensea(tokenId: string) {
  const data = await instance.get(`${contract}/${tokenId}`);

  return data;
}

export async function getCurrentEthereum() {
  const data = await instance.get(
    `price?ids=${CHAIN}&vs_currencies=${CURRENCY}`,
  );

  return data;
}

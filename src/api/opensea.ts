/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';

const baseURl = process.env.REACT_APP_NFT_API_URL!;
const contract = process.env.REACT_APP_CONTRACT_ID!;

const instance = axios.create({
  baseURL: baseURl,
  timeout: 1000,
});

export default async function opensea(tokenId: string) {
  const data = await instance.get(`${contract}/${tokenId}`);

  return data;
}

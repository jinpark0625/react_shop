/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createClient } from '@supabase/supabase-js';
import { Database } from 'utils/schema';
import { ParsedQuery } from 'query-string';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

interface NFTQueryType {
  query: ParsedQuery<string>;
  pageParam: number;
}

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export async function fetchNFTAll() {
  const { data } = await supabase.from('nft').select('*');
  return data;
}

export async function fetchNFT({ query, pageParam }: NFTQueryType) {
  const { from, to } = getPagination(pageParam, 10);

  let supabaseQuery = supabase
    .from('nft')
    .select('*')
    .range(from, to)
    .order('id');

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        const inClause = `("${value.join('","')}")`;

        supabaseQuery = supabaseQuery.filter(key, 'in', inClause);
      } else {
        supabaseQuery = supabaseQuery.filter(key, 'eq', value);
      }
    }
  }

  const { data } = await supabaseQuery;

  return {
    props: {
      data,
      page: pageParam,
    },
  };
}

export async function fetchSelectedNFT(id: string) {
  const { data } = await supabase.from('nft').select('*').eq('id', id);

  return data;
}

export async function fetchNFTSlide() {
  const { data } = await supabase
    .from('nft')
    .select('*')
    .range(0, 9)
    .order('id');

  return data;
}

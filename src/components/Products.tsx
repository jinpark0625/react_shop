import { getProducts } from 'api/firebase';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { ProductType } from 'utils/interfaces';

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  }: UseQueryResult<ProductType[], Error> = useQuery(['products'], getProducts);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.toString()}</p>}
      <ul className="grid grid-cols-1  gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}

import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <div className="m-auto max-w-screen-2xl p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.toString()}</p>}
      <h2 className="pb-8 pt-12 text-4xl font-bold">
        Find your favourite item
      </h2>
      <ul className=" grid  grid-cols-1 gap-6  md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })}
      </ul>
    </div>
  );
}

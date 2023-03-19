import useCart from '../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className="relative">
      {products ? (
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {products.length}
        </span>
      ) : (
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      )}
    </div>
  );
}

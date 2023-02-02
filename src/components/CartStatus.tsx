import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCart from '../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="absolute -top-1 -right-2 h-6 w-6 rounded-full bg-brand text-center font-bold text-white">
          {products.length}
        </p>
      )}
    </div>
  );
}

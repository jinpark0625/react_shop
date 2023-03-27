import CartItem from '../../components/CartItem';
import Button from '../../components/ui/Button';
import useCart from '../../hooks/useCart';
import ProductTitle from 'components/ui/ProductTitle';
import { useAuthContext } from 'context/AuthContext';
import NotFound from 'pages/NotFound';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from 'components/ui/ErrorMessage';
import OrderSummary from 'components/Order/OrderSummary';
import OrderLoading from 'components/Order/OrderLoading';

const MyCart = () => {
  const { ...contextData } = useAuthContext();
  const { user } = contextData;

  const navigate = useNavigate();

  const {
    cartQuery: { isLoading, error, data: products },
  } = useCart();

  const hasProducts = products && products.length > 0;

  if (!user) return <NotFound />;

  if (isLoading) return <OrderLoading />;

  if (error)
    return (
      <div className="mx-auto max-w-7xl px-4 pt-24 text-center text-red-500 sm:px-6 lg:px-8">
        <ErrorMessage />
      </div>
    );

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <ProductTitle title="My Cart" />
      {!hasProducts && (
        <p className="mt-32 text-center text-lg">No products in the cart.</p>
      )}
      {hasProducts && (
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <ul className="col-span-4 mb-8 py-4 pr-0 lg:pr-10">
            {products?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="col-span-2 mt-4 mb-8 flex flex-col pl-0 lg:pl-10">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Order summary
            </h3>
            <OrderSummary data={products} cart={true} />
            <Button
              onClick={() => navigate('/checkout')}
              text="Checkout"
              className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-600"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default MyCart;

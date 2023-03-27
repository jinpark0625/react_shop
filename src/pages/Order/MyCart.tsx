import CartItem from '../../components/CartItem';
import Button from '../../components/ui/Button';
import useCart from '../../hooks/useCart';
import ProductTitle from 'components/ui/ProductTitle';
import LoadingSkeleton from 'components/ui/LoadingSkeleton';
import { useAuthContext } from 'context/AuthContext';
import NotFound from 'pages/NotFound';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from 'components/ui/ErrorMessage';
import OrderSummary from 'components/Order/OrderSummary';

const MyCart = () => {
  const { ...contextData } = useAuthContext();
  const { user } = contextData;

  const navigate = useNavigate();

  const {
    cartQuery: { isLoading, error, data: products },
  } = useCart();

  const hasProducts = products && products.length > 0;

  if (!user) return <NotFound />;

  if (isLoading)
    return (
      <div className="mx-auto mb-32 w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4 mb-8 pr-0 lg:pr-10">
            <LoadingSkeleton className=" animate-pulse rounded-md bg-slate-50  pt-[30%]" />
            <LoadingSkeleton className="mt-10 animate-pulse rounded-md bg-slate-50  pt-[30%]" />
          </div>
          <div className="relative col-span-2 w-full animate-pulse overflow-hidden rounded-2xl bg-slate-50  pt-[100%]">
            <LoadingSkeleton className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 " />
          </div>
        </div>
      </div>
    );
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

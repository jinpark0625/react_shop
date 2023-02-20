import CartItem from '../../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../../components/PriceCard';
import Button from '../../components/ui/Button';
import { SelectedProductType } from '../../utils/interfaces';
import useCart from '../../hooks/useCart';

const SHIPPING = 3000;

const MyCart = () => {
  const {
    cartQuery: { isLoading, error, data: products },
  } = useCart();

  if (isLoading) return <p>Loading..</p>;
  if (error) return <p>{error.toString()}</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice = products?.reduce(
    (prev: number, current: SelectedProductType) =>
      prev + current.price * current.quantity,
    0,
  );

  return (
    <section className="m-auto flex max-w-screen-2xl flex-col p-8">
      <p className="border-b border-gray-300 pb-8 text-center text-2xl font-bold">
        My Cart
      </p>
      {!hasProducts && (
        <p className="mt-12 text-center text-lg">No products in the cart.</p>
      )}
      {hasProducts && (
        <>
          <ul className="mb-8 border-b border-gray-300 p-4 px-8">
            {products?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <div className="mb-8 flex items-center justify-between px-2 md:px-8 lg:px-16">
            <PriceCard text="Product" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="Shipping fee" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard
              text="Total"
              price={totalPrice ? totalPrice + SHIPPING : SHIPPING}
            />
          </div>
          <Button text="Order" />
        </>
      )}
    </section>
  );
};

export default MyCart;

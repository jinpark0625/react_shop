import { LazyLoadImage } from 'react-lazy-load-image-component';
import PriceCard from 'components/PriceCard';
import { SelectedProductType } from 'utils/interfaces';
import { calculateTax, calculateTotal } from 'utils/utils';
import { SHIPPING } from 'data/Products';

interface OrderPropsType {
  data: SelectedProductType[] | undefined;
  cart: boolean;
}

const OrderSummary = ({ data, cart }: OrderPropsType) => {
  const taxPrice = calculateTax(data);
  const totalPrice = calculateTotal(data);

  return (
    <div>
      {cart ? (
        // Cart Summary
        <>
          <PriceCard text="Subtotal" price={totalPrice} />
          <PriceCard text="Shipping estimate" price={SHIPPING} />
          <PriceCard
            text="Tax estimate"
            price={taxPrice ? taxPrice?.toFixed(2) : 0}
          />
          <PriceCard
            total
            text="Order total"
            price={
              totalPrice ? totalPrice + SHIPPING + (taxPrice ?? 0) : SHIPPING
            }
          />
        </>
      ) : (
        // Checkout Summary
        <>
          {data?.map(({ image, title, price, size, quantity }) => (
            <div key={title} className="flex border-b border-gray-200 py-4">
              <div className="mr-4 h-20 w-20 shrink-0 rounded-lg bg-gray-100 sm:h-[136px] sm:w-[136px] md:h-40 md:w-40">
                <LazyLoadImage
                  src={image && Array.isArray(image) ? image[0] : image}
                  alt={title}
                  effect="blur"
                  className="h-full w-auto transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                />
              </div>
              <div className="w-full">
                <p className="text-lg">{title}</p>
                <p className="mt-1 text-sm text-gray-500">Size: {size}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {quantity}
                </p>
                <p className="mt-2 font-semibold">${price}</p>
              </div>
            </div>
          ))}
          <div>
            <PriceCard text="Subtotal" price={totalPrice} />
            <PriceCard text="Shipping" price={SHIPPING} />
            <PriceCard
              text="Taxes"
              price={taxPrice ? taxPrice?.toFixed(2) : 0}
            />
            <PriceCard
              total
              text="Total"
              price={
                totalPrice ? totalPrice + SHIPPING + (taxPrice ?? 0) : SHIPPING
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;

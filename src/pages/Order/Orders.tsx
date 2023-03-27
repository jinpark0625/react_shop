import useOrders from 'hooks/useOrders';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProductTitle from 'components/ui/ProductTitle';
import { OrderTypes } from 'utils/interfaces';
import { FaCcPaypal } from 'react-icons/fa';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import moment from 'moment';
import OrderLoading from 'components/Order/OrderLoading';
import ErrorMessage from 'components/ui/ErrorMessage';

const Orders = () => {
  const {
    orderQuery: { isLoading, error, data },
  } = useOrders();

  if (isLoading) return <OrderLoading />;

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between  pb-6">
        <ProductTitle title="Orders" />
      </div>
      {error && <ErrorMessage />}
      {data?.length === 0 ? (
        <p className="mt-32 text-center text-lg">There are no orders yet.</p>
      ) : (
        data?.map(
          ({
            product,
            address,
            apartment,
            city,
            email,
            firstName,
            lastName,
            orderNumber,
            orderDate,
            postalCode,
            paymentMethod,
            state,
          }: OrderTypes) => {
            return (
              <div
                key={orderNumber}
                className="grid grid-cols-1 lg:grid-cols-6"
              >
                <div className="col-span-4 pr-0 lg:pr-10">
                  <div className="flex justify-between border-t border-gray-200 py-4">
                    <h3 className="font-semibold leading-6">Order confirmed</h3>
                    <p className="text-right text-gray-500">
                      Delivered
                      <span className="block">
                        {moment(orderDate, 'DD-MM-YYYY HH:mm:ss').format('ll')}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 py-4">
                    <h3 className="font-semibold leading-6">Order #</h3>
                    <p className="max-w-[200px] truncate text-right text-gray-500 hover:max-w-full hover:text-clip">
                      {orderNumber}
                    </p>
                  </div>
                  {product.map(
                    ({ image, title, price, size, quantity }: any) => (
                      <div
                        key={title}
                        className="flex border-t border-gray-200 py-4"
                      >
                        <div className="mr-4 h-20 w-20 shrink-0 rounded-lg bg-gray-100 sm:h-[136px] sm:w-[136px] md:h-40 md:w-40">
                          <LazyLoadImage
                            src={
                              image && Array.isArray(image) ? image[0] : image
                            }
                            alt={title}
                            effect="blur"
                            className="h-full w-auto transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                          />
                        </div>
                        <div className="w-full">
                          <p className="text-lg">{title}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            Size: {size}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {quantity}
                          </p>
                          <p className="mt-2 font-semibold">${price}</p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="col-span-2 ml-0 border-t border-gray-200 py-4 lg:ml-10">
                  <div className="flex justify-between ">
                    <h3 className="font-semibold leading-6">Address</h3>
                    <p className="text-right text-gray-500">
                      <div>{`${String(firstName)} ${String(lastName)}`}</div>
                      <div>{`${String(address)} ${String(apartment)}`}</div>
                      <div>{`${String(city)} ${String(state)} ${String(
                        postalCode,
                      )}`}</div>
                    </p>
                  </div>
                  <div className="mt-12 flex justify-between border-t border-gray-200 pt-4 text-2xl font-semibold ">
                    <h3 className="text-base font-semibold leading-6">
                      Payment
                    </h3>
                    {paymentMethod === 'credit' ? (
                      <div className="flex">
                        <p className="mr-2 text-base font-normal text-gray-500">
                          {paymentMethod}
                        </p>
                        <BsFillCreditCard2FrontFill className="text-violet-500" />
                      </div>
                    ) : (
                      <div className="flex">
                        <p className="mr-2 text-base font-normal text-gray-500">
                          {paymentMethod}
                        </p>
                        <FaCcPaypal className="text-blue-800" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          },
        )
      )}
    </main>
  );
};

export default Orders;

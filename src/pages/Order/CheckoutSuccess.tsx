import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import OrderSummary from 'components/Order/OrderSummary';
import { FaCcPaypal } from 'react-icons/fa';
import moment from 'moment';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import Button from 'components/ui/Button';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location?.state) return <Navigate to="/" replace />;

  const { state } = location;

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl  px-4 pt-24 sm:px-6  lg:px-8">
      <section>
        <h3 className="mb-2 text-xl font-semibold leading-6 ">
          Your Order Confirmed!
        </h3>
        <p className="mt-10 mb-1  font-semibold">
          Hello {state.orderData.firstName},
        </p>
        <p>
          Your order has been confirmed and will be shipping within 4-10
          business days
        </p>
      </section>
      <section className="mt-8 grid grid-cols-1 gap-5 break-words border-y border-y-gray-200 py-5 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-0	">
        <div>
          <p className="text-gray-500">Order Date</p>
          <p className="mt-2 font-semibold">
            {moment(state.orderData.orderDate, 'DD-MM-YYYY HH:mm:ss').format(
              'll',
            )}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Order No</p>
          <p className="mt-2 font-semibold">124124</p>
        </div>
        <div>
          <p className="text-gray-500">Payment</p>
          <p className="mt-2 text-2xl font-semibold">
            {state.orderData.paymentMethod === 'credit' ? (
              <BsFillCreditCard2FrontFill className="text-violet-500" />
            ) : (
              <FaCcPaypal className="text-blue-800" />
            )}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Shipping Address</p>
          <p className="mt-2 font-semibold">{state.orderData.address}</p>
        </div>
      </section>
      <section>
        <OrderSummary data={state.orderData.product} cart={false} />
      </section>
      <section className="mt-10">
        <h3 className="mb-2 text-xl font-semibold leading-6 ">
          Thank you for shopping with us!
        </h3>
        <p className="font-semibold text-violet-500">Happy Jolly</p>
      </section>
      <Button
        onClick={() => navigate('/collections')}
        text="Continue Shopping"
        className="mt-16 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-600"
      />
    </main>
  );
};

export default CheckoutSuccess;

import { useAuthContext } from 'context/AuthContext';
import { useWatch } from 'react-hook-form';
import { useState } from 'react';
import ProductTitle from 'components/ui/ProductTitle';
import 'react-credit-cards/es/styles-compiled.css';
import useGetCardForm from 'hooks/useGetCardForm';
import useCart from 'hooks/useCart';
import { CardTypes, Focused } from 'utils/interfaces';
import Button from 'components/ui/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorMessage from 'components/ui/ErrorMessage';
import CheckoutLoading from 'components/Product/CheckoutLoading';
import OrderSummary from 'components/Order/OrderSummary';
import ContactForm from 'components/Order/ContactForm';
import CreditForm from 'components/Order/CreditForm';
import useContactForm from 'hooks/useContactForm';
import useCheckout from 'hooks/useCheckout';
import Paypal from 'components/Order/Paypal';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const Checkout = () => {
  const { ...contextData } = useAuthContext();
  const { user } = contextData;

  const navigate = useNavigate();

  const {
    cartQuery: { isLoading, error, data: cartData },
  } = useCart();

  const { addItemToOrder } = useCheckout();

  const { register, control, handleSubmit, isSubmitting, errors } =
    useContactForm({
      defaultValues: {
        email: user?.email ?? '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        postalCode: '',
        city: '',
        state: '',
        country: 'Canada',
        paymentMethod: '',
      },
    });

  const { cardRegister, cardControl, cardSubmit, setValue, cardFormState } =
    useContactForm({
      cardDefaultValues: {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
      },
    });

  const paymentMethod = useWatch({
    control,
    name: 'paymentMethod',
  });

  const [focused, setFocused] = useState<Focused | undefined>(undefined);
  const [paypalOrderId, setPaypalOrderId] = useState('');
  const [paypalError, setPaypalError] = useState(false);

  const { number, name, expiry, cvc } = useGetCardForm({
    control: cardControl,
  });

  const onSubmitCardData = (data: CardTypes) => data;
  const onError = (errors: any) => {
    throw new Error(errors);
  };

  const onSubmit = (data: any) => {
    if (cartData) {
      if (paymentMethod === 'paypal' && data) {
        if (paypalOrderId) {
          const orderData = {
            ...data,
            orderNumber: uuid(),
            orderDate: moment().format('DD-MM-YYYY hh:mm:ss'),
            product: cartData,
          };
          setPaypalError(false);
          addItemToOrder.mutate(orderData, {
            onSuccess: () => {
              navigate(`/checkout/success/${user?.uid ?? ''}`, {
                replace: true,
                state: {
                  orderData,
                },
              });
            },
          });
        } else {
          setPaypalError(true);
        }
      } else if (data) {
        cardSubmit(onSubmitCardData, onError)()
          .then((res) => {
            const orderData = {
              ...data,
              orderNumber: uuid(),
              orderDate: moment().format('DD-MM-YYYY hh:mm:ss'),
              product: cartData,
            };
            addItemToOrder.mutate(orderData, {
              onSuccess: () => {
                navigate(`/checkout/success/${user?.uid ?? ''}`, {
                  replace: true,
                  state: {
                    orderData,
                  },
                });
              },
            });
          })
          .catch((err) => err);
      }
    }
  };

  //   Error Handling
  if (error)
    return (
      <div className="mx-auto max-w-7xl px-4 pt-24 text-center text-red-500 sm:px-6 lg:px-8">
        <ErrorMessage />
      </div>
    );

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl  px-4 pt-24 sm:px-6  lg:px-8">
      <ProductTitle title="Checkout" />

      {/* Loading */}
      {isLoading && <CheckoutLoading />}

      {cartData?.length === 0 && <Navigate to="/" replace />}

      {/* Information */}
      <section className="mt-4 flex flex-wrap gap-20 lg:flex-nowrap">
        <article className="w-full border-t border-gray-200 pt-4 lg:w-1/2">
          {/* Contact Information */}
          <ContactForm register={register} errors={errors} />
          {/* Shipping information */}
          <CreditForm
            paymentMethod={paymentMethod}
            number={number.value}
            name={name.value}
            expiry={expiry.value}
            cvc={cvc.value}
            focused={focused}
            setValue={setValue}
            setFocused={setFocused}
            cardRegister={cardRegister}
            cardFormState={cardFormState}
          />
          {paymentMethod === 'paypal' && (
            <Paypal
              setPaypalOrderId={setPaypalOrderId}
              cartData={cartData}
              paypalError={paypalError}
              setPaypalError={setPaypalError}
            />
          )}
        </article>
        {/* Product */}
        <article className="w-full lg:w-1/2">
          <div>
            <h3 className="mb-2 text-xl font-semibold leading-6 ">
              Order Summary
            </h3>
          </div>
          {/* Order Information */}
          <OrderSummary data={cartData} cart={false} />
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            text="Confirm Order"
            className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-600"
          />
        </article>
      </section>
    </main>
  );
};

export default Checkout;

import { useState, Dispatch, SetStateAction } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { SelectedProductType } from 'utils/interfaces';
import { calculateTotal, calculateTax } from 'utils/utils';
import { SHIPPING } from 'data/Products';

interface PaypalPropsTypes {
  setPaypalOrderId: Dispatch<SetStateAction<string>>;
  cartData: SelectedProductType[] | undefined;
  paypalError: boolean;
  setPaypalError: Dispatch<SetStateAction<boolean>>;
}

const Paypal = ({
  setPaypalOrderId,
  cartData,
  paypalError,
  setPaypalError,
}: PaypalPropsTypes) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const taxPrice = calculateTax(cartData) ?? 0;
  const totalProductPrice = calculateTotal(cartData) ?? 0;
  const totalPrice = totalProductPrice + taxPrice + SHIPPING;

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Happy Jolly Item',
            amount: {
              currency_code: 'CAD',
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID: any) => {
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer } = details;
      setPaypalOrderId(data);
      setError(false);
      setPaypalError(false);
      setSuccess(true);
      return payer;
    });
  };

  // capture likely error
  const onError = () => {
    setError(true);
  };

  return (
    <div className="mt-10">
      <PayPalButtons
        style={{ layout: 'horizontal', tagline: false }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        disabled={success}
      />
      {(paypalError || error) && (
        <small className="animate-shake text-red-500">
          Your payment is not completed.
        </small>
      )}
    </div>
  );
};

export default Paypal;

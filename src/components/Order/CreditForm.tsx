import Cards from 'react-credit-cards';
import { CardTypes, Focused } from 'utils/interfaces';
import { Dispatch, SetStateAction } from 'react';
import Input from 'components/ui/Input';
import { UseFormRegister, FormState, UseFormSetValue } from 'react-hook-form';
import {
  handleOnChangeNumber,
  handleOnChangeString,
  handleOnFocus,
} from 'utils/utils';

interface CreditFormPropsTypes {
  paymentMethod: string;
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focused: Focused | undefined;
  setFocused: Dispatch<SetStateAction<Focused | undefined>>;
  cardRegister: UseFormRegister<CardTypes>;
  cardFormState: FormState<CardTypes>;
  setValue: UseFormSetValue<CardTypes>;
}

const CreditForm = ({
  paymentMethod,
  number,
  name,
  expiry,
  cvc,
  focused,
  setFocused,
  cardRegister,
  cardFormState,
  setValue,
}: CreditFormPropsTypes) => {
  return (
    <>
      {paymentMethod === 'credit' && (
        <div className="mt-10" id="PaymentForm">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
          />

          <form className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              type="text"
              {...cardRegister('number', {
                onChange: (e) =>
                  handleOnChangeNumber(e.target.name, e.target.value, setValue),
                minLength: {
                  value: 16,
                  message: 'card number needs to be 16 digits',
                },
                required: 'Please provide a card number',
              })}
              error={cardFormState.errors.number?.message}
              onFocus={() => {
                handleOnFocus('number', setFocused);
              }}
              labelText="Card Number"
              maxLength={16}
            />
            <Input
              type="text"
              {...cardRegister('name', {
                onChange: (e) =>
                  handleOnChangeString(e.target.name, e.target.value, setValue),
                required: 'Please provide a name on card',
              })}
              error={cardFormState.errors.name?.message}
              onFocus={() => {
                handleOnFocus('name', setFocused);
              }}
              labelText="Name on card"
            />
            <Input
              type="text"
              {...cardRegister('expiry', {
                onChange: (e) =>
                  handleOnChangeNumber(e.target.name, e.target.value, setValue),
                minLength: {
                  value: 4,
                  message: 'Expiration date needs to be 4 digits',
                },
                required: 'Please provide expiry date',
              })}
              error={cardFormState.errors.expiry?.message}
              onFocus={() => {
                handleOnFocus('expiry', setFocused);
              }}
              labelText="Expiration date (MM/YY)"
              maxLength={4}
            />
            <Input
              type="text"
              {...cardRegister('cvc', {
                onChange: (e) =>
                  handleOnChangeNumber(e.target.name, e.target.value, setValue),
                minLength: {
                  value: 4,
                  message: 'Cvc needs to be 4 digits',
                },
                required: 'Please provide a cvc',
              })}
              error={cardFormState.errors.cvc?.message}
              onFocus={() => {
                handleOnFocus('cvc', setFocused);
              }}
              labelText="CVC"
              maxLength={4}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default CreditForm;

import { useAuthContext } from 'context/AuthContext';
import { useForm, useWatch } from 'react-hook-form';
import Input from 'components/ui/Input';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import ProductTitle from 'components/ui/ProductTitle';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import useGetCardForm from 'hooks/useGetCardForm';
import {
  handleOnChangeString,
  handleOnChangeNumber,
  handleOnFocus,
} from 'utils/collectionUtils';
import useCart from 'hooks/useCart';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PriceCard from 'components/PriceCard';
import { SelectedProductType } from 'utils/interfaces';
import { SHIPPING } from 'data/Products';
import Button from 'components/ui/Button';

interface CardTypes {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

interface FormType {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  paymentMethod: string;
}

type Focused = 'name' | 'number' | 'expiry' | 'cvc';

const CANADA_STATE = [
  '',
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Larbrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];

const Checkout = () => {
  const { ...contextData } = useAuthContext();
  // const { user, loading } = contextData;
  const { user } = contextData;

  const {
    cartQuery: { isLoading, error, data },
  } = useCart();

  const taxPrice = data?.reduce(
    (prev: number, current: SelectedProductType) =>
      prev + current.price * current.quantity * 0.13,
    0,
  );
  const totalPrice = data?.reduce(
    (prev: number, current: SelectedProductType) =>
      prev + current.price * current.quantity,
    0,
  );

  console.log(isLoading, error, data);

  const {
    register,
    control,
    // handleSubmit,
    // watch,
    // formState: { isSubmitting, isDirty, errors },
    // setError,
    // setValue,
    // clearErrors,
    // getValues,
  } = useForm<FormType>({
    mode: 'onSubmit',
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

  const paymentMethod = useWatch({
    control,
    name: 'paymentMethod',
  });

  const [focused, setFocused] = useState<Focused | undefined>(undefined);

  const methods = useForm<CardTypes>({
    defaultValues: {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
    },
  });

  const { number, name, expiry, cvc } = useGetCardForm({
    control: methods.control,
  });

  return (
    <main className="mx-auto mb-32 w-full max-w-7xl  px-4 pt-24 sm:px-6  lg:px-8">
      <ProductTitle title="Checkout" />
      {/* Information */}
      <section className="mt-4 flex flex-wrap gap-20 lg:flex-nowrap">
        <article className="w-full border-t border-gray-200 pt-4 lg:w-1/2">
          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="mb-6 text-xl font-semibold leading-6 ">
              Contact Information
            </h3>
            <Input
              {...register('email', {
                required: 'Please provide a first name',
              })}
              labelText="Email Address"
              type="text"
              className="mb-2"
              autocomplete="on"
            />
          </div>
          {/* Shipping information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-6 text-xl font-semibold leading-6 ">
              Shipping Information
            </h3>
            <form action="">
              <Input
                {...register('firstName', {
                  required: 'Please provide a first name',
                })}
                labelText="First Name"
                type="text"
                className="mb-3"
                autofocus
                autocomplete="on"
              />
              <Input
                {...register('lastName', {
                  required: 'Please provide a last name',
                })}
                labelText="Last Name"
                type="text"
                className="mb-8"
                autocomplete="on"
              />
              <Input
                {...register('address', {
                  required: 'Please provide an address',
                })}
                labelText="Address"
                type="text"
                className="mb-3"
                autocomplete="on"
              />
              <Input
                {...register('apartment')}
                labelText="Apartment, suite, etc"
                type="text"
                className="mb-3"
                autocomplete="on"
              />
              <div className="mb-4 grid grid-cols-2 gap-3">
                <Input
                  {...register('postalCode', {
                    required: 'Please provide a postal code',
                  })}
                  labelText="Postal Code"
                  type="text"
                  autocomplete="on"
                />
                <Input
                  {...register('city', {
                    required: 'Please provide a city',
                  })}
                  labelText="City"
                  type="text"
                  autocomplete="on"
                />
                <div className="relative h-[58px]">
                  <select
                    {...register('state', {
                      required: 'Please select a state',
                    })}
                    className="relative h-full w-full cursor-default appearance-none rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 sm:leading-6"
                  >
                    {CANADA_STATE.map((value) => (
                      <Fragment key={value}>
                        {value ? (
                          <option value="value" key={value}>
                            {value}
                          </option>
                        ) : (
                          <option value="" key={value} disabled>
                            Province / State
                          </option>
                        )}
                      </Fragment>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                </div>

                <Input
                  {...register('country')}
                  labelText="Country"
                  type="text"
                  className="mb-3"
                  autocomplete="on"
                  disabled
                />
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="mb-6 text-xl font-semibold leading-6 ">
                  Delivery Method
                </h3>
              </div>

              <div className="relative mb-8 w-1/2 rounded-lg border  border-violet-500 p-4 text-sm">
                <h4 className="mb-1 text-base font-semibold">Standard</h4>
                <p className="text-gray-600">4-10 business days</p>
                <p className="mt-4 font-semibold">$5.00</p>
                <CheckCircleIcon className="absolute top-4 right-4 h-6 w-6 text-violet-500" />
              </div>

              <fieldset className="border-t border-gray-200 pt-6">
                {/* <legend className="contents text-sm font-semibold leading-6 text-gray-900"> */}
                <legend className="mb-6 contents text-xl font-semibold leading-6">
                  Payment Method
                </legend>

                <div className="mt-4 flex items-center space-x-10">
                  <div className="flex items-center">
                    <Input
                      {...register('paymentMethod')}
                      value="credit"
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="mr-2 flex w-4 items-center border-gray-300 accent-violet-500"
                      inputClassName="h-4"
                    />
                    <label
                      htmlFor="credit"
                      className="block text-base font-medium leading-6 text-gray-900"
                    >
                      Credit Cart
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Input
                      {...register('paymentMethod')}
                      id="paypal"
                      value="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="mr-2 flex w-4 items-center border-gray-300 accent-violet-500"
                      inputClassName="h-4"
                    />
                    <label
                      htmlFor="paypal"
                      className="block text-base font-medium leading-6 text-gray-900"
                    >
                      PayPal
                    </label>
                  </div>
                </div>
              </fieldset>
              {paymentMethod === 'credit' && (
                <fieldset className="mt-10" id="PaymentForm">
                  <Cards
                    number={number.value}
                    name={name.value}
                    expiry={expiry.value}
                    cvc={cvc.value}
                    focused={focused}
                  />

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      value={number.value}
                      onChange={(e) =>
                        handleOnChangeNumber({
                          value: e.target.value,
                          onChange: number.onChange,
                        })
                      }
                      onFocus={() => {
                        handleOnFocus('number', setFocused);
                      }}
                      labelText="Card Number"
                      maxLength={16}
                    />
                    <Input
                      type="text"
                      value={name.value}
                      onChange={(e) =>
                        handleOnChangeString({
                          value: e.target.value,
                          onChange: name.onChange,
                        })
                      }
                      onFocus={() => {
                        handleOnFocus('name', setFocused);
                      }}
                      labelText="Name on card"
                    />
                    <Input
                      type="text"
                      value={expiry.value}
                      onChange={(e) =>
                        handleOnChangeNumber({
                          value: e.target.value,
                          onChange: expiry.onChange,
                        })
                      }
                      onFocus={() => {
                        handleOnFocus('expiry', setFocused);
                      }}
                      labelText="Expiration date (MM/YY)"
                      maxLength={4}
                    />
                    <Input
                      type="text"
                      value={cvc.value}
                      onChange={(e) =>
                        handleOnChangeNumber({
                          value: e.target.value,
                          onChange: cvc.onChange,
                        })
                      }
                      onFocus={() => {
                        handleOnFocus('cvc', setFocused);
                      }}
                      labelText="CVC"
                      maxLength={4}
                    />
                  </div>
                </fieldset>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mt-8 rounded-lg border  border-violet-500 p-4 text-base">
                  You will be redirected to PayPal
                </div>
              )}
            </form>
          </div>
        </article>
        {/* Product */}
        <article className="w-full lg:w-1/2">
          <div>
            <h3 className="mb-2 text-xl font-semibold leading-6 ">
              Order Summary
            </h3>
          </div>
          <div>
            {data?.map(({ image, title, price, size }) => (
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
                  totalPrice
                    ? totalPrice + SHIPPING + (taxPrice ?? 0)
                    : SHIPPING
                }
              />
            </div>
          </div>
          <Button
            text="Confirm Order"
            className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-600"
          />
        </article>
      </section>
    </main>
  );
};

export default Checkout;

import { Fragment } from 'react';
import Input from 'components/ui/Input';
import { EMAIL_REGEX } from 'data/Auth/authData';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { UserFormTypes } from 'utils/interfaces';
import { CANADA_STATE } from 'data/Products';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface ContactPropsTypes {
  register: UseFormRegister<UserFormTypes>;
  errors: Partial<
    FieldErrorsImpl<{
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
    }>
  >;
}

const ContactForm = ({ register, errors }: ContactPropsTypes) => {
  return (
    <>
      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="mb-6 text-xl font-semibold leading-6 ">
          Contact Information
        </h3>
        <Input
          {...register('email', {
            required: 'Please provide an email',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please providew a properly formatted email address',
            },
          })}
          error={errors.email?.message}
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
        <form>
          <Input
            {...register('firstName', {
              required: 'Please provide a first name',
            })}
            error={errors.firstName?.message}
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
            error={errors.lastName?.message}
            labelText="Last Name"
            type="text"
            className="mb-8"
            autocomplete="on"
          />
          <Input
            {...register('address', {
              required: 'Please provide an address',
            })}
            error={errors.address?.message}
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
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              {...register('postalCode', {
                required: 'Please provide a postal code',
              })}
              error={errors.postalCode?.message}
              labelText="Postal Code"
              type="text"
              autocomplete="on"
            />
            <Input
              {...register('city', {
                required: 'Please provide a city',
              })}
              error={errors.city?.message}
              labelText="City"
              type="text"
              autocomplete="on"
            />
            <div>
              <div className="relative h-[58px]">
                <select
                  {...register('state', {
                    required: 'Please select a state',
                  })}
                  className={`relative h-full w-full cursor-default appearance-none rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-500 shadow-sm ring-1 ring-inset ${
                    errors.state?.message ? 'ring-red-500' : 'ring-gray-300'
                  }  focus:outline-none focus:ring-2 focus:ring-violet-500 sm:leading-6`}
                >
                  {CANADA_STATE.map((value) => (
                    <Fragment key={value}>
                      {value ? (
                        <option value={value} key={value}>
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
              {errors.state?.message && (
                <small
                  role="alert"
                  className={`${
                    errors.state?.message ? 'animate-shake' : ''
                  } text-red-500`}
                >
                  {errors.state?.message}
                </small>
              )}
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

          {/* Delivery Method */}
          <fieldset>
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
          </fieldset>

          {/* Payment Method */}
          <fieldset className="border-t border-gray-200 pt-6">
            <legend className="mb-6 contents text-xl font-semibold leading-6">
              Payment Method
            </legend>

            <div className="mt-4 flex flex-wrap items-center">
              <div className="mr-10 flex items-center">
                <Input
                  {...register('paymentMethod', {
                    required: 'Please select a payment method',
                  })}
                  value="credit"
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="mr-2 flex items-center border-gray-300 accent-violet-500"
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
                  className="mr-2 flex items-center border-gray-300 accent-violet-500"
                  inputClassName="h-4"
                />
                <label
                  htmlFor="paypal"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  PayPal
                </label>
              </div>
              {errors.paymentMethod?.message && (
                <small
                  role="alert"
                  className={`mt-3 w-full ${
                    errors.paymentMethod?.message ? 'animate-shake' : ''
                  } text-red-500`}
                >
                  {errors.paymentMethod?.message}
                </small>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default ContactForm;

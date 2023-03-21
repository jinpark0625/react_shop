import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SelectedProductType } from 'utils/interfaces';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavigateFunction } from 'react-router-dom';
import Button from 'components/ui/Button';
import LoadingSkeleton from 'components/ui/LoadingSkeleton';
interface CartSlideOverProps {
  isLoading: boolean;
  cartError?: Error | null;
  cartItems: SelectedProductType[] | undefined;
  deleteCartItem: (id: number) => void;
  navigate: NavigateFunction;
}

const CartSlideOver = ({
  isLoading,
  cartError,
  cartItems,
  deleteCartItem,
  navigate,
}: CartSlideOverProps) => {
  const [open, setOpen] = useState(true);

  const totalPrice = cartItems?.reduce(
    (prev: number, current: SelectedProductType) =>
      prev + current.price * current.quantity,
    0,
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      {cartError && (
                        <p className="mt-4 text-sm text-red-500">
                          Sorry something went wrong. Please try again
                        </p>
                      )}
                      {/* Cart Item lists */}
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {isLoading && (
                              <li className="flex py-6">
                                <LoadingSkeleton className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-slate-50" />
                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                  <LoadingSkeleton className="h-10 w-full animate-pulse rounded-md bg-slate-50" />
                                  <LoadingSkeleton className="h-4 w-full animate-pulse rounded-md bg-slate-50" />
                                </div>
                              </li>
                            )}
                            {cartItems?.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <LazyLoadImage
                                    src={product.image}
                                    alt={product.title}
                                    effect="blur"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link
                                          to={`/product/${product?.id}`}
                                          onClick={() => setOpen(false)}
                                        >
                                          {product.title}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Size: {product.size}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {product.quantity}
                                    </p>

                                    <div className="flex">
                                      <Button
                                        text="Remove"
                                        className="font-medium text-violet-500 hover:text-violet-600"
                                        onClick={() =>
                                          deleteCartItem(product.id)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Cart Item Price */}
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Button
                          text="Checkout"
                          className="flex w-full items-center justify-center rounded-md border border-transparent bg-violet-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-600"
                          onClick={() => navigate('/checkout')}
                        />
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p className="flex items-center text-violet-500 hover:text-violet-600">
                          <Button
                            text="Continue Shopping"
                            className="text-sm font-medium text-violet-500 hover:text-violet-600"
                            onClick={() => setOpen(false)}
                          />
                          <span
                            aria-hidden="true"
                            className="ml-1 cursor-pointer"
                          >
                            &rarr;
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartSlideOver;

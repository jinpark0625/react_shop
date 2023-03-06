import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SelectedProductType } from '../../utils/interfaces';
import useCart from '../../hooks/useCart';
import { useAuthContext } from '../../context/AuthContext';
import NotFound from '../NotFound';
import type { Swiper as SwiperClass } from 'swiper';
import CartSlideOver from 'components/Product/CartSlideOver';
import { classNames } from 'hooks/useHeadless';
import Modal from 'components/ui/Modal';
import Button from '../../components/ui/Button';

const Product = () => {
  const { state } = useLocation();

  if (!state.id) {
    return <NotFound />;
  }

  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const { id, image, title, description, price, sizes, details, highlights } =
    state;

  const { ...contextData } = useAuthContext();
  const { user } = contextData;

  const {
    addOrUpdateItem,
    removeItem,
    cartQuery: { isLoading, error: cartError, data: cartItems },
  } = useCart();

  const [cartAdded, setCartAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [notice, setNotice] = useState(false);

  const checkCartItem = () => {
    setCartAdded(false);
    const check = cartItems?.findIndex((item) => item.id === id);
    check === -1 ? handleClick() : setNotice(true);
  };

  const handleInputChange = (value: string) => {
    setSelectedSize(value);
    setError(false);
  };

  const handleClick = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    if (user === null) {
      setOpen(true);
      return;
    }
    const product: SelectedProductType = {
      id,
      image,
      title,
      price,
      size: selectedSize,
      quantity: 1,
    };

    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setCartAdded(true);
      },
    });
  };

  const deleteCartItem = (id: number) => {
    removeItem.mutate(id);
  };

  return (
    <>
      {/* Login Modal  */}
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          title="Please Log In"
          content={
            "To access this feature, you'll need to log in. \n Don't have an account yet? Sign up now!"
          }
          IdentificationIcon={IdentificationIcon}
          bg="bg-violet-100"
          color="text-violet-500"
          firstOnClick={() => navigate('/login')}
          secondOnClick={() => navigate('/register')}
        />
      )}

      {/* Cart Slide Over */}
      {cartAdded && (
        <CartSlideOver
          isLoading={isLoading}
          cartError={cartError}
          cartItems={cartItems}
          deleteCartItem={deleteCartItem}
        />
      )}

      {/* Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            {/* image */}
            <div>
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2"
              >
                {image.map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={description}
                          effect="blur"
                          className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={16}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="mySwiper mt-4"
              >
                {image.map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={description}
                          effect="blur"
                          className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product info */}
            <div className="mx-auto w-full pl-0 pt-10 pb-16 lg:pl-8 lg:pt-0 lg:pb-24">
              {/* Title */}
              <div className=" lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="mt-4 text-3xl tracking-tight text-gray-900">
                  ${price}
                </p>

                <div className="mt-10">
                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <div className="text-sm font-medium text-violet-500 hover:text-violet-600">
                        Size guide
                      </div>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={(value: string) => handleInputChange(value)}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size{' '}
                      </RadioGroup.Label>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {sizes.map((size: string) => (
                          <RadioGroup.Option
                            key={size}
                            value={size}
                            disabled={!size}
                            className={({ active }) =>
                              classNames(
                                size
                                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                  : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                active ? 'ring-2 ring-violet-500' : '',
                                'group relative flex max-h-[44px] items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 ',
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size}
                                </RadioGroup.Label>
                                {size ? (
                                  <span
                                    className={classNames(
                                      active ? 'border' : 'border-2',
                                      checked
                                        ? 'border-violet-500'
                                        : 'border-transparent',
                                      'pointer-events-none absolute -inset-px rounded-md',
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  {error && (
                    <p className="mt-4 text-sm text-red-500">
                      Select a size to add to cart
                    </p>
                  )}
                  {notice && (
                    <p className="mt-4 text-sm text-red-500">
                      {title} has been added to your cart.
                    </p>
                  )}
                  <Button
                    text="Add to bag"
                    onClick={checkCartItem}
                    className="mt-10 flex max-h-[44px] w-full items-center justify-center rounded-md border border-transparent bg-violet-500 py-2 px-8 text-base font-medium leading-7 text-white hover:bg-violet-600"
                  />
                </div>
              </div>

              <div className="py-10 lg:border-gray-200 lg:pt-6 lg:pb-16">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{description}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {highlights.map((highlight: string) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

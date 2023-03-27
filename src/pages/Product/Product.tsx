import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { IdentificationIcon } from '@heroicons/react/24/outline';
import { FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SelectedProductType } from '../../utils/interfaces';
import useProducts from 'hooks/useProducts';
import useCart from '../../hooks/useCart';
import { useAuthContext } from '../../context/AuthContext';
import NotFound from '../NotFound';
import type { Swiper as SwiperClass } from 'swiper';
import CartSlideOver from 'components/Product/CartSlideOver';
import { classNames, removeCollectionsPrefix } from 'utils/utils';
import Modal from 'components/ui/Modal';
import Button from '../../components/ui/Button';
import { ProductType } from 'utils/interfaces';
import Loading from 'components/ui/Loading';
import ProductLoading from 'components/Product/ProductLoading';
interface CartProps {
  id?: number;
  image?: string;
  title?: string;
  price?: number;
}

const Product = () => {
  const { pathname } = useLocation();

  const productId = removeCollectionsPrefix('/product/', pathname);

  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const { ...contextData } = useAuthContext();
  const { user } = contextData;

  const [productData, setProductData] = useState<ProductType>();

  const {
    productsQuery: { isLoading: itemLoading, error: itemError, data },
  } = useProducts({}, { key: 'id', value: productId });

  useEffect(() => {
    data && setProductData(data[0]);
  }, [data]);

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

  const checkCartItem = ({ id, image, title, price }: CartProps) => {
    setCartAdded(false);
    if (!selectedSize) {
      setError(true);
      return;
    }
    if (!user) {
      setOpen(true);
      return;
    }
    const check = cartItems?.findIndex((item) => item.id === productData?.id);
    check === -1 ? handleClick({ id, image, title, price }) : setNotice(true);
  };

  const handleInputChange = (value: string) => {
    setSelectedSize(value);
    setError(false);
  };

  const handleClick = ({ id, image, title, price }: CartProps) => {
    if (id && image && title && price) {
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
    }
  };

  const deleteCartItem = (id: number) => {
    removeItem.mutate(id);
  };

  if (itemError) return <NotFound />;

  if (itemLoading) return <ProductLoading />;

  return (
    <>
      {/* Loading */}
      {addOrUpdateItem.isLoading && <Loading />}
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
          navigate={navigate}
        />
      )}

      {/* Content */}
      <div className="bg-white">
        <div className="mx-auto mb-32 max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
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
                {productData?.image?.map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={productData.description}
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
                {productData?.image?.map((img: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
                      <div className="absolute inset-0 translate-x-1/2 translate-y-1/2">
                        <LazyLoadImage
                          src={img}
                          alt={productData.description}
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
                  {productData?.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="mt-4 text-3xl tracking-tight text-gray-900">
                  ${productData?.price}
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
                        {productData?.sizes?.map((size: string) => (
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
                      {productData?.title} has been added to your cart.
                    </p>
                  )}
                  <Button
                    text="Add to bag"
                    onClick={() => {
                      const id = productData?.id;
                      const image = productData?.image[0];
                      const title = productData?.title;
                      const price = productData?.price;
                      return checkCartItem({
                        id,
                        image,
                        title,
                        price,
                      });
                    }}
                    className="mt-10 flex max-h-[44px] w-full items-center justify-center rounded-md border border-transparent bg-violet-500 py-2 px-8 text-base font-medium leading-7 text-white hover:bg-violet-600"
                  />
                </div>
              </div>

              <div className="py-10 lg:border-gray-200 lg:pt-6 lg:pb-16">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {productData?.description}
                    </p>
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
                      {productData?.highlights?.map((highlight: string) => (
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
                    <p className="text-sm text-gray-600">
                      {productData?.details}
                    </p>
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

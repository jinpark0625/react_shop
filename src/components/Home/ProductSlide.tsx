import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import {
  PRODUCT_BREAK_POINTS,
  PRODUCT_LOADING_ARRAY,
} from '../../data/Home/slideOptions';
import ProductCard from '../ui/ProductCard';
import ProductTitle from 'components/ui/ProductTitle';
import ErrorMessage from 'components/ui/ErrorMessage';
import { ProductType } from 'utils/interfaces';

interface ProductSlidePropsTypes {
  isLoading?: boolean;
  error?: Error | null;
  products?: ProductType[];
}

export default function ProductSlide({
  isLoading,
  error,
  products,
}: ProductSlidePropsTypes) {
  return (
    <section className="mx-auto mt-20 w-full max-w-7xl py-4">
      <ProductTitle title="New Arrivals" className="mb-6 px-6 sm:mb-10" />
      {/* Carousel */}
      <Swiper
        navigation={{
          nextEl: '.image-swiper-button-next-product',
          prevEl: '.image-swiper-button-prev-product',
          disabledClass: 'opacity-20',
        }}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
        }}
        breakpoints={PRODUCT_BREAK_POINTS}
        modules={[Pagination, Navigation]}
        className="!px-6 !pb-14"
      >
        {/* loading status */}
        {isLoading &&
          PRODUCT_LOADING_ARRAY.map((data) => (
            <SwiperSlide
              key={data}
              className="group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
            >
              <ImagePlaceholder />
            </SwiperSlide>
          ))}
        {error && <ErrorMessage />}
        {/* Carousel items */}
        {products?.map(
          ({ id, image, description, title, price, category, sizes, tags }) => {
            return (
              <SwiperSlide
                key={id}
                className="group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
              >
                <ProductCard
                  id={id}
                  image={image}
                  description={description}
                  title={title}
                  price={price}
                  category={category}
                  sizes={sizes}
                  tags={tags}
                />
              </SwiperSlide>
            );
          },
        )}
        {/* Custom navigation */}
        <div className="mt-8  flex items-center justify-center">
          <div className="swiper-button image-swiper-button-prev-product mr-4 h-6 w-6 cursor-pointer">
            <ChevronLeftIcon />
          </div>
          <div className="custom-pagination flex justify-center"></div>
          <div className="swiper-button image-swiper-button-next-product ml-4 h-6 w-6 cursor-pointer">
            <ChevronRightIcon />
          </div>
        </div>
      </Swiper>
    </section>
  );
}

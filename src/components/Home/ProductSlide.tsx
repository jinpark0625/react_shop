import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import useProducts from '../../hooks/useProducts';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import {
  PRODUCT_BREAK_POINTS,
  PRODUCT_LOADING_ARRAY,
} from '../../data/Home/slideOptions';
import ProductCard from '../ui/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function ProductSlide() {
  const {
    productSlideQuery: { isLoading, error, data: products },
  } = useProducts();

  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-20 max-w-7xl py-4">
      <h2 className="mb-6 px-6 text-2xl font-bold tracking-tight text-gray-900 sm:mb-10 sm:text-4xl">
        New Arrivals
      </h2>
      {/* Carousel */}
      <Swiper
        navigation={{
          nextEl: '.image-swiper-button-next',
          prevEl: '.image-swiper-button-prev',
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
        {error && (
          <p className="col-span-2 text-center text-red-500">
            Sorry something went wrong. Please try agaain
          </p>
        )}
        {/* Carousel items */}
        {products?.map(({ id, image, description, title, price, category }) => {
          const product = { id, image, description, title, price, category };
          return (
            <SwiperSlide
              key={id}
              className="group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
              onClick={() => {
                navigate(`/products/${id ?? 404}`, {
                  state: { product },
                });
              }}
            >
              <ProductCard
                image={image}
                description={description}
                title={title}
                price={price}
                category={category}
              />
            </SwiperSlide>
          );
        })}
        {/* Custom navigation */}
        <div className="mt-8  flex items-center justify-center">
          <div className="swiper-button image-swiper-button-prev mr-4 h-6 w-6 cursor-pointer">
            <ChevronLeftIcon />
          </div>
          <div className="custom-pagination flex justify-center"></div>
          <div className="swiper-button image-swiper-button-next ml-4 h-6 w-6 cursor-pointer">
            <ChevronRightIcon />
          </div>
        </div>
      </Swiper>
    </section>
  );
}

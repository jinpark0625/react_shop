import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import useNft from '../../hooks/useNft';
import {
  NFT_BREAK_POINTS,
  NFT_LOADING_ARRAY,
} from '../../data/Home/slideOptions';
import NftCard from '../ui/NftCard';

export default function NftSlide() {
  const {
    nftsQuery: { isLoading, data: products },
  } = useNft();

  return (
    <section className="mx-auto mt-12 w-full max-w-7xl py-4 md:mt-20">
      {/* Custom Navigation */}
      <div className="flex items-center justify-between px-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Collect Trending Happy Jolly
        </h2>
        <div className="hidden items-center justify-center sm:flex">
          <div className="swiper-button image-swiper-button-prev mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300">
            <ChevronLeftIcon className="h-6 w-6" />
          </div>
          <div className="swiper-button image-swiper-button-next ml-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300">
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      {/* Carousel */}
      <Swiper
        navigation={{
          nextEl: '.image-swiper-button-next',
          prevEl: '.image-swiper-button-prev',
          disabledClass: 'opacity-20',
        }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={NFT_BREAK_POINTS}
        modules={[Navigation]}
        className="relative overscroll-y-contain !px-6 !pt-6 !pb-2 sm:!pt-10"
      >
        {/* loading status */}
        {isLoading &&
          NFT_LOADING_ARRAY.map((data) => (
            <SwiperSlide
              key={data}
              className="group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
            >
              <ImagePlaceholder />
            </SwiperSlide>
          ))}
        {/* carousel items */}
        {products?.map(({ Title, image }, index) => {
          //   const product = { Title,image };
          return (
            <SwiperSlide
              key={index}
              className="group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
              //   onClick={() => {
              //     navigate(`/products/${id ?? 404}`, {
              //       state: { product },
              //     });
              //   }}
            >
              <NftCard image={image} title={Title} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

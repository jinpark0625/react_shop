import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import MainImage from './MainImage';
import { MAIN_DATA } from 'data/Home/homeData';

export default function Main() {
  return (
    <section className="relative">
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-12">
              <div className="lg:max-w-xl">
                <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-left">
                  Welcome to the World of{' '}
                  <span className="block text-violet-500 lg:inline">
                    Happy Jolly
                  </span>
                </h1>
                <p className="mt-6 text-center text-lg leading-8 text-gray-600 lg:text-left">
                  <span className="inline font-semibold text-gray-900">
                    Happy Jolly
                  </span>{' '}
                  are 100 unique collectible Yorkies with proof of ownership
                  stored on the Ethereum Blockchain.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-y-4 gap-x-6 sm:flex-nowrap sm:gap-y-4 lg:justify-start">
                  <Link
                    to="/nfts"
                    className="flex w-full items-center justify-center rounded-md bg-violet-500 px-4 py-2 text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-violet-600 sm:w-fit"
                  >
                    See the Collection
                    <GlobeEuropeAfricaIcon className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/collections"
                    className="flex max-h-[44px] w-full items-center justify-center rounded-md border border-violet-500 px-4 py-2 text-base font-semibold leading-7 text-violet-500 shadow-sm transition-all hover:shadow-violet-500 sm:w-fit"
                  >
                    Shop Now
                    <GlobeEuropeAfricaIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative flex h-96 justify-center	">
              {MAIN_DATA.map(
                ({
                  name,
                  price,
                  time,
                  image,
                  rotation,
                  scale,
                  direction,
                  zIndex,
                }) => (
                  <MainImage
                    key={name}
                    name={name}
                    price={price}
                    time={time}
                    image={image}
                    rotation={rotation}
                    scale={scale}
                    direction={direction}
                    zIndex={zIndex}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import MainImage from './MainImage';
import { mainData } from 'data/Home/homeData';

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
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <Link
                    to="/"
                    className="flex items-center rounded-md bg-violet-500 px-4 py-2 text-base font-semibold leading-7 text-white shadow-sm transition-all hover:bg-violet-600 hover:shadow-violet-500"
                  >
                    See the Collection
                    <GlobeEuropeAfricaIcon className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center rounded-md border border-violet-500 px-4 py-2 text-base font-semibold leading-7 text-violet-500 shadow-sm transition-all hover:shadow-violet-500"
                  >
                    Shop Now
                    <GlobeEuropeAfricaIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative flex h-96 justify-center	">
              {mainData.map((data) => (
                <MainImage
                  key={data.name}
                  name={data.name}
                  price={data.price}
                  time={data.time}
                  image={data.image}
                  rotation={data.rotation}
                  scale={data.scale}
                  direction={data.direction}
                  zIndex={data.zIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

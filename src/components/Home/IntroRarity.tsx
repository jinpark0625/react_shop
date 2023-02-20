import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function IntroRarity() {
  return (
    <section className="relative mt-10 md:mt-24">
      <div className="overflow-hidden  py-24 sm:py-32">
        <div className="mx-auto max-w-7xl bg-slate-50 px-0 md:bg-transparent md:px-6 lg:px-8">
          <div className="mx-auto flex flex-col rounded-3xl bg-slate-50 py-24 lg:mx-0 ">
            <div className="relative flex h-52 w-full justify-center sm:h-64 md:h-80 lg:h-96">
              <LazyLoadImage
                src="images/rarity.webp"
                width="100%"
                effect="blur"
                alt="Image Alt"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="px-6 pt-16 md:px-0">
              <div className="text-center">
                <h1 className="m-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:max-w-3xl">
                  <span className="block text-violet-500 lg:inline">
                    Ultra rare
                  </span>{' '}
                  Happy Jolly NFTs
                </h1>
                <p className="mx-auto max-w-2xl pt-12 text-lg leading-8 text-gray-900">
                  Happy Jolly NFTs are special digital things that are very rare
                  and totally unique. Each one is made up of more than 100
                  different parts that are combined in different ways to make
                  each one completely one-of-a-kind. And because they are made
                  using blockchain technology, each Happy Jolly can only be
                  owned by one person. With so many possibilities, every Happy
                  Jolly is a special and unique creation!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import useNft from 'hooks/useNft';
import ProductTitle from 'components/ui/ProductTitle';
import { Fragment, useState, useRef, useCallback } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  MinusIcon,
  FunnelIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import NftCard from 'components/ui/NftCard';
import ImagePlaceholder from 'components/ui/ImagePlaceholder';
import { NftType } from 'utils/interfaces';

const filters = [
  {
    id: 'background',
    name: 'Background',
    options: [
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'heart', label: 'Heart', checked: true },
      { value: 'neon green', label: 'Neon Green', checked: false },
      { value: 'orange', label: 'Orange', checked: false },
      { value: 'pink', label: 'Pink', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
      { value: 'sky blue', label: 'Sky Blue', checked: false },
    ],
  },
  {
    id: 'body',
    name: 'Body',
    options: [{ value: 'brown', label: 'Brown', checked: false }],
  },
  {
    id: 'eyes',
    name: 'Eyes',
    options: [
      { value: 'Afraid Eyes', label: 'Afraid Eyes', checked: false },
      { value: 'Angry Eyes', label: 'Angry Eyes', checked: false },
      { value: 'Excited Eyes', label: 'Excited Eyes', checked: false },
      { value: 'Heart Eyes', label: 'Heart Eyes', checked: false },
      { value: 'Hopeful Eyes', label: 'Hopeful Eyes', checked: false },
      { value: 'Sad Eyes', label: 'Sad Eyes', checked: true },
      { value: 'Sunglasses', label: 'Sunglasses', checked: true },
      { value: 'Surprised Eyes', label: 'Surprised Eyes', checked: true },
    ],
  },
  {
    id: 'hat',
    name: 'Hat',
    options: [
      { value: 'Beanie', label: 'Beanie', checked: false },
      { value: 'Hairpin', label: 'Hairpin', checked: false },
      { value: 'Newsboy', label: 'Newsboy', checked: false },
      { value: 'Sunglasses', label: 'Sunglasses', checked: false },
      { value: 'Watermelon', label: 'Watermelon', checked: false },
    ],
  },
  {
    id: 'nose',
    name: 'Nose',
    options: [
      { value: 'Bored', label: 'Bored', checked: false },
      { value: 'Dog Chew', label: 'Dog Chew', checked: false },
      { value: 'Excited', label: 'Excited', checked: false },
      { value: 'Happy', label: 'Happy', checked: false },
      { value: 'Loved', label: 'Loved', checked: false },
      { value: 'Sad', label: 'Sad', checked: true },
    ],
  },
];

const LOADING_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

const Nfts = () => {
  const {
    nftsQuery: {
      isFetching,
      isLoading,
      error,
      data,
      hasNextPage,
      fetchNextPage,
    },
  } = useNft();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;
      // 관찰종료
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage().catch(console.log);
          }
        },
        {
          threshold: 1,
        },
      );
      // 관찰시작
      if (node) observer.current.observe(node);
    },
    [hasNextPage, fetchNextPage],
  );

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto mb-32 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
            <div className="flex flex-col">
              {/* page title */}
              <ProductTitle title="Happy Jolly NFTs" />
            </div>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              NFTs
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* loading status */}
                {isLoading && (
                  <ul className="grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-4">
                    {LOADING_ARRAY.map((data, index) => (
                      <li key={index}>
                        <ImagePlaceholder height="min-h-[184px]" />
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-4">
                  <>
                    {error && (
                      <p className="col-span-2 text-center text-red-500">
                        Sorry something went wrong. Please try again
                      </p>
                    )}
                    {data?.pages.map(({ results }, i) => {
                      return (
                        <Fragment key={i}>
                          {results.map(
                            (
                              { id, title, image }: NftType,
                              i: number,
                              arr: NftType[],
                            ) => {
                              if (arr.length === i + 1) {
                                return (
                                  <li
                                    key={id}
                                    className="group cursor-pointer rounded-2xl"
                                    ref={lastElementRef}
                                  >
                                    <NftCard image={image} title={title} />
                                  </li>
                                );
                              } else {
                                return (
                                  <li
                                    key={id}
                                    className="group cursor-pointer rounded-2xl"
                                  >
                                    <NftCard image={image} title={title} />
                                  </li>
                                );
                              }
                            },
                          )}
                        </Fragment>
                      );
                    })}
                    {isFetching && (
                      <ul className="grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-4">
                        {LOADING_ARRAY.map((data, index) => (
                          <li key={index}>
                            <ImagePlaceholder height="min-h-[184px]" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Nfts;

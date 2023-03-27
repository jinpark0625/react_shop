import useNft from 'hooks/useNft';
import ProductTitle from 'components/ui/ProductTitle';
import { Fragment, useState, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  FunnelIcon,
  FaceFrownIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import NftCard from 'components/ui/NftCard';
import ImagePlaceholder from 'components/ui/ImagePlaceholder';
import { NftType } from 'utils/interfaces';
import useIntersect from 'hooks/useIntersect';
import useSortParams from 'hooks/useSortParams';
import ErrorMessage from 'components/ui/ErrorMessage';
import { NftFilter, NftFilterHeader } from 'components/Nft/NftFilter';
import { FILTERITEM, LOADING_ARRAY } from 'data/Products';
import { deduplicateByOptions } from 'utils/utils';

const Nfts = () => {
  const {
    query,
    searchParams,
    appendSortParams,
    deleteSelectedSortParms,
    deleteAllParams,
  } = useSortParams();

  const {
    nftsQuery: {
      isFetching,
      isLoading,
      error,
      data,
      hasNextPage,
      fetchNextPage,
    },
    nftsAllData: {
      isLoading: filterLoading,
      error: filterError,
      data: filterData,
    },
  } = useNft(query);

  const [filters, setFilters] = useState<Array<{ [key: string]: string[] }>>(
    [],
  );

  useEffect(() => {
    filterData && deduplicate(filterData);
  }, [filterData]);

  const deduplicate = useCallback((nfts: NftType[]) => {
    const filters: Array<{ [key: string]: string[] }> = [];

    FILTERITEM.map((value) => {
      const lowerCaseValue = value.toLowerCase() as keyof NftType;
      const deduplicatedArray = deduplicateByOptions(nfts, lowerCaseValue);
      const filterObject = {
        [value]: deduplicatedArray,
      };
      return filters.push(filterObject);
    });

    setFilters(filters);
  }, []);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const lastElementRef = useIntersect(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage().catch(console.log);
      }
    },
    hasNextPage,
    fetchNextPage,
  );

  const handleCheckboxChange = (key: string, value: string) => {
    const values = searchParams.getAll(key);
    const isValueSelected = values.some(
      (v) => v.replace(/ /g, '') === value.replace(/ /g, ''),
    );

    if (isValueSelected) {
      deleteSelectedSortParms(key, value);
    } else appendSortParams(key, value);
  };

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
                    <h2 className="flex items-center text-lg font-medium text-gray-900">
                      <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
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
                  <NftFilter
                    filterLoading={filterLoading}
                    filterError={filterError}
                    filters={filters}
                    searchParams={searchParams}
                    handleCheckboxChange={handleCheckboxChange}
                    mobile={true}
                  />
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
              <div>
                {/* Filters */}
                <NftFilterHeader
                  query={query}
                  deleteAllParams={deleteAllParams}
                />
                <NftFilter
                  filterLoading={filterLoading}
                  filterError={filterError}
                  filters={filters}
                  searchParams={searchParams}
                  handleCheckboxChange={handleCheckboxChange}
                  mobile={false}
                />
              </div>

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
                    {error && <ErrorMessage />}
                    {data?.pages.map(({ data }, i) => {
                      return data && data.length !== 0 ? (
                        <Fragment key={i}>
                          {data.map(({ id, image, title }, i: number, arr) => (
                            <Fragment key={i}>
                              {arr.length === i + 1 ? (
                                <li
                                  key={id}
                                  className="group cursor-pointer rounded-2xl"
                                  ref={lastElementRef}
                                >
                                  <NftCard
                                    image={image}
                                    title={title}
                                    id={id}
                                  />
                                </li>
                              ) : (
                                <li
                                  key={id}
                                  className="group cursor-pointer rounded-2xl"
                                >
                                  <NftCard
                                    image={image}
                                    title={title}
                                    id={id}
                                  />
                                </li>
                              )}
                            </Fragment>
                          ))}
                        </Fragment>
                      ) : (
                        <li
                          className="col-span-4 mt-10 text-center text-gray-600"
                          key={i}
                        >
                          <FaceFrownIcon className="m-auto h-8 w-8 text-violet-500" />
                          <h3 className="m-2 text-2xl font-semibold text-gray-900">
                            No mathces
                          </h3>
                          Unfortunately we couldn’t find a match for your
                          search.
                        </li>
                      );
                    })}
                  </>
                </ul>
                {isFetching && (
                  <ul className="mt-6 grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-4">
                    {LOADING_ARRAY.map((data, index) => (
                      <li key={index}>
                        <ImagePlaceholder height="min-h-[184px]" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Nfts;

import { SetStateAction, Fragment, Dispatch, useState, useEffect } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';
import { FilterPropsType } from 'utils/interfaces';

interface MobileProps extends FilterPropsType {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
}

const FilterMobile = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  isLoading,
  allCategories,
  filters,
  colors,
  sizes,
  setSortParams,
  deleteSortParams,
  searchParams,
  pageData,
}: MobileProps) => {
  const [activeButton, setActiveButton] = useState('');
  const clickedButtonHandler = (name: string) => {
    if (name === activeButton) {
      setActiveButton('');
      deleteSortParams('item');
    } else {
      setActiveButton(name);
      setSortParams('item', name);
    }
  };

  useEffect(() => {
    setActiveButton(searchParams.get('item') ?? '');
  }, [searchParams]);

  return (
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
          <div className="fixed inset-0 bg-black/25" />
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
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
              <section
                aria-labelledby="products-heading"
                className="px-4 pt-6 pb-24"
              >
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {isLoading && (
                    <>
                      <li className="h-6 w-full animate-pulse rounded-md bg-slate-50"></li>
                      <li className="h-6 w-full animate-pulse rounded-md bg-slate-50"></li>
                    </>
                  )}
                  {allCategories.map((props, i) => {
                    return (
                      <li key={props}>
                        {pageData === 'subCategory' ? (
                          <button
                            className={`${
                              activeButton === props
                                ? 'font-bold text-violet-500'
                                : 'text-gray-900'
                            }`}
                            onClick={() => {
                              clickedButtonHandler(props);
                            }}
                          >
                            {props}
                          </button>
                        ) : (
                          <Link
                            to={`/collections/${props}`}
                            className="text-gray-900"
                          >
                            {props}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <ul>
                  {filters.map(({ name }) => (
                    <Disclosure
                      as="li"
                      className="border-b border-gray-200 py-6"
                      key={name}
                    >
                      {({ open }) => (
                        <>
                          {/* Filter Header */}
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {name}
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
                          {/* Filter Body */}
                          {name === 'Color' && (
                            <ColorFilter
                              colors={colors}
                              setSortParams={setSortParams}
                              deleteSortParams={deleteSortParams}
                              params={searchParams.get('color')}
                              searchParams={searchParams}
                            />
                          )}
                          {name === 'Size' && (
                            <SizeFilter
                              sizes={sizes}
                              setSortParams={setSortParams}
                              deleteSortParams={deleteSortParams}
                              params={searchParams.get('sizes')}
                              searchParams={searchParams}
                            />
                          )}
                        </>
                      )}
                    </Disclosure>
                  ))}
                </ul>
              </section>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FilterMobile;

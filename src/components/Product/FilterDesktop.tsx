import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';
import { useState, useEffect } from 'react';
import { FilterPropsType } from 'utils/interfaces';

const FilterDesktop = ({
  isLoading,
  allCategories,
  filters,
  colors,
  sizes,
  setSortParams,
  deleteSortParams,
  searchParams,
  pageData,
}: FilterPropsType) => {
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
    <div className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>
      <ul
        role="list"
        className=" space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        {isLoading && (
          <>
            <li className=" h-6 w-full animate-pulse rounded-md bg-slate-50"></li>
            <li className=" h-6 w-full animate-pulse rounded-md bg-slate-50"></li>
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
                <Link to={`/collections/${props}`} className="text-gray-900">
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
                    <span className="font-medium text-gray-900">{name}</span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
};

export default FilterDesktop;

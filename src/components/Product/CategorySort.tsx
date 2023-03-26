import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { SORT_OPTIONS } from 'data/Products';

interface CategorySortProps {
  setSortParams: (key: string, value: string) => void;
  deleteSortParams: (key: string) => void;
  sortParams: string | null;
  ascParams: string | null;
}

interface buttonProps {
  name: string;
  query: string;
}

const CategorySort = ({
  setSortParams,
  deleteSortParams,
  sortParams,
  ascParams,
}: CategorySortProps) => {
  const [activeButton, setActiveButton] = useState('Relevance');

  const clickedButtonHandler = ({ name, query }: buttonProps) => {
    if (name === 'Relevance') {
      setActiveButton(name);
      return deleteSortParams('sort');
    }
    setActiveButton(name);
    setSortParams('sort', query);
  };

  useEffect(() => {
    const combineParams = sortParams && ascParams ? sortParams + ascParams : '';

    let name = '';
    switch (combineParams) {
      case 'likesfalse':
        name = 'Most Popular';
        break;
      case 'registrationDatefalse':
        name = 'Newest';
        break;
      case 'pricetrue':
        name = 'Price: Low to High';
        break;
      case 'pricefalse':
        name = 'Price: High to Low';
        break;
      default:
        name = 'Relevance';
        break;
    }

    setActiveButton(name);
  }, []);

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {SORT_OPTIONS.map(({ name, query }) => (
            <Menu.Item key={name}>
              <button
                className={`block w-full px-4 py-2 text-sm 
                  hover:bg-gray-100 hover:text-gray-900
                ${
                  activeButton === name
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500'
                }`}
                onClick={() => {
                  clickedButtonHandler({ name, query });
                }}
              >
                {name}
              </button>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default CategorySort;

import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { FilterProps } from 'utils/interfaces';

interface SizeProps extends FilterProps {
  sizes: string[];
}

const SizeFilter = ({
  sizes,
  setSortParams,
  deleteSortParams,
  params,
  searchParams,
}: SizeProps) => {
  const [activeButton, setActiveButton] = useState('');

  const clickedButtonHandler = (name: string) => {
    if (name === activeButton) {
      setActiveButton('');
      deleteSortParams('sizes');
    } else {
      setActiveButton(name);
      setSortParams('sizes', name);
    }
  };

  useEffect(() => {
    setActiveButton(params ?? '');
  }, [searchParams]);

  return (
    <Disclosure.Panel className="pt-6">
      <div className="grid grid-cols-2 gap-2">
        {sizes.map((value) => {
          return (
            <div
              key={value}
              className="relative flex flex-col items-center justify-center"
              onClick={() => {
                clickedButtonHandler(value);
              }}
            >
              <button
                className={`h-9 w-full rounded-md border text-sm text-gray-600 ${
                  activeButton === value ? 'border-gray-900' : 'border-gray-300'
                }`}
              >
                {value}
              </button>
            </div>
          );
        })}
      </div>
    </Disclosure.Panel>
  );
};

export default SizeFilter;

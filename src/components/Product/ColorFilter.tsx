import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { BsCheckLg } from 'react-icons/bs';
import { FilterProps } from 'utils/interfaces';

interface ColorFilterProps extends FilterProps {
  colors: string[];
}

const ColorFilter = ({
  colors,
  setSortParams,
  deleteSortParams,
  params,
  searchParams,
}: ColorFilterProps) => {
  const [activeButton, setActiveButton] = useState('');

  const clickedButtonHandler = (name: string) => {
    if (name === activeButton) {
      setActiveButton('');
      deleteSortParams('color');
    } else {
      setActiveButton(name);
      setSortParams('color', name);
    }
  };

  useEffect(() => {
    setActiveButton(params ?? '');
  }, [searchParams]);

  return (
    <Disclosure.Panel className="pt-6">
      <div className="grid grid-cols-3 gap-y-4">
        {colors?.map((value) => {
          let color = '';
          switch (value) {
            case 'black':
              color = 'bg-black';
              break;
            case 'white':
              color = 'bg-white border-gray-300 border';
              break;
            case 'red':
              color = 'bg-red-500';
              break;
            default:
              color = 'bg-black';
              break;
          }
          return (
            <div
              key={value}
              className="relative flex h-[62px] flex-col items-center justify-center"
            >
              <button
                onClick={() => {
                  clickedButtonHandler(value);
                }}
                className="peer"
              >
                <div className={`${color} mx-auto h-8 w-8 rounded-full`} />
                <p className="mt-2">{value}</p>
              </button>
              <BsCheckLg
                className={`pointer-events-none absolute top-[9px] text-sm ${
                  value === 'white' ? 'text-gray-900' : 'text-white'
                } z-10 ${activeButton === value ? 'flex' : 'hidden'}`}
              />
            </div>
          );
        })}
      </div>
    </Disclosure.Panel>
  );
};

export default ColorFilter;

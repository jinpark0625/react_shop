import { SelectedProductType } from '../utils/interfaces';
import useCart from '../hooks/useCart';
import {
  ChevronDownIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ChangeEvent, useState } from 'react';

interface ProductProps {
  product: SelectedProductType;
}

export default function CartItem({
  product,
  product: { id, image, title, quantity, size, price },
}: ProductProps) {
  const { addOrUpdateItem, removeItem } = useCart();

  const [selected, SetSelected] = useState(quantity);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(e.target.value);
    SetSelected(quantity);
    addOrUpdateItem.mutate({ ...product, quantity });
  };

  const handleDelete = () => {
    removeItem.mutate(id);
  };

  return (
    <li className="flex justify-between border-t border-gray-200 py-5 ">
      <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-100 sm:h-[136px] sm:w-[136px] md:h-40 md:w-40">
        <LazyLoadImage
          src={image && Array.isArray(image) ? image[0] : image}
          alt={title}
          effect="blur"
          className="h-full w-auto transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
        />
      </div>
      <div className="ml-4 flex w-full flex-wrap md:grid md:grid-cols-3">
        <div className="w-full">
          <p className="text-lg">{title}</p>
          <p className="mt-1 text-sm text-gray-500">Size: {size}</p>
          <p className="mt-2 font-semibold">${price}</p>
        </div>
        <div className="mt-4 flex justify-end md:m-0">
          <div className="relative max-w-[66px]">
            <select
              value={selected}
              onChange={(e) => handleSelect(e)}
              className="relative w-full cursor-default appearance-none rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 sm:text-sm sm:leading-6"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-3 right-2 h-4 w-4 text-gray-300" />
          </div>
        </div>
        <div className="mt-4 ml-8  flex items-center justify-end md:m-0 md:items-start">
          <XMarkIcon
            onClick={handleDelete}
            className="hidden h-5 w-5 cursor-pointer text-gray-400  hover:text-gray-500 md:block "
          />
          <TrashIcon
            onClick={handleDelete}
            className="block h-5 w-5 cursor-pointer text-gray-400  hover:text-gray-500  md:hidden"
          />
        </div>
      </div>
    </li>
  );
}

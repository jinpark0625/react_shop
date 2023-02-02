// import { addOrUpdateToCart, removeFromCart } from '../api/firebase';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SelectedProductType } from '../utils/interfaces';
import useCart from '../hooks/useCart';

const ICON_CLASS =
  'hovber:text-brand mx-1 cursor-pointer transition-all hover:scale-105';

interface ProductProps {
  product: SelectedProductType;
}

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}: ProductProps) {
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    removeItem.mutate(id);
  };

  return (
    <li className="my-2 flex items-center justify-between">
      <img src={image} alt={title} className="w-24 rounded-lg md:w-48" />
      <div className="ml-4 flex flex-1 justify-between">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>${price}</p>
        </div>
        <div className="flex items-center  text-2xl">
          <AiOutlineMinusSquare onClick={handleMinus} className={ICON_CLASS} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} className={ICON_CLASS} />
          <RiDeleteBin5Fill onClick={handleDelete} className={ICON_CLASS} />
        </div>
      </div>
    </li>
  );
}

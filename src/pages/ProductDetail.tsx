import { useState, ChangeEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { SelectedProductType } from '../utils/interfaces';
import useCart from '../hooks/useCart';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toast';

const colors = [
  '#957570',
  '#a1a68e',
  '#bd7c4a',
  '#c2a56d',
  '#89a3b4',
  '#b294b0',
];

const ProductDetail = () => {
  const { state } = useLocation();

  if (!state.product) {
    return <div>Error : product not found.</div>;
  }

  const { ...contextData } = useAuthContext();
  const { user } = contextData;

  const { addOrUpdateItem } = useCart();

  const { id, image, title, description, category, price, options } =
    state.product;

  // const [success, setSuccess] = useState<string | null>(null);
  const [selected, setSelected] = useState(options?.[0]);
  const [bgColor, setBgColor] = useState<string>('#fff');

  useEffect(() => {
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value);

  const handleClick = () => {
    if (user === null) {
      toast.error('Oops! Login required to add to cart.', {
        backgroundColor: '#e60022',
      });
      return;
    }

    const product: SelectedProductType = {
      id,
      image,
      title,
      price,
      option: selected,
      quantity: 1,
    };

    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        toast.success('The product has been added successfully.', {
          backgroundColor: '#008000',
        });
      },
    });
  };

  return (
    <>
      <p className="m-auto  mt-4 max-w-screen-2xl text-gray-700">{category}</p>
      <section className="m-auto flex max-w-screen-2xl flex-col p-4 md:flex-row">
        <div
          className="mr-8 basis-6/12 rounded-3xl px-4"
          style={{ backgroundColor: bgColor }}
        >
          <img className="w-full" src={image} alt={title} />
        </div>
        <div className="flex w-full basis-6/12 flex-col p-4">
          <h2 className=" py-2 text-3xl font-bold">{title}</h2>
          <p className="border-b border-gray-400 py-2 text-2xl font-bold">
            ${price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="mb-4 flex items-center">
            <label htmlFor="select" className="font-bold text-brand">
              Options :
            </label>
            <select
              className="m-4 flex-1 border-2 border-dashed border-brand p-2 outline-none"
              onChange={handleSelect}
              value={selected}
              id="select"
            >
              {options?.map((option: string, index: number) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          {/* {success && <p className="my-2">{success}</p>} */}
          <Button text="Add cart" onClick={handleClick} />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;

import { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';

const ProductDetail = () => {
  const { state } = useLocation();

  if (!state.product) {
    return <div>Error : product not found.</div>;
  }

  const { image, title, description, category, price, options } = state.product;

  const [selected, setSelected] = useState(options?.[0]);
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setSelected(e.target.value);

  const handleClick = () => {
    // 여기서 장바구니에 추가하면됨
  };

  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col p-4 md:flex-row">
        <img className="w-full basis-7/12 px-4" src={image} alt={title} />
        <div className="flex w-full basis-5/12 flex-col p-4">
          <h2 className=" py-2 text-3xl font-bold">{title}</h2>
          <p className="border-b border-gray-400 py-2 text-2xl font-bold">
            ${price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label htmlFor="select" className="font-bold text-brand">
              옵션 :
            </label>
            {/* List item이 변경되거나 수정되면 절대로 index를 사용하지않는다. 하지만 변경이 없을때는 괜찮다. */}
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
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;

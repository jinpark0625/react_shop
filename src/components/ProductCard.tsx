import { useNavigate } from 'react-router-dom';
import { ProductType } from '../utils/interfaces';
import { useState, useEffect } from 'react';

interface ProductProps {
  product: ProductType;
}

const colors = [
  '#957570',
  '#a1a68e',
  '#bd7c4a',
  '#c2a56d',
  '#89a3b4',
  '#b294b0',
];

export default function ProductCard({
  product,
  product: { id, image, title, category, price },
}: ProductProps) {
  const navigate = useNavigate();

  const [bgColor, setBgColor] = useState<string>('#fff');

  useEffect(() => {
    setBgColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  return (
    <li
      onClick={() => {
        navigate(`/products/${id ?? 404}`, { state: { product } });
      }}
      className="cursor-pointer overflow-hidden rounded-3xl shadow-md transition-all hover:scale-105"
    >
      <div style={{ backgroundColor: bgColor }}>
        <img src={image} alt={title} className="w-full"></img>
      </div>
      <h3 className="truncate px-6 pt-6 pb-4 text-xl font-bold">{title}</h3>

      <div className=" flex items-center justify-between px-6 pb-6 text-lg">
        <p className="text-lg font-bold">{`$ ${price}`}</p>
        <p className="mb-2 text-gray-600">{category}</p>
      </div>
    </li>
  );
}

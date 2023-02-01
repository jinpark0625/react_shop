import { ProductType } from 'utils/interfaces';

interface ProductProps {
  product: ProductType;
}

export default function ProductCard({
  product: { id, image, title, category, price },
}: ProductProps) {
  return (
    <li className="cursor-pointer overflow-hidden rounded-lg shadow-md">
      <img src={image} alt={title} className="w-full"></img>
      <div className="mt-2 flex items-center justify-between px-2 text-lg">
        <h3 className="truncate">{title}</h3>
        <p>{`$${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
}

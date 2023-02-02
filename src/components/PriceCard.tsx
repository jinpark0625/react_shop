interface PriceProps {
  text: string;
  price?: number;
}

export default function PriceCard({ text, price }: PriceProps) {
  return (
    <div className="mx-2 rounded-2xl bg-gray-50 p-8 text-center text-lg md:text-xl">
      <p>{text}</p>
      <p className="text-xl font-bold text-brand md:text-2xl">${price}</p>
    </div>
  );
}

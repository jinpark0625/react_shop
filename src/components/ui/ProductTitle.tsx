interface TitleType {
  title: string;
  className?: string;
}

const ProductTitle = ({ title, className }: TitleType) => {
  return (
    <h1
      className={`text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl ${
        className ?? ''
      }`}
    >
      {title}
    </h1>
  );
};

export default ProductTitle;

import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IProps {
  image: string;
  title: string;
}

export default function NftCard({ image, title }: IProps) {
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 pt-[100%]">
        <div
          className="absolute 
      inset-0 translate-x-1/2
      translate-y-1/2
      "
        >
          <LazyLoadImage
            src={image}
            alt={title}
            effect="blur"
            className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:opacity-75"
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-center text-lg font-bold text-gray-900">{title}</h3>
      </div>
    </>
  );
}

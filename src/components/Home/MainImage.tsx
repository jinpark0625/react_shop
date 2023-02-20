import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ClockIcon } from '@heroicons/react/24/outline';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import { SiEthereum } from 'react-icons/si';

interface ImageProps {
  name: string;
  price: number;
  time: string;
  image: string;
  rotation?: string;
  scale?: string;
  direction?: string;
  zIndex?: string;
}

export default function MainImage({
  name,
  price,
  time,
  image,
  rotation,
  scale,
  direction,
  zIndex,
}: ImageProps) {
  return (
    <div
      className={`absolute w-[260px] rounded-2xl bg-white p-4 shadow-lg sm:w-[320px] 
        ${direction ?? ''}
        ${rotation ?? ''}
        ${scale ?? ''}
        ${zIndex ?? ''}
        `}
    >
      <LazyLoadImage
        src={image}
        width={600}
        height={400}
        placeholder={<ImagePlaceholder />}
        alt="Image Alt"
        className="
        rounded-2xl
        "
      />
      <div className="pt-4 pb-2">
        <h3 className="border-b border-gray-200 pb-4 text-lg font-bold text-gray-900">
          {name}
        </h3>
        <div className="flex items-end justify-between pt-4">
          <div className="relative rounded-lg border-2 border-violet-500 px-2 py-1">
            <span className="absolute -top-3 bg-white px-2 text-xs text-violet-400">
              Price
            </span>
            <p className=" flex items-center text-lg font-bold text-violet-500">
              <SiEthereum className="mr-1" />
              {price}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Time Remaining</span>
            <p className="mt-1 flex items-center justify-end">
              <ClockIcon className="mr-2 h-4 w-4" />
              {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

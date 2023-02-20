import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImagePlaceholder from '../ui/ImagePlaceholder';

interface IProps {
  image: string;
  position: string;
  background: string;
  size: number;
}

export default function IntroImage({
  image,
  position,
  background,
  size,
}: IProps) {
  return (
    <div className={`absolute ${position}`}>
      <div
        className={`relative inline-block after:absolute after:left-[-5px] after:bottom-[-5px] after:block after:h-full after:w-full after:rounded-full ${background}`}
      >
        <LazyLoadImage
          src={image}
          width={size}
          height={size}
          placeholder={<ImagePlaceholder />}
          alt="Image Alt"
          className="
      relative
      z-10
      rounded-full
      "
        />
      </div>
    </div>
  );
}

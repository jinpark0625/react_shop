import { useState, forwardRef, useEffect } from 'react';
import { FILE_SIZE_MAX_LIMIT, IMAGE_INPUT_CLASS } from 'data/Auth/authData';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  watchImage: FileList | null;
  showError: () => void;
  initiateImage: () => void;
  clearError: () => void;
}

const ImageInput = forwardRef<HTMLInputElement, IProps>(
  (
    { error, watchImage, showError, initiateImage, clearError, ...props },
    ref,
  ) => {
    const [photoURL, setPhotoURL] = useState('/images/default_image.webp');

    useEffect(() => {
      if (watchImage && watchImage.length > 0) {
        const file = watchImage[0];
        if (file.size > FILE_SIZE_MAX_LIMIT) {
          showError();
          initiateImage();
        } else {
          setPhotoURL(URL.createObjectURL(file));
          clearError();
        }
      }
    }, [watchImage]);

    return (
      <div className="mb-10  flex-col">
        <div className="flex ">
          <div className="shrink-0">
            <img
              className="h-[58px] w-[58px] rounded-l-lg object-cover"
              src={photoURL}
              alt="Current profile photo"
            />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              ref={ref}
              {...props}
              type="file"
              className={`${
                error
                  ? `border-red-500 ${IMAGE_INPUT_CLASS}`
                  : IMAGE_INPUT_CLASS
              }`}
              accept="image/png,image/jpeg,image/jpg,image/webp"
            />
          </label>
        </div>
        <div className="flex flex-col">
          <small className="mt-1 text-slate-500" id="file_input_help">
            JPG, PNG, or WEBP (MAX. 2MB).
          </small>
          {error && (
            <small
              role="alert"
              className={`${error ? 'animate-shake' : ''} text-red-500`}
            >
              {error}
            </small>
          )}
        </div>
      </div>
    );
  },
);

ImageInput.displayName = 'ImageInput';

export default ImageInput;

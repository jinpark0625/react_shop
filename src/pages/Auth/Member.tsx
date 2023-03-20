import { useAuthContext } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import ProductTitle from 'components/ui/ProductTitle';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import { useForm } from 'react-hook-form';
import PasswordModal from 'components/Auth/PasswordModal';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import useUser from 'hooks/useUser';
import { FILE_SIZE_MAX_LIMIT } from 'data/Auth/authData';
import Loading from 'components/ui/Loading';
import MemberLoading from 'components/Auth/MemberLoading';
import ProfileUpdateAlert from 'components/Auth/ProfileUpdateAlert';

interface FormType {
  image: FileList | null;
  name: string;
  currentPassword: string;
  email: string;
}

const Memeber = () => {
  const { ...contextData } = useAuthContext();
  const { user, loading } = contextData;

  const [updated, setUpdated] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
    setError,
    setValue,
    clearErrors,
  } = useForm<FormType>({
    mode: 'onSubmit',
    defaultValues: {
      image: null,
      name: '',
      currentPassword: '*******',
    },
  });

  const { editAccount, editPasswordQuery } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    const { name, image } = data;
    setUpdated(false);
    setUpdateError(false);

    await editAccount.mutateAsync(
      { name, image },
      {
        onSuccess: () => {
          setUpdated(true);
        },
        onError: () => {
          return setUpdateError(true);
        },
      },
    );
  });

  const onSubmitPassword = async (
    currentPassword: string,
    password: string,
  ) => {
    setPasswordUpdated(false);
    setUpdateError(false);
    const email = user?.email ?? '';

    await editPasswordQuery.mutateAsync(
      {
        email,
        currentPassword,
        password,
      },
      {
        onSuccess: () => {
          setPasswordUpdated(true);
        },
      },
    );
  };

  useEffect(() => {
    if (user) {
      setValue('name', user.displayName ?? '');
      const userImage =
        user.photoURL === 'default'
          ? '/images/default_image.webp'
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            user.photoURL!;
      setPhotoURL(userImage);
    }
  }, [user]);

  const changePassword = () => {
    if (user?.emailVerified) {
      return setError('currentPassword', {
        message:
          'You cannot change your password while signed in with your Google account. ',
      });
    }
    setPasswordUpdated(false);
    setUpdated(false);
    setOpen(true);
  };

  /**
   * Image error control
   */

  const watchImage = watch('image');

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];

      if (file.size > FILE_SIZE_MAX_LIMIT) {
        setError('image', {
          message: 'The file is too large. Allowed maximum size is 2MB',
        });
        setValue('image', null);
      } else {
        setPhotoURL(URL.createObjectURL(file));
        clearErrors('image');
      }
    }
  }, [watchImage]);

  return (
    <>
      {(editAccount.isLoading || editPasswordQuery.isLoading) && <Loading />}

      {open && (
        <PasswordModal
          open={open}
          setOpen={setOpen}
          title="Edit Password"
          content={
            "To access this feature, you'll need to log in. \n Don't have an account yet? Sign up now!"
          }
          IdentificationIcon={LockClosedIcon}
          bg="bg-violet-100"
          color="text-violet-500"
          user={user?.email}
          onClick={onSubmitPassword}
          passwordUpdated={passwordUpdated}
        />
      )}

      <main className="mx-auto mb-32 w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-gray-200 pb-6">
          <ProductTitle title="Account Details" />
        </div>
        <div className="mx-auto mt-14 max-w-sm">
          {loading && <MemberLoading />}

          <ProfileUpdateAlert updated={updated} updateError={updateError} />

          {user && (
            <form onSubmit={onSubmit}>
              <div className="mb-6 flex flex-wrap items-center">
                <img
                  className="inline-block h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
                  src={photoURL}
                  alt="User image"
                />
                <input
                  {...register('image')}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  id="image"
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="ml-5 rounded-md border border-violet-500 bg-white py-1.5 px-2.5 text-sm font-semibold text-violet-500 shadow-sm transition-all hover:shadow-violet-500"
                >
                  Change
                </label>
                {errors?.image && (
                  <small
                    role="alert"
                    className={`${
                      errors?.image?.message ? 'animate-shake' : ''
                    } mt-2 w-full text-red-500`}
                  >
                    {errors?.image?.message}
                  </small>
                )}
              </div>
              <Input
                labelText="Email"
                type="email"
                className="mb-6"
                value={user.email ?? ''}
                disabled
              />
              <Input
                {...register('name')}
                labelText="User Name"
                type="text"
                className="mb-6"
              />
              <div className="relative">
                <Input
                  {...register('currentPassword')}
                  error={errors.currentPassword?.message}
                  ariaInvalid={isDirty}
                  labelText="Password"
                  type="password"
                  className="mb-8"
                  disabled
                  autoComplete="off"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    changePassword();
                  }}
                  className={`absolute ${
                    errors?.currentPassword ? 'top-7' : 'top-1/2'
                  } right-6 -translate-y-1/2 text-sm font-semibold text-violet-500`}
                >
                  Edit
                </button>
              </div>
              <Button
                text="Save"
                disabled={isSubmitting || !isDirty}
                className={`w-full rounded-lg py-4 font-semibold transition-all
                  ${
                    isDirty
                      ? 'bg-violet-500 text-white hover:bg-violet-600'
                      : 'border border-violet-200 bg-gray-50 text-gray-500 '
                  }
                
               `}
              />
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default Memeber;

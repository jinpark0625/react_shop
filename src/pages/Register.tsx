import Button from 'components/ui/Button';
import { useForm } from 'react-hook-form';
import Input from 'components/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import { AccountInputs } from 'utils/interfaces';
import ImageInput from '../components/ui/ImageInput';
import Loading from '../components/ui/Loading';
import useUser from '../hooks/useUser';
import AuthImageContainer from 'components/ui/AuthImageContainer';

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<AccountInputs>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      image: null,
    },
  });

  const { signUpQuery } = useUser();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const { email, name, password, image } = data;

    signUpQuery.mutate(
      { email, name, password, image },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: (err) => {
          if (String(err).indexOf('email-already-in-use')) {
            setError(
              'email',
              { message: 'A user with that email already exists.' },
              { shouldFocus: true },
            );
          }
        },
      },
    );
  });

  /**
   * Image error control
   */
  const showError = () => {
    setError('image', {
      message: 'The file is too large. Allowed maximum size is 2MB',
    });
  };

  const initiateImage = () => {
    setValue('image', null);
  };

  const clearError = () => {
    clearErrors('image');
  };

  const watchImage = watch('image');

  return (
    <section className="m-auto flex h-[calc(100vh-88px)]  items-center">
      {signUpQuery.isLoading && <Loading />}
      <div className="flex h-full w-2/5 grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Get started</h2>
          <p className="text-slate-500">Create your account now.</p>
        </div>
        <div className="flex flex-col items-center">
          <form className="flex w-full max-w-sm flex-col" onSubmit={onSubmit}>
            <Input
              {...register('email', {
                required: 'Please provide an email.',
                pattern: {
                  value: EMAIL_REGEX,
                  message:
                    'Please providew a properly formatted email address.',
                },
              })}
              error={errors.email?.message}
              ariaInvalid={isDirty}
              labelText="Email"
              type="email"
              className="mb-3"
            />

            <Input
              {...register('name', {
                required: 'Please provide a name.',
                maxLength: {
                  value: 20,
                  message: 'Name needs to be between 1 to 20 characters.',
                },
              })}
              error={errors.name?.message}
              ariaInvalid={isDirty}
              labelText="Name"
              type="text"
              className="mb-3"
            />

            <Input
              {...register('password', {
                required: 'Please provide a password.',
                minLength: {
                  value: 6,
                  message: 'Password needs to be between 6 to 20 characters.',
                },
                maxLength: {
                  value: 20,
                  message: 'Password needs to be between 6 to 20 characters.',
                },
              })}
              error={errors.password?.message}
              ariaInvalid={isDirty}
              labelText="Password"
              type="password"
              className="mb-3"
            />

            <Input
              {...register('confirmPassword', {
                required: 'Please provide a confirm password.',
                minLength: {
                  value: 6,
                  message: 'Password needs to be between 6 to 20 characters.',
                },
                maxLength: {
                  value: 20,
                  message: 'Password needs to be between 6 to 20 characters.',
                },
              })}
              error={errors.confirmPassword?.message}
              ariaInvalid={isDirty}
              labelText="Confirm Password"
              type="password"
              className="mb-3"
            />
            <ImageInput
              {...register('image')}
              error={errors.image?.message}
              watchImage={watchImage}
              showError={showError}
              initiateImage={initiateImage}
              clearError={clearError}
            />
            <Button
              text="Create account"
              disabled={isSubmitting}
              className="rounded-lg bg-sky-500 py-4 hover:bg-sky-600 hover:shadow-md hover:shadow-sky-500"
            />
          </form>
          <div className="mt-10 text-slate-500">
            Already have an account?
            <Link to="/login" className="p-2 text-sky-500">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <AuthImageContainer
        image="/images/register.webp"
        register
        firstText="Unlock the Shopping World,"
        secondText="Register Today"
      />
    </section>
  );
}

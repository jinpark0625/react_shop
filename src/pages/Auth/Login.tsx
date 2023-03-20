import Button from 'components/ui/Button';
import { useForm } from 'react-hook-form';
import Input from 'components/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Loading from '../../components/ui/Loading';
import useUser from '../../hooks/useUser';
import AuthImageContainer from 'components/ui/AuthImageContainer';
import { EMAIL_REGEX } from 'data/Auth/authData';

interface IProps {
  email: string;
  password: string;
}

export default function Login() {
  const { loginQuery, loginGoogleQuery } = useUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<IProps>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const googleLogin = () => {
    loginGoogleQuery.mutate(undefined, {
      onSuccess: () => {
        navigate('/', { replace: true });
      },
      onError: (err) => {
        if (String(err).indexOf('wrong-password')) {
          setError(
            'password',
            {
              message:
                'An unexpected error occurred. Please try loggin in again.',
            },
            { shouldFocus: true },
          );
        }
      },
    });
  };

  const submit = (data: IProps) => {
    const { email, password } = data;

    loginQuery.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: (err) => {
          if (String(err).includes('wrong-password')) {
            setError(
              'password',
              { message: 'Username or password did not match.' },
              { shouldFocus: true },
            );
          } else if (String(err).includes('auth/too-many-requests')) {
            setError(
              'password',
              {
                message:
                  'Your account has been temporarily disabled due to many failed login attempts.',
              },
              { shouldFocus: true },
            );
          }
        },
      },
    );
  };

  return (
    <section className="m-auto grid min-h-[calc(100vh-65px)] w-full grid-cols-10">
      {loginQuery.isLoading && <Loading />}
      <div className="col-span-10 flex h-full w-full grow flex-col items-center justify-center bg-white shadow-slate-50 drop-shadow-md lg:col-span-4">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Hello Again!</h2>
          <p className="text-slate-500">
            Welcome back! Please enter your detail.
          </p>
        </div>
        <div className="flex w-full flex-col items-center">
          <form
            className="flex w-full max-w-sm flex-col"
            onSubmit={handleSubmit((data) => submit(data))}
          >
            <Input
              {...register('email', {
                required: 'Please provide an email',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Please providew a properly formatted email address',
                },
              })}
              error={errors.email?.message}
              ariaInvalid={isDirty}
              labelText="Email"
              type="email"
              className="mb-3"
              autofocus
              autocomplete="on"
            />

            <Input
              {...register('password', {
                required: 'Please provide a password',
                minLength: {
                  value: 6,
                  message: 'Password needs to be between 6 to 20 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Password needs to be between 6 to 20 characters',
                },
              })}
              error={errors.password?.message}
              ariaInvalid={isDirty}
              labelText="Password"
              type="password"
              className="mb-10"
              autocomplete="off"
            />

            <Button
              text="Login"
              disabled={isSubmitting}
              className="rounded-lg bg-violet-500 py-4 font-semibold text-white hover:bg-violet-600"
            />
          </form>
          <Button
            text="Sign with Google"
            onClick={googleLogin}
            icon={() => <FcGoogle className="mr-2 text-2xl" />}
            className="mt-6 w-full max-w-sm rounded-lg border border-gray-300 bg-white py-4 font-semibold text-slate-500  hover:bg-gray-50"
          />
          <div className="mt-10 text-slate-500">
            Don&#39;t have an account yet?
            <Link to="/register" className="p-2 font-semibold text-violet-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <AuthImageContainer
        image="/images/login.webp"
        firstText="Shop Smarter,"
        secondText="Login Here"
      />
    </section>
  );
}

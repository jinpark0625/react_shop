import Button from 'components/ui/Button';
import { useForm } from 'react-hook-form';
import Input from 'components/ui/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import Loading from '../components/ui/Loading';
import useUser from '../hooks/useUser';

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

interface IProps {
  email: string;
  password: string;
}

export default function Login() {
  const { ...contextData } = useAuthContext();
  const { login } = contextData;

  const { loginQuery } = useUser();

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

  const submit = (data: IProps) => {
    const { email, password } = data;

    loginQuery.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: (err) => {
          if (String(err).indexOf('wrong-password')) {
            setError(
              'password',
              { message: 'Username or password did not match.' },
              { shouldFocus: true },
            );
          }
        },
      },
    );
  };

  return (
    <section className="m-auto flex h-[calc(100vh-88px)]  items-center">
      {loginQuery.isLoading && <Loading />}
      <div className="w-2/5 grow flex-col items-center">
        <div className="mb-14 flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold">Hello Again!</h2>
          <p className="text-slate-500">
            Welcome back! Please enter your detail.
          </p>
        </div>
        <div className="flex flex-col items-center">
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
            />

            <Button
              text="Login"
              disabled={isSubmitting}
              className="rounded-lg bg-neutral-800 py-4 px-4"
            />
          </form>
          <Button
            text="Sign with Google"
            onClick={login}
            icon={() => <FcGoogle className="mr-2 text-2xl" />}
            className="mt-6 w-full max-w-sm rounded-lg border border-gray-300 py-4 px-4 text-slate-500"
          />
          <div className="mt-10 text-slate-500">
            Don&#39;t have an account yet?
            <Link to="/register" className="p-2 text-zinc-900">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden h-full w-3/5 p-4 lg:block">
        <div className="h-full rounded-3xl bg-login bg-cover"></div>
      </div>
    </section>
  );
}

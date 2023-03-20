import {
  Fragment,
  Dispatch,
  SetStateAction,
  ForwardRefExoticComponent,
  SVGProps,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/ui/Button';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Input from 'components/ui/Input';
import { useForm } from 'react-hook-form';

interface ModalProps {
  title: string;
  content: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  IdentificationIcon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  bg: string;
  color: string;
  user?: string | null;
  onClick: (currentPassword: string, password: string) => Promise<void>;
  passwordUpdated: boolean;
}

interface FormProps {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const PasswordModal = ({
  title,
  content,
  open,
  setOpen,
  IdentificationIcon,
  bg,
  color,
  user,
  onClick,
  passwordUpdated,
  ...props
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    formState: { errors },
    setError,
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    const { currentPassword, password } = data;

    if (currentPassword === password) {
      return setError(
        'currentPassword',
        {
          message: 'Your new password cannot be the same as old password.',
        },
        { shouldFocus: true },
      );
    }

    onClick(currentPassword, password)
      .then((res) => res)
      .catch((e) => {
        if (e.message.includes('auth/wrong-password')) {
          return setError(
            'currentPassword',
            { message: 'Your current password is incorrect.' },
            { shouldFocus: true },
          );
        } else if (e.message.includes('auth/too-many-requests')) {
          return setError(
            'currentPassword',
            {
              message:
                'Your account has been temporarily disabled due to many failed login attempts.',
            },
            { shouldFocus: true },
          );
        }
      });
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:pb-4">
                <div className="relative mb-6 flex flex-col items-center pt-6">
                  <div
                    className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${bg} sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <IdentificationIcon
                      className={`h-6 w-6 ${color}`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="mt-6 text-xl font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                  <button
                    className="absolute top-0 right-0 h-8 w-8"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="m-auto h-6 w-6" />
                  </button>
                </div>
                {passwordUpdated && (
                  <div className="mb-3 flex rounded-lg border border-green-500 bg-green-50 p-4 text-sm font-medium text-green-500">
                    <CheckCircleIcon className="mr-2 inline-block h-5 w-5" />
                    Your password has been successfully updated.
                  </div>
                )}
                <form onSubmit={onSubmit}>
                  <div className="text-left">
                    <Input
                      {...register('currentPassword', {
                        required: 'Please provide a current password.',
                        minLength: {
                          value: 6,
                          message:
                            'Password needs to be between 6 to 20 characters.',
                        },
                        maxLength: {
                          value: 20,
                          message:
                            'Password needs to be between 6 to 20 characters.',
                        },
                      })}
                      error={errors.currentPassword?.message}
                      labelText="Current Password"
                      type="password"
                      className="mb-3"
                      autofocus
                      autocomplete="off"
                    />
                    <Input
                      {...register('password', {
                        required: 'Please provide a new password.',
                        minLength: {
                          value: 6,
                          message:
                            'Password needs to be between 6 to 20 characters.',
                        },
                        maxLength: {
                          value: 20,
                          message:
                            'Password needs to be between 6 to 20 characters.',
                        },
                      })}
                      error={errors.password?.message}
                      labelText="New Password"
                      type="password"
                      className="mb-3"
                      autocomplete="off"
                    />
                    <Input
                      {...register('confirmPassword', {
                        required: 'Please provide a confirm new password.',
                        minLength: {
                          value: 6,
                          message:
                            'Password needs to be between 6 to 20 characters.',
                        },
                        maxLength: {
                          value: 20,
                          message:
                            'Password needs to be between 6 to 20 characters.',
                        },
                        validate: (val: string) => {
                          if (watch('password') !== val) {
                            return 'Please make sure your passwords match.';
                          }
                        },
                      })}
                      error={errors.confirmPassword?.message}
                      labelText="Confirm New Password"
                      type="password"
                      className="mb-4"
                      autocomplete="off"
                    />
                  </div>
                  <div className="mb-6 text-left text-sm">
                    <p className="mb-2">Password requirements:</p>
                    <ul className="text-gray-600">
                      <li
                        className={`${
                          watch('password').length === 0
                            ? 'text-gray-500'
                            : watch('password').length >= 6 &&
                              watch('confirmPassword').length >= 6
                            ? 'text-green-500'
                            : 'text-red-500'
                        } mb-1`}
                      >
                        - Minimum of 6 characters
                      </li>
                      <li
                        className={`${
                          watch('password').length === 0
                            ? 'text-gray-500'
                            : watch('password').length > 20 &&
                              watch('confirmPassword').length > 20
                            ? 'text-red-500'
                            : 'text-green-500'
                        }`}
                      >
                        - Maximum of 20 characters
                      </li>
                    </ul>
                  </div>
                  <div className="my-3 w-full py-3">
                    <Button
                      text="Save"
                      disabled={isSubmitting}
                      className="h-[44px] w-full justify-center rounded-md bg-violet-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-600"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PasswordModal;

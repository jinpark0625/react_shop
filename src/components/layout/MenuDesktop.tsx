import { Popover, Transition } from '@headlessui/react';
import { Fragment, Dispatch, SetStateAction, forwardRef } from 'react';
import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon,
  ShoppingBagIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { headerData } from 'data/layout/layoutData';
import { Link, NavigateFunction } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { User as UserProps } from 'firebase/auth';
import User from 'components/User';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import CartStatus from '../CartStatus';
import Logo from '../ui/Logo';

interface menuProps {
  classNames: (...classes: string[]) => string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
  userData?: (UserProps & { isAdmin?: boolean }) | null;
  loading: boolean;
  logout: () => void;
  isAdmin: boolean | undefined;
  onMouseEnter: (open: boolean) => void;
  onMouseLeave: (open: boolean) => void;
}

const MenuDesktop = forwardRef<HTMLButtonElement, menuProps>(
  (
    {
      classNames,
      setOpen,
      userData,
      navigate,
      loading,
      logout,
      isAdmin,
      onMouseEnter,
      onMouseLeave,
    },
    ref,
  ) => {
    return (
      <nav className="relative bg-white">
        <div
          aria-label="Top"
          className="mx-auto max-w-7xl border-gray-200 bg-white px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 items-center">
            {/* Mobile hamburger menu */}
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to="/" className="flex items-center">
                <Logo width="40px" />
              </Link>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {headerData.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'border-violet-500 text-violet-500'
                                : 'border-transparent text-gray-700 hover:text-gray-800',
                              'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out  focus:outline-none ',
                            )}
                          >
                            {category.name}
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute inset-x-0 top-full border-t-[1px] border-gray-200 text-sm text-gray-500">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <div className=" overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                          <LazyLoadImage
                                            src={item.imageSrc}
                                            effect="blur"
                                            alt={item.imageAlt}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <Popover.Button
                                          onClick={() => navigate(item.href)}
                                          className="mt-6 block font-medium text-gray-900"
                                        >
                                          <span
                                            className="absolute inset-0 z-10"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                        </Popover.Button>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <Popover.Button
                                          id={`${section.name}-heading`}
                                          className="cursor-pointer font-medium text-gray-900"
                                          onClick={() => navigate(section.href)}
                                        >
                                          {section.name}
                                        </Popover.Button>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <Popover.Button
                                                onClick={() =>
                                                  navigate(item.href)
                                                }
                                                className="hover:text-gray-800"
                                              >
                                                {item.name}
                                              </Popover.Button>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}
                {headerData.pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/products/new"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    New Item
                  </Link>
                )}
              </div>
            </Popover.Group>

            {/* Auth & cart menus */}
            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <div className="hidden items-center justify-end md:flex md:flex-1">
                  {loading && !userData && (
                    <LoadingSkeleton className="h-10 w-10 animate-pulse rounded-md bg-gray-200" />
                  )}
                  {userData && (
                    <div className="flex items-center">
                      <Popover className="relative hidden leading-3 md:block">
                        {({ open }) => (
                          <>
                            <div onMouseLeave={onMouseLeave.bind(null, open)}>
                              <Popover.Button
                                className={classNames(
                                  open ? 'text-gray-900' : 'text-gray-500',
                                  'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none ',
                                )}
                                ref={ref}
                                onMouseEnter={onMouseEnter.bind(null, open)}
                                onMouseLeave={onMouseLeave.bind(null, open)}
                              >
                                <User
                                  displayName={userData.displayName}
                                  photoURL={userData.photoURL}
                                  mobile={false}
                                />
                              </Popover.Button>

                              {/* More menus */}
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-32 z-50 mt-0 w-[250px] max-w-sm -translate-x-1/2 px-4 pt-3 sm:px-0 lg:max-w-3xl">
                                  <div
                                    className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
                                    onMouseEnter={onMouseEnter.bind(null, open)}
                                    onMouseLeave={onMouseLeave.bind(null, open)}
                                  >
                                    <div className="relative grid  bg-white ">
                                      <div className="p-4">
                                        <Popover.Button
                                          onClick={() => navigate('/member')}
                                          className="flex w-full items-center rounded-lg p-3 hover:bg-gray-50"
                                        >
                                          <PencilSquareIcon className="h-4 w-4" />
                                          <p className="ml-3 text-base font-medium text-gray-900">
                                            Edit Profile
                                          </p>
                                        </Popover.Button>
                                        <Popover.Button
                                          onClick={() => navigate('/orders')}
                                          className="flex w-full items-center rounded-lg p-3 hover:bg-gray-50"
                                        >
                                          <ClockIcon className="h-4 w-4" />
                                          <p className="ml-3 text-base font-medium text-gray-900">
                                            Order History
                                          </p>
                                        </Popover.Button>
                                      </div>
                                    </div>
                                    <div className="flex items-center bg-gray-50 py-4 px-8">
                                      <Popover.Button
                                        className="flex items-center text-sm font-medium text-violet-500 hover:text-violet-600"
                                        onClick={logout}
                                      >
                                        <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                                        <p className="ml-3 text-base font-medium text-violet-500">
                                          Sign out
                                        </p>
                                      </Popover.Button>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Popover>
                    </div>
                  )}
                </div>
                {!loading && !userData && (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
              <div className="hidden lg:ml-8 lg:flex">
                <img
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt=""
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-sm font-medium text-gray-800">
                  CAD
                </span>
              </div>
              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link to="/carts" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <CartStatus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  },
);

MenuDesktop.displayName = 'MenuDesktop';

export default MenuDesktop;

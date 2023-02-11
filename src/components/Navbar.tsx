import { Link, useNavigate } from 'react-router-dom';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  FolderPlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import CartStatus from './CartStatus';

const menuMobileLinks = [
  {
    name: 'Cart',
    icon: ShoppingCartIcon,
    link: '/carts',
  },
  {
    name: 'Order History',
    icon: ClockIcon,
    link: '/',
  },
  {
    name: 'Edit Profile',
    icon: UserIcon,
    link: '/',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const EditButton = () => {
  return (
    <Popover.Button className="flex items-center justify-center rounded-md border border-transparent bg-sky-500 px-4  py-2 text-base font-medium text-white shadow-sm transition-all hover:bg-sky-600">
      Edit Profile
    </Popover.Button>
  );
};

export default function Navbar() {
  const { ...contextData } = useAuthContext();
  const { user, loading } = contextData;
  const { logOutQuery } = useUser();

  const userData = user ?? null;
  const isAdmin = userData?.isAdmin;

  const navigate = useNavigate();

  const logout = () => {
    logOutQuery.mutate();
  };

  return (
    <Popover className="relative border-b-2 border-gray-100 bg-white ">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="logo"
              />
            </Link>
          </div>
          {/* mobile hamburger */}
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          {/* desktop menus */}
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {isAdmin && (
              <Popover.Button
                onClick={() => navigate('/products/new')}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                New Item
              </Popover.Button>
            )}
            <Popover.Button
              onClick={() => navigate('/products')}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Products
            </Popover.Button>
          </Popover.Group>
          {/* Sign in */}
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {loading && !userData && (
              <div className="flex animate-pulse space-x-4">
                <div className="h-10 w-20 rounded-md bg-gray-200"></div>
              </div>
            )}
            {userData && (
              <div className="flex items-center">
                <Link to="/carts">
                  <CartStatus />
                </Link>
                <Popover className="relative hidden md:block lg:w-[40px]">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none ',
                        )}
                      >
                        <img
                          className="h-10 w-10 rounded-full border border-gray-300"
                          src={
                            userData.photoURL === 'default' ||
                            !userData.photoURL
                              ? '/images/default_image.webp'
                              : userData.photoURL
                          }
                          alt={userData.displayName ?? 'Anonymous'}
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
                        <Popover.Panel className="absolute right-1 z-10 mt-3 w-screen max-w-md px-2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                            <div className="relative grid  bg-white ">
                              <User
                                displayName={userData.displayName}
                                photoURL={userData.photoURL}
                                EditButton={EditButton}
                              />
                              <div className="px-5 py-6 sm:p-8">
                                <Popover.Button
                                  onClick={() => navigate('/')}
                                  className="-m-3 flex w-full items-center rounded-lg p-3 hover:bg-gray-50"
                                >
                                  <ClockIcon className="h-4 w-4" />
                                  <p className="ml-3 text-base font-medium text-gray-900">
                                    Order History
                                  </p>
                                </Popover.Button>
                              </div>
                            </div>
                            <div className="flex items-center bg-gray-50 px-5 py-6 sm:p-8">
                              <Popover.Button
                                className="flex items-center text-sm font-medium text-sky-500 hover:text-sky-600"
                                onClick={logout}
                              >
                                <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                                <p className="ml-3 text-base font-medium text-sky-500">
                                  Sign out
                                </p>
                              </Popover.Button>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            )}
            {!loading && !userData && (
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-sky-500 px-4 py-2 text-base font-medium text-white shadow-sm transition-all hover:bg-sky-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile popover */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right p-2 transition md:hidden"
        >
          <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 ">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {isAdmin && (
                    <Popover.Button
                      onClick={() => navigate('/products/new')}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <FolderPlusIcon className="h-4 w-4" />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        New Item
                      </span>
                    </Popover.Button>
                  )}
                  <Popover.Button
                    onClick={() => navigate('/products')}
                    className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                  >
                    <ShoppingBagIcon className="h-4 w-4" />
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Products
                    </span>
                  </Popover.Button>
                </nav>
              </div>
            </div>
            <div>
              {userData && (
                <>
                  <User
                    displayName={userData.displayName}
                    photoURL={userData.photoURL}
                  />
                  <div className="py-6 px-5">
                    <nav className="grid gap-y-8">
                      {menuMobileLinks.map((menu) => (
                        <Popover.Button
                          key={menu.name}
                          onClick={() => navigate(`${menu.link}`)}
                          className="flex items-center text-base font-medium text-gray-900 hover:text-gray-700"
                        >
                          <menu.icon className="h-4 w-4" />
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {menu.name}
                          </span>
                        </Popover.Button>
                      ))}
                      <Popover.Button
                        className="flex items-center text-sm font-medium text-sky-500 hover:text-sky-600"
                        onClick={logout}
                      >
                        <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                        <span className="ml-3 text-base font-medium text-sky-500">
                          Sign out
                        </span>
                      </Popover.Button>
                    </nav>
                  </div>
                </>
              )}
              {!userData && (
                <div className="py-6 px-5">
                  <Popover.Button
                    onClick={() => navigate('/register')}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-600"
                  >
                    Sign up
                  </Popover.Button>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{' '}
                    <Popover.Button
                      onClick={() => navigate('/login')}
                      className="text-sky-500 hover:text-sky-600"
                    >
                      Sign in
                    </Popover.Button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

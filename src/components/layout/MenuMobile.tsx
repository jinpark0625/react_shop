import { Dialog, Tab, Transition } from '@headlessui/react';
import { Fragment, Dispatch, SetStateAction } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { headerData } from 'data/layout/layoutData';
import { Link, NavigateFunction } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { User as UserProps } from 'firebase/auth';
import User from 'components/User';

interface menuProps {
  open: boolean;
  classNames: (...classes: string[]) => string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
  userData?: (UserProps & { isAdmin?: boolean }) | null;
  loading: boolean;
  logout: () => void;
  isAdmin: boolean | undefined;
}

export default function MenuMobile({
  open,
  classNames,
  setOpen,
  userData,
  navigate,
  loading,
  logout,
  isAdmin,
}: menuProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              {/* Close Btn */}
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-4">
                    {headerData.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-900',
                            'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium',
                          )
                        }
                        onClick={() => {
                          setOpen(false);
                          navigate('/category/shop-all');
                        }}
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels as={Fragment}>
                  {headerData.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="space-y-10 px-4 pt-10 pb-8"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <div className="overflow-hidden rounded-lg bg-gray-100">
                              <LazyLoadImage
                                src={item.imageSrc}
                                effect="blur"
                                alt={item.imageAlt}
                                className="object-cover object-center"
                              />
                            </div>
                            <Link
                              to={item.href}
                              onClick={() => {
                                setOpen(false);
                              }}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                className="absolute inset-0 z-10"
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <Link
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="cursor-pointer font-medium text-gray-900 "
                            to={section.href}
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            {section.name}
                          </Link>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <Link
                                  to={item.href}
                                  className="-m-2 block p-2 text-gray-500"
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {headerData.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link
                      onClick={() => {
                        setOpen(false);
                      }}
                      to={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </Link>
                  </div>
                ))}
                {isAdmin && (
                  <Link
                    to="/products/new"
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    New Item
                  </Link>
                )}
              </div>

              <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                {loading && !userData && (
                  <div className="flex animate-pulse space-x-4">
                    <div className="h-10 w-full rounded-md bg-gray-200"></div>
                  </div>
                )}

                {userData && (
                  <>
                    <div className="flex items-center">
                      <User
                        photoURL={userData.photoURL}
                        displayName={userData.displayName}
                        mobile={true}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        to="/member"
                        className="mb-4 font-medium text-gray-900"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="mb-4 font-medium text-gray-900"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Order History
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                        className="inline-block cursor-pointer text-left font-medium text-gray-500"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
                {!loading && !userData && (
                  <>
                    <Link
                      to="/login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>

              <div className="border-t border-gray-200 py-6 px-4">
                <a href="#" className="-m-2 flex items-center p-2">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">
                    CAD
                  </span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

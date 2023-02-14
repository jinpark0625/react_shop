import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';
export default function Footer() {
  const navigation = useLocation();

  return (
    <footer
      className={`mt-32 border-t border-gray-200 ${
        navigation.pathname === '/login' || navigation.pathname === '/register'
          ? 'hidden'
          : 'block'
      }`}
    >
      <div className="mx-auto flex flex-col items-center ">
        {/* Top area: Blocks */}
        <div className="grid w-full max-w-6xl gap-8 py-8 px-4 sm:grid-cols-12 sm:px-6 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-6">
            <div className="mb-2">
              {/* Logo */}
              <Link to="/" className="inline-block" aria-label="Cruip">
                <Logo width="32px" />
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              <Link
                to="#"
                className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900 hover:underline"
              >
                Terms
              </Link>
              <Link
                to="#"
                className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900 hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* 2nd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="mb-2 font-medium text-gray-800">Marketplace</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  All NFTs
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Art
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Collectibles
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Sports
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Virtual Worlds
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="mb-2 font-medium text-gray-800">Resources</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Documentation
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="mb-2 font-medium text-gray-800">Company</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  About us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom area */}
        <div className="flex w-full justify-center border-t border-gray-200  p-4 sm:px-6 md:py-8">
          <div className="w-full max-w-6xl px-4 sm:px-6 md:flex md:items-center md:justify-between">
            {/* Social links */}
            <ul className="mb-4 flex md:order-1 md:ml-4 md:mb-0">
              <li>
                <Link
                  to="#"
                  className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  to="#"
                  className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                  aria-label="Github"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  to="#"
                  className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="mr-4 text-sm text-gray-600">
              Made by{' '}
              <Link
                className="text-blue-600 hover:underline"
                to="https://github.com/jinpark0625?tab=repositories"
              >
                Jin Park
              </Link>
              . All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

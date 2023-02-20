import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-white py-24 px-6 sm:py-32 lg:px-8 ">
      <div className="text-center">
        <img
          alt="404 image"
          src="/images/404.webp"
          className="w-full max-w-sm"
        />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-600 hover:shadow-md hover:shadow-sky-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

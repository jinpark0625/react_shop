import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  option: string;
}

const Breadcrumbs = ({ option, title }: IProps) => {
  const tags = title === 'Tops' ? `Clothing/${title}` : `Accessories/${title}`;
  const crumbs =
    option === 'category'
      ? `Shop All/${title}`
      : option === 'subCategory'
      ? `Shop All/${tags}`
      : 'category';
  const segments = crumbs.split('/');

  if (title === 'Shop All') return null;
  return (
    <ol className="mb-2 flex items-center">
      {segments.map((props, key, arr) => {
        const path =
          props === 'Shop All' ? '/collections' : `/collections/${props}`;
        const option = key === 1 ? 'category' : key === 2 ? 'subCategory' : '';

        return (
          <li key={key} className="mr-2">
            {key !== arr.length - 1 ? (
              <>
                <Link
                  className="mr-2 text-sm text-gray-900 hover:text-gray-500"
                  to={path}
                  state={{
                    title: props,
                    option,
                  }}
                >
                  {props}
                </Link>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="inline h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </>
            ) : (
              <>
                <p className="mr-2 h-[16.5px] text-sm text-gray-900">{props}</p>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Breadcrumbs;

import useProducts from 'hooks/useProducts';
import {
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';
import { ProductType } from 'utils/interfaces';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { NFT_LOADING_ARRAY } from 'data/Home/slideOptions';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';
import ProductCard from '../../components/ui/ProductCard';
import CategorySort from 'components/Product/CategorySort';
import { FILTERS, COLLECTION } from '../../data/Products';
import FilterMobile from 'components/Product/FilterMobile';
import FilterDesktop from 'components/Product/FilterDesktop';
import ProductTitle from 'components/ui/ProductTitle';
import { deduplicateByOptions } from 'utils/utils';
import useSortParams from 'hooks/useSortParams';
import ErrorMessage from 'components/ui/ErrorMessage';

interface ProductProps {
  shouldDeduplicate: boolean;
  setShouldDeduplicate: Dispatch<SetStateAction<boolean>>;
}

const ShopAll = ({ shouldDeduplicate, setShouldDeduplicate }: ProductProps) => {
  const { query, searchParams, setSortParams, deleteSortParams } =
    useSortParams();

  const {
    productsQuery: { isLoading, error, data },
    productFilterQuery: { data: productData },
  } = useProducts(query);

  // Products
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (data && productData && !shouldDeduplicate) {
      setProducts(data);
      deduplicate(productData);
      setShouldDeduplicate(true);
    } else if (data) {
      setProducts(data);
    }
  }, [data]);

  // Mobile
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get Filter Options
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const deduplicate = useCallback((data: ProductType[]) => {
    const colorArray = deduplicateByOptions(data, 'color');
    const sizeArray = deduplicateByOptions(data, 'sizes');

    setColors(colorArray);
    setSizes(sizeArray);
  }, []);

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <FilterMobile
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        isLoading={isLoading}
        allCategories={COLLECTION}
        filters={FILTERS}
        colors={colors}
        sizes={sizes}
        setSortParams={setSortParams}
        deleteSortParams={deleteSortParams}
        searchParams={searchParams}
      />

      <main className="mx-auto mb-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title, Breadcrumbs, Sort */}
        <div className="flex items-end justify-between border-b border-gray-200 pt-24 pb-6">
          <div className="flex flex-col">
            {/* page title */}
            <ProductTitle title="Shop-All" />
          </div>
          {/* Sort */}
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              {/* sort products */}
              <CategorySort
                setSortParams={setSortParams}
                deleteSortParams={deleteSortParams}
                sortParams={searchParams.get('sort')}
                ascParams={searchParams.get('asc')}
              />
            </Menu>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Filter */}
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Categories & Filter */}
            <FilterDesktop
              allCategories={COLLECTION}
              filters={FILTERS}
              colors={colors}
              sizes={sizes}
              setSortParams={setSortParams}
              deleteSortParams={deleteSortParams}
              searchParams={searchParams}
            />

            {/* Product grid */}
            <div className="lg:col-span-3">
              {/* loading status */}
              {isLoading && (
                <ul className="grid grid-cols-1  gap-6 md:grid-cols-2">
                  {NFT_LOADING_ARRAY.map((data) => (
                    <li key={data}>
                      <ImagePlaceholder />
                    </li>
                  ))}
                </ul>
              )}

              <ul className="grid grid-cols-1  gap-6 md:grid-cols-2">
                <>
                  {error && <ErrorMessage />}
                  {products?.map((product) => {
                    return (
                      <li
                        key={product.id}
                        className="group cursor-pointer rounded-2xl transition-shadow duration-300 ease-in-out hover:shadow-md"
                      >
                        <ProductCard
                          id={product.id}
                          image={product.image}
                          description={product.description}
                          title={product.title}
                          price={product.price}
                          category={product.category}
                          sizes={product.sizes}
                          highlights={product.highlights}
                          details={product.details}
                          tags={product.tags}
                        />
                      </li>
                    );
                  })}
                </>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopAll;

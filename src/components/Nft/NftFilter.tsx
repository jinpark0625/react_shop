import { Disclosure } from '@headlessui/react';
import ErrorMessage from 'components/ui/ErrorMessage';
import { Fragment } from 'react';
import {
  MinusIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import NftCheckbox from './NftCheckbox';
import { ParsedQuery } from 'query-string';

interface FilterPropsTypes {
  filterLoading: boolean;
  filterError: Error | null;
  filters: Array<{
    [key: string]: string[];
  }>;
  searchParams: URLSearchParams;
  handleCheckboxChange: (key: string, value: string) => void;
  mobile: boolean;
}

export const NftFilter = ({
  filterLoading,
  filterError,
  filters,
  searchParams,
  handleCheckboxChange,
  mobile,
}: FilterPropsTypes) => {
  return (
    <form
      className={`${
        mobile ? 'mt-4 border-t border-gray-200' : 'hidden lg:block'
      }`}
    >
      {filterLoading && (
        <div className="h-40 w-full animate-pulse rounded-md bg-slate-50" />
      )}
      {filterError && <ErrorMessage />}
      {filters?.map((value) => {
        const selectedFilters = searchParams.getAll(
          Object.keys(value)[0].toLowerCase(),
        );

        return (
          <Disclosure
            as="div"
            key={Object.keys(value)[0]}
            className={`${
              mobile ? 'border-t px-4 ' : 'border-b'
            } border-gray-200 py-6`}
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {Object.keys(value)[0]}
                    </span>
                    <div className="flex">
                      <span
                        className={`h-[18px] w-[18px] rounded-[4px] text-xs leading-[17px] text-white ${
                          selectedFilters?.length ? 'bg-violet-500' : ''
                        }`}
                      >
                        {selectedFilters?.length}
                      </span>
                      <span className="ml-4 flex items-center">
                        {open ? (
                          <MinusIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </div>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {Object.values(value)[0].map((val, i) => {
                      return (
                        <Fragment key={i}>
                          <NftCheckbox
                            values={value}
                            value={val}
                            onChange={() =>
                              handleCheckboxChange(
                                Object.keys(value)[0].toLowerCase(),
                                val.toLowerCase(),
                              )
                            }
                            searchParams={searchParams}
                          />
                        </Fragment>
                      );
                    })}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </form>
  );
};

interface FilterHeaderPropsTypes {
  deleteAllParams: () => void;
  query: ParsedQuery<string>;
}

export const NftFilterHeader = ({
  deleteAllParams,
  query,
}: FilterHeaderPropsTypes) => {
  return (
    <div className="hidden items-center justify-between border-b border-gray-200 pb-6 lg:flex">
      <h3 className="flex items-center text-base font-semibold text-gray-900">
        <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
        Filters
      </h3>
      {Object.keys(query).length !== 0 && (
        <button
          className="flex items-center rounded-full bg-gray-800 py-1 px-2 text-xs text-white"
          onClick={deleteAllParams}
        >
          Clear all <XMarkIcon className="ml-1 h-3 w-3" />
        </button>
      )}
    </div>
  );
};

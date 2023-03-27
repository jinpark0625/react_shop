import LoadingSkeleton from 'components/ui/LoadingSkeleton';

const OrderLoading = () => {
  return (
    <div className="mx-auto mb-32 w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-6">
        <div className="col-span-4 mb-8 pr-0 lg:pr-10">
          <LoadingSkeleton className=" animate-pulse rounded-md bg-slate-50  pt-[30%]" />
          <LoadingSkeleton className="mt-10 animate-pulse rounded-md bg-slate-50  pt-[30%]" />
        </div>
        <div className="relative col-span-2 w-full animate-pulse overflow-hidden rounded-2xl bg-slate-50  pt-[100%]">
          <LoadingSkeleton className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 " />
        </div>
      </div>
    </div>
  );
};

export default OrderLoading;

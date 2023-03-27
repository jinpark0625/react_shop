import LoadingSkeleton from 'components/ui/LoadingSkeleton';

const ProductLoading = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative animate-pulse overflow-hidden rounded-2xl bg-slate-50  pt-[100%]">
          <LoadingSkeleton className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 " />
        </div>
        <div className="mx-auto w-full pl-0 pt-10 pb-16 lg:pl-8 lg:pt-0 lg:pb-24">
          <LoadingSkeleton className=" animate-pulse rounded-md bg-slate-50  pt-[30%]" />
          <LoadingSkeleton className="mt-10 animate-pulse rounded-md bg-slate-50  pt-[30%]" />
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;

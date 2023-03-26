import LoadingSkeleton from 'components/ui/LoadingSkeleton';

const CheckoutLoading = () => {
  return (
    <div className="mt-4 flex flex-wrap gap-20 lg:flex-nowrap">
      <div className="mb-8 w-full lg:w-1/2 ">
        <LoadingSkeleton className=" animate-pulse rounded-xl bg-slate-50  pt-[30%]" />
        <LoadingSkeleton className="mt-10 animate-pulse rounded-xl bg-slate-50  pt-[30%]" />
      </div>
      <div className="relative w-full animate-pulse overflow-hidden rounded-2xl bg-slate-50 pt-[50%] lg:w-1/2">
        <LoadingSkeleton className="absolute top-0 left-0 h-full w-auto -translate-x-1/2 -translate-y-1/2 " />
      </div>
    </div>
  );
};

export default CheckoutLoading;

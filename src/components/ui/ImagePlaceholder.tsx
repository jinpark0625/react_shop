interface PlaceHolderProps {
  height?: string;
}

export default function ImagePlaceholder({ height }: PlaceHolderProps) {
  return (
    <div
      className={`h-full ${
        height ?? 'min-h-[384px]'
      }  w-full animate-pulse rounded-2xl  bg-slate-50`}
    />
  );
}

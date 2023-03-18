interface IProps {
  className: string;
}

export default function LoadingSkeleton({ className }: IProps) {
  return <div className={className} />;
}

import { User as UserType } from 'firebase/auth';

export default function User({ displayName, photoURL }: UserType) {
  return (
    <div className="flex shrink-0 items-center">
      <img
        className="mr-2 h-10 w-10 rounded-full"
        src={
          photoURL === 'default' || !photoURL
            ? '/images/default_image.webp'
            : photoURL
        }
        alt={displayName ?? 'Anonymous'}
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}

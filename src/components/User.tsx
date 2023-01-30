import { UserData } from '../utils/interfaces';

export default function User({ displayName, photoURL }: UserData) {
  return (
    <div className="flex items-center">
      <img
        className="mr-2 h-10 w-10 rounded-full"
        src={photoURL}
        alt={displayName}
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}

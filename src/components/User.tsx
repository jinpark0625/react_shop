interface UserType {
  displayName?: string | null;
  photoURL?: string | null;
  mobile: boolean;
}

export default function User({ displayName, photoURL, mobile }: UserType) {
  return (
    <>
      {!mobile && <p className="mr-2">{displayName}</p>}
      <img
        className="h-10 w-10 rounded-full border border-gray-300"
        src={
          photoURL === 'default' || !photoURL
            ? '/images/default_image.webp'
            : photoURL
        }
        alt={displayName ?? 'Anonymous'}
      />
      {mobile && <p className="ml-2">{displayName}</p>}
    </>
  );
}

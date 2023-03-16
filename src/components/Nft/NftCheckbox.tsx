interface CheckboxTypes {
  value: string;
  onChange: () => void;
  searchParams: URLSearchParams;
  values: {
    [key: string]: string[];
  };
}

const NftCheckbox = ({
  value,
  onChange,
  searchParams,
  values,
}: CheckboxTypes) => {
  const capitalizedStr = value?.replace(/\b\w/g, (l) => l.toUpperCase());
  const isChekced = searchParams
    .getAll(Object.keys(values)[0].toLowerCase())
    .includes(value);

  return (
    <div className="flex items-center">
      <input
        id={value}
        name={value}
        disabled={value === 'brown'}
        type="checkbox"
        checked={isChekced || value === 'brown'}
        className="h-4 w-4 rounded border-gray-300 accent-violet-500"
        onChange={onChange}
      />
      <label htmlFor={value} className="ml-3 text-sm text-gray-600">
        {capitalizedStr}
      </label>
    </div>
  );
};

NftCheckbox.displayName = 'NftCheckbox';

export default NftCheckbox;

interface ButtonPros {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ text, onClick, disabled }: ButtonPros) {
  return (
    <button
      onClick={onClick}
      className="rounded-sm bg-brand py-2 px-4 text-white hover:brightness-110"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

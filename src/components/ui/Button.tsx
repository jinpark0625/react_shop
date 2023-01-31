interface ButtonPros {
  text: string;
  onClick: () => void;
}

export default function Button({ text, onClick }: ButtonPros) {
  return (
    <button
      onClick={onClick}
      className="rounded-sm bg-brand py-2 px-4 text-white hover:brightness-110"
    >
      {text}
    </button>
  );
}

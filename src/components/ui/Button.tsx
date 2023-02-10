import React from 'react';
interface ButtonPros {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: IconType;
}

type IconType = () => JSX.Element;

export default function Button({
  text,
  onClick,
  disabled,
  className,
  icon,
}: ButtonPros) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-white hover:brightness-110 ${
        className ?? 'rounded-full bg-neutral-800 py-2 px-4'
      }`}
      disabled={disabled}
    >
      {icon && React.createElement(icon)}
      {text}
    </button>
  );
}

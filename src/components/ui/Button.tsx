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
      className={`flex items-center justify-center rounded-md text-base transition-all ${
        className ?? ''
      }`}
      disabled={disabled}
    >
      {icon && React.createElement(icon)}
      {text}
    </button>
  );
}

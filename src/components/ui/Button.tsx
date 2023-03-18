import React from 'react';
interface ButtonPros {
  text: string;
  onClick?: (e?: any) => void;
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
      className={`flex max-h-[44px] items-center justify-center rounded-md transition-all ${
        className ?? ''
      }`}
      disabled={disabled}
      aria-label={text}
    >
      {icon && React.createElement(icon)}
      {text}
    </button>
  );
}

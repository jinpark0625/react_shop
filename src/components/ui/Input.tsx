import React from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  className?: string;
  ariaInvalid?: boolean;
  type: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  inputClassName?: string;
}

const LABEL_CLASS = `duration absolute top-px left-2 -translate-y-1/2 scale-75 bg-white px-1 transition-all origin-left	
peer-placeholder-shown:top-7 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-500
peer-focus:top-px peer-focus:left-2 peer-focus:scale-75 peer-focus:text-violet-500 pointer-events-none	`;

const Input = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      labelText,
      className,
      type,
      ariaInvalid,
      error,
      value,
      disabled,
      autocomplete,
      autofocus,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <div
          className={`${error ? 'animate-shake' : ''} ${
            className ?? ''
          } relative`}
        >
          <input
            ref={ref}
            {...props}
            className={`peer w-full rounded-lg ${
              error ? 'border-red-500' : ''
            } ${inputClassName ?? ''}`}
            type={type}
            aria-invalid={!ariaInvalid ? undefined : error ? 'true' : 'false'}
            placeholder=" "
            value={value}
            disabled={disabled}
            autoFocus={autofocus}
            autoComplete={autocomplete}
          />
          <label className={LABEL_CLASS}>{labelText}</label>
          {error && (
            <small
              role="alert"
              className={`${error ? 'animate-shake' : ''} text-red-500`}
            >
              {error}
            </small>
          )}
        </div>
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;

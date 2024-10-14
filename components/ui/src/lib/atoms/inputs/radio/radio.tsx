import { FC, ReactElement } from 'react';
import { TRadio } from './types';

export const Radio: FC<TRadio> = ({
  className,
  label,
  sublabel,
  ...props
}): ReactElement => {
  return (
    <div className="flex gap-6">
      <input
        type="radio"
        className="size-5 accent-black top-1 relative"
        {...props}
      />
      <label
        htmlFor={props?.name}
        className="flex flex-col font-source-sans-pro gap-1"
      >
        {label}

        <span className="text-sm">{sublabel}</span>
      </label>
    </div>
  );
};

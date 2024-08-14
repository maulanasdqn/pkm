import { FC, ReactElement } from 'react';
import { Button } from '../../atoms';
import { TFormAuth } from './types';

export const FormAuth: FC<TFormAuth> = ({
  title,
  footer,
  subtitle,
  buttonName,
  ...props
}): ReactElement => {
  return (
    <form
      {...props}
      title={title}
      className="w-full h-full flex flex-col gap-10 items-center px-20 py-6"
    >
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-4xl font-source-sans-pro">{title}</h2>
        {subtitle && (
          <p className="font-inter text-xs font-medium">{subtitle}</p>
        )}
      </div>

      <fieldset className="w-full flex flex-col gap-8 font-montserrat">
        {props.children}
      </fieldset>
      <Button type="submit" size="md" className="w-[70%]">
        {buttonName}
      </Button>

      {footer}
    </form>
  );
};

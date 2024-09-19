import { FC, ReactElement } from 'react';
import { Button } from '../../atoms';
import { TFormAuth } from './types';

export const FormAuth: FC<TFormAuth> = ({
  title,
  footer,
  subtitle,
  buttonName,
  buttonLoading,
  ...props
}): ReactElement => {
  return (
    <form
      {...props}
      title={title}
      className="w-full h-full flex flex-col 2xl:gap-10 gap-8 items-center px-20 2xl:py-5 py-3"
    >
      <div className="flex flex-col gap-3 items-center">
        <h2 className="2xl:text-4xl text-3xl font-source-sans-pro">{title}</h2>
        {subtitle && (
          <p className="font-inter text-xs font-medium">{subtitle}</p>
        )}
      </div>

      <fieldset className="w-full flex flex-col 2xl:gap-6 gap-4 font-montserrat">
        {props.children}
      </fieldset>
      <Button
        type="submit"
        size="md"
        className="w-[70%]"
        isLoading={buttonLoading}
      >
        {buttonName}
      </Button>

      {footer}
    </form>
  );
};

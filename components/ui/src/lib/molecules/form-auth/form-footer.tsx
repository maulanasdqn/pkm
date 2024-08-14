import { Button } from '../../atoms';
import { FC, ReactElement } from 'react';
import { TFormFooter } from './types';

export const FormAuthFooter: FC<TFormFooter> = (props): ReactElement => {
  return (
    <div className="flex gap-1 items-center font-source-sans-pro">
      <p className="text-sm">{props.title}</p>
      <Button
        variant="text"
        size="sm"
        href={props.link}
        className="text-sm px-0"
      >
        {props.linkName}
      </Button>
    </div>
  );
};

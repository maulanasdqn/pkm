import { FC, ReactElement } from 'react';
import { Button } from '../button';
import { TMarketBreadcumb } from './type';

export const MarketBreadcumb: FC<TMarketBreadcumb> = (props): ReactElement => {
  return (
    <div className="w-full flex items-center justify-between py-4 font-source-sans-pro border-b border-neutral-60%">
      <h2 className="text-4xl">{props.title}</h2>
      <div className="flex items-center gap-2 text-xl">
        <Button
          href={props.prevLinkUrl}
          variant="text"
          className="text-2xl px-2"
        >
          {props.prevLinkName}
        </Button>
        /
        <Button
          href={props.currentLinkUrl}
          variant="text"
          className="text-2xl text-black hover:text-neutral-80% px-2"
        >
          {props.currentLinkName}
        </Button>
      </div>
    </div>
  );
};

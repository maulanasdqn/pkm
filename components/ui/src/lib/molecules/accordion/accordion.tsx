'use client';
import { FC, ReactElement, useState } from 'react';
import { TAccordion } from './types';
import { DownOutlined } from '@ant-design/icons';
import { cn } from '@pkm/libs/clsx';

export const Accordion: FC<TAccordion> = ({
  children,
  title,
}): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col font-source-sans-pro bg-neutral-10% p-4 ">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center border-b border-neutral-50% py-2 pr-3"
      >
        <span className="text-2xl">{title}</span>
        <DownOutlined
          className={cn(
            'text-neutral-70% text-lg transition-all duration-300',
            {
              'rotate-180': open,
            }
          )}
        />
      </button>

      <div
        className={cn(
          'w-full bg-white overflow-auto transition-all duration-300 scroll-bar-none',
          {
            'h-0': !open,
            'h-[10rem]': open,
          }
        )}
      >
        <p className="p-4 text-lg">{children}</p>
      </div>
    </div>
  );
};

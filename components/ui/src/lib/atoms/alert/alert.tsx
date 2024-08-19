'use client';

import { cn } from '@pkm/libs/clsx';
import { cva, VariantProps } from 'class-variance-authority';
import { FC, ReactElement, useEffect } from 'react';
import { TAlert } from './type';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { match } from 'ts-pattern';
import { motion } from 'framer-motion';

const alertClassName = cva(
  'fixed top-14 z-50 left-1/2 flex items-center gap-4 py-2 px-4 w-full max-w-[400px] min-h-[60px] rounded-md border-2 bg-neutral-10%',
  {
    variants: {
      variant: {
        success: 'border-primary-30%',
        warning: 'border-secondary-30%',
        error: 'border-red-30%',
      },
    },

    defaultVariants: {
      variant: 'success',
    },
  }
);

export const Alert: FC<TAlert & VariantProps<typeof alertClassName>> = ({
  variant = 'success',
  message,
  y = 0,
  timer = 5000,
  onHide,
  show,
}): ReactElement | false => {
  const iconVariant = match(variant)
    .with('success', () => (
      <CheckCircleOutlined className="text-primary-80% text-2xl" />
    ))
    .with('warning', () => (
      <ExclamationCircleOutlined className="text-secondary-80% text-2xl" />
    ))
    .with('error', () => (
      <CloseCircleOutlined className="text-red-80% text-2xl" />
    ))
    .otherwise(() => (
      <CheckCircleOutlined className="text-primary-80% text-2xl" />
    ));

  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      onHide();
    }, timer + 500);

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [timer, onHide]);

  return (
    <motion.div
      initial={{ x: '-50%', y: -300 }}
      animate={{ y: show ? y : -300 }}
      className={cn(alertClassName({ variant }))}
    >
      {iconVariant}

      <div className="flex flex-col -space-y-1">
        <p
          className={cn('capitalize text-lg font-medium font-montserrat', {
            'text-primary-80%': variant === 'success',
            'text-secondary-80%': variant === 'warning',
            'text-red-80%': variant === 'error',
          })}
        >
          {variant}
        </p>
        <p
          className={cn('font-source-sans-pro', {
            'text-primary-70%': variant === 'success',
            'text-secondary-70%': variant === 'warning',
            'text-red-70%': variant === 'error',
          })}
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
};

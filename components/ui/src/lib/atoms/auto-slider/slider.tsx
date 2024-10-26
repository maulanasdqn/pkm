'use client';
import { FC, ReactElement } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { TAutoSlider } from './type';
import Image from 'next/image';
import { cn } from '@pkm/libs/clsx';
import { isMobile } from 'react-device-detect';

export const AutoImageSlider: FC<TAutoSlider> = ({
  images,
  imageClassName,
  toX = isMobile ? -320 : -410,
}): ReactElement => {
  const xTransition = useMotionValue(0);

  return (
    <motion.div
      className="flex gap-8"
      style={{
        x: xTransition,
        transform: `translateX(${xTransition.get()}px)`,
      }}
      animate={{ x: [0, toX * images.length] }}
      transition={{
        ease: 'linear',
        duration: 15,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      }}
    >
      {[...images, ...images].map((item, index) => (
        <div
          key={index}
          className={cn(
            'md:min-w-[626px] md:min-h-[417px] min-w-[426px] min-h-[217px] overflow-hidden relative rounded-xl object-cover object-center z-10',
            imageClassName
          )}
        >
          <Image
            key={index}
            src={item}
            alt={`activity-${index + 1}`}
            fill
            quality={100}
            className="object-cover object-center"
          />
        </div>
      ))}
    </motion.div>
  );
};

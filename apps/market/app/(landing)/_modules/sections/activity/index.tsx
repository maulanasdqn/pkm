'use client';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const images = [
  '/images/sample-activity.webp',
  '/images/sample-activity-2.webp',
  '/images/sample-activity-3.webp',
];

export const ActivitySection: FC = (): ReactElement => {
  const xTransition = useMotionValue(0);

  return (
    <div className="w-full flex flex-col items-center gap-12 overflow-hidden">
      <h3 className="text-4xl">Aktivitas Pasar Desa</h3>

      <motion.div
        className="flex gap-8"
        style={{
          x: xTransition,
          transform: `translateX(${xTransition.get()}px)`,
        }}
        animate={{ x: [0, -410 * 3] }}
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
            className="min-w-[626px] min-h-[417px] overflow-hidden relative rounded-xl object-cover object-center z-10"
          >
            <Image
              key={index}
              src={item}
              alt={`activity-${index + 1}`}
              fill
              quality={100}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

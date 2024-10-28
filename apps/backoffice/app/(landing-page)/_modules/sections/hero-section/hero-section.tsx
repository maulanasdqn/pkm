import * as React from 'react';
import Image from 'next/image';

export const HeroSection: React.FC = (): React.ReactElement => {
  return (
    <>
      <Image
        src="/images/hero-image.png"
        alt="hero-desa"
        width={1440}
        height={450}
        className="object-cover"
      />
    </>
  );
};

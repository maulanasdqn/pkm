import * as React from 'react';
import Image from 'next/image';

export const HeroSection: React.FC = (): React.ReactElement => {
  return (
    <>
      <Image
        src="/images/kantor-desa.png"
        alt="kantor-desa"
        width={1440}
        height={450}
        className="max-h-[540px] w-full object-cover"
        priority
      />
    </>
  );
};

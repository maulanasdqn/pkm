import Image from 'next/image';
import type { FC, ReactElement } from 'react';

export const HeroSection: FC = (): ReactElement => {
  return (
    <section
      id="hero"
      className="overflow-hidden w-full flex relative flex-col gap-5 md:gap-10 pb-10 md:pb-20 2xl:mx-auto font-source-sans-pro"
    >
      <div className="relative w-full h-[400px] md:h-[575px]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Dark overlay */}
        <div className="absolute z-10 top-1/2 left-1/2 transform w-full -translate-y-1/2 -translate-x-1/2 text-center text-white px-4 md:px-10">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Wisata Desa Bojongsari
          </h1>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Kecamatan Bojongsong Kabupaten Bandung
          </h1>
          <p className="mt-4 text-base md:text-lg">
            Temukan informasi publik terkini dan wisata dari Desa Bojongsari
          </p>
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Cari wisata dan informasi"
              className="p-3 w-full max-w-[400px] rounded-l-lg bg-white text-black placeholder-gray-500"
            />
            <button className="p-3 bg-green-500 text-white rounded-r-lg hover:bg-green-600">
              Cari
            </button>
          </div>
        </div>
        {/* Image Component for Hero Section */}
        <div className="bg-white">
          <Image
            src="/images/hero.png"
            alt="Desa Bojongsari"
            layout="fill"
            className="z-0"
          />
        </div>
      </div>
      <div className="bg-white bottom-7 xl:bottom-[4.5rem] rounded-[200vh_200vh_0_0/20vh_20vh_0_0] h-[100px] mt-[-100px] overflow-hidden absolute w-[100%] z-10"></div>
    </section>
  );
};

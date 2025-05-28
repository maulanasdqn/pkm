import React from 'react';
import Image from 'next/image';

const CTASection = () => {
  return (
    <section className="2xl:container 2xl:mx-auto rounded-xl mb-8 overflow-hidden relative bg-[#C8E5D7] py-10 px-4">
      <div className="w-[120px]">
        <Image
          src="/images/vector.png"
          alt="decoration"
          fill
          className="object-contain"
        />
      </div>
      <div className="mx-auto flex relative z-10 flex-col md:flex-row items-center justify-start gap-8 space-y-8 md:space-y-0">
        {/* Gambar perangkat */}
        <div className="relative aspect-[300/210] w-[300px] h-[200px] flex space-x-4">
          <Image
            src="/images/mockup.png"
            alt="mockup"
            fill
            className="object-contain"
          />
        </div>

        {/* Konten CTA */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#3B5C46] mb-4">
            Penasaran sama produk kami? Cek pasar desa kami via website!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Digitalisasi pasar desa mempermudah akses untuk belanja anda!
          </p>
          <button className="bg-[#38A169] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#2f8f56] transition duration-200">
            Cek Sekarang Juga
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

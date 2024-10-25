import * as React from 'react';
import Image from 'next/image';
import { WhatsAppOutlined } from '@ant-design/icons';
import { dataServices } from '@pkm/libs/entities';
import { Button } from '@pkm/ui';
import Link from 'next/link';

export const HeroServiceSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-10 md:py-14 relative">
      <div className="bg-primary-20% h-[650px] w-full absolute top-0 -z-10" />
      <div className="container flex flex-col items-center text-center w-full space-y-6 md:space-y-8 lg:space-y-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-100%">
          Pelayanan Desa
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
          Selamat datang di layanan konsultasi pengajuan surat Desa Bojongsari.
          Kami berkomitmen untuk memberikan pelayanan yang cepat, mudah, dan
          transparan bagi seluruh warga desa. Konsultasi terkait pengajuan surat
          administrasi dapat dilakukan melalui WhatsApp. Hubungi nomor WhatsApp
          resmi kami untuk mendapatkan panduan dan informasi terkait proses
          pengajuan yang dibutuhkan.
        </p>
        <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8 md:p-14 rounded bg-white shadow-lg">
          {dataServices.map(({ title, iconSrc, slug }) => (
            <Link
              key={iconSrc}
              href={`#${slug}`}
              className="w-full rounded bg-primary-20% flex flex-col gap-4 px-4 py-8 items-center justify-center"
            >
              <Image
                src={iconSrc}
                alt={title}
                width={70}
                height={75}
                className="object-fit"
                priority
              />
              <h1 className="text-base capitalize sm:text-lg md:text-xl font-medium">
                {title}
              </h1>
            </Link>
          ))}
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <Button>
              <WhatsAppOutlined className="text-xl mr-2.5" />
              Chat Via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

import * as React from 'react';
import Image from 'next/image';
import { dataServices } from '@pkm/libs/entities';

export const DescServiceSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-8 md:px-16 w-full container space-y-3">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl ">
        Sistem pelayanan desa dibangun berdasarkan kerangka hukum yang diatur
        oleh pemerintah pusat. Beberapa undang-undang dan peraturan yang menjadi
        dasar pembangunan sistem pelayanan desa antara lain:
      </p>
      <ul className="list-disc ml-8 sm:text-lg md:text-xl lg:text-2xl space-y-3">
        <li>
          <strong>Undang-Undang No. 6 Tahun 2014 tentang Desa,</strong>{' '}
          memberikan landasan hukum yang kuat bagi desa untuk mengelola
          pemerintahannya sendiri dan menjalankan pelayanan kepada masyarakat.
          UU ini juga mengatur tentang kewenangan desa, Dana Desa, dan prinsip
          otonomi desa.
        </li>
        <li>
          <strong>
            Peraturan Pemerintah No. 43 Tahun 2014 tentang Peraturan Pelaksanaan
            UU Desa,
          </strong>{' '}
          merinci teknis pelaksanaan pelayanan desa, termasuk tata kelola
          administrasi, pembangunan, pemberdayaan masyarakat, dan transparansi
          dalam pengelolaan keuangan desa.
        </li>
        <li>
          <strong>
            Peraturan Menteri Dalam Negeri No. 113 Tahun 2014 tentang
            Pengelolaan Keuangan Desa,
          </strong>{' '}
          mengatur pengelolaan keuangan desa secara akuntabel, transparan, dan
          bertanggung jawab untuk pelayanan yang lebih baik.
        </li>
      </ul>
      <div className="py-8 space-y-8 w-full">
        {dataServices.map(({ title, imgSrc, desc, slug }) => (
          <div
            key={slug}
            id={slug}
            className="flex flex-wrap md:flex-nowrap justify-start items-start w-full md:even:flex-row-reverse gap-0 md:gap-20"
          >
            <div className="md:w-[70%] space-y-3 py-4">
              <h1 className="sm:text-lg md:text-xl lg:text-2xl font-bold capitalize">
                {title}
              </h1>
              <p className="sm:text-lg md:text-xl lg:text-2xl">{desc}</p>
            </div>
            <Image
              src={imgSrc}
              alt={title}
              width={175}
              height={175}
              className="w-auto h-[175px] object-cover"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
};

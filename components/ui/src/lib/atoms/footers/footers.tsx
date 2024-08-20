import { EnvironmentOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactElement } from 'react';

const images = [
  {
    name: 'whatsapp',
    link: '/images/wa.webp',
  },
  {
    name: 'facebook',
    link: '/images/fb.webp',
  },
  {
    name: 'instagram',
    link: '/images/ig.webp',
  },
  {
    name: 'youtube',
    link: '/images/yt.webp',
  },
];

export const FooterMarket: FC = (): ReactElement => {
  return (
    <footer className="relative bottom-0 w-full min-h-[455px] flex flex-col justify-between bg-neutral-40% py-4 font-source-sans-pro">
      <div className="w-full h-full flex px-20 py-10 justify-between items-center container mx-auto">
        <div className="h-full flex flex-col text-center gap-12 py-4">
          <p className="text-2xl">Terhubung dengan kami</p>
          <div className="flex gap-4 items-center">
            {images?.map((item, i) => (
              <Image
                key={i}
                src={item.link}
                alt={item.name}
                width={500}
                height={500}
                quality={100}
                className="size-[61px]"
              />
            ))}
          </div>
        </div>

        <div className="h-full flex flex-col gap-4 text-2xl">
          <Link href="/about">Tentang Kami</Link>
          <Link href="/contact">Kontak Kami</Link>
          <Link href="/products">Produk</Link>
          <Link href="/service">Layanan</Link>
        </div>

        <div className="h-full w-[30%] flex flex-col gap-8 py-4 text-2xl">
          <div className="flex gap-2">
            <EnvironmentOutlined className="text-2xl" />
            <p>Alamat</p>
          </div>

          <p>Jln. Bojongsari No.70 Kec. Bojongsoang Kab. Bandung, Jawa Barat</p>
        </div>
      </div>

      <div className="w-full py-6 flex justify-center gap-1 items-center border-t">
        <span className="font-bold">&#169;</span> 2024 Dipasar.id. All right
        reserved
      </div>
    </footer>
  );
};

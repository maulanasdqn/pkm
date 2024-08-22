import { EnvironmentOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import Link from 'next/link';
import { Button } from '../../atoms';

const images = [
  {
    name: 'whatsapp',
    image: '/images/wa.webp',
    link: '#',
  },
  {
    name: 'facebook',
    image: '/images/fb.webp',
    link: '#',
  },
  {
    name: 'instagram',
    image: '/images/ig.webp',
    link: '#',
  },
  {
    name: 'youtube',
    image: '/images/yt.webp',
    link: '#',
  },
];

const footerNav = [
  {
    name: 'Tentang Kami',
    link: '/about',
  },
  {
    name: 'Kontak Kami',
    link: '/contact',
  },
  {
    name: 'Produk',
    link: '/products',
  },
  {
    name: 'Layanan',
    link: '/service',
  },
];

export const FooterMarket: FC = (): ReactElement => {
  return (
    <footer className="relative bottom-0 w-full min-h-[455px] flex flex-col justify-between bg-neutral-40% py-4 font-source-sans-pro">
      <div className="w-full h-full flex px-20 py-10 justify-between items-center container mx-auto">
        <div className="h-full flex flex-col text-center gap-12 py-4">
          <h5 className="text-2xl">Terhubung dengan kami</h5>
          <div className="flex gap-4 items-center">
            {images?.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="hover:scale-105 duration-200"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  quality={100}
                  className="size-[61px] hover:scale-105 duration-200"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="h-full flex flex-col gap-3">
          {footerNav?.map((item, i) => (
            <Button
              key={i}
              className="text-2xl"
              variant="text"
              color="black"
              href={item.link}
            >
              {item.name}
            </Button>
          ))}
        </div>

        <div className="h-full w-[30%] flex flex-col gap-8 py-4 text-2xl">
          <div className="flex gap-2">
            <EnvironmentOutlined className="text-2xl" />
            <h5>Alamat</h5>
          </div>

          <p>Jln. Bojongsari No.70 Kec. Bojongsoang Kab. Bandung, Jawa Barat</p>
        </div>
      </div>

      <h6 className="w-full py-6 flex justify-center gap-1 items-center border-t">
        <span className="font-bold">&#169;</span> 2024 Dipasar.id. All right
        reserved
      </h6>
    </footer>
  );
};

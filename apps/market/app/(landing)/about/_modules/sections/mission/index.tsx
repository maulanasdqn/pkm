import Image from 'next/image';
import { FC, ReactElement } from 'react';

export const MissionSection: FC = (): ReactElement => {
  return (
    <div className="w-full flex px-20 py-8 gap-[3rem]">
      <div className="flex flex-col gap-8 items-center">
        <h3 className="text-4xl font-bold">MISI KAMI</h3>
        <p className="text-3xl">
          Misi kami adalah mempermudah proses jual beli di pasar desa,
          memberikan kenyamanan bagi pembeli, dan mendorong kemajuan ekonomi
          desa secara berkelanjutan. Melalui teknologi, kami menjembatani antara
          kebutuhan tradisional dan kemajuan modern, tanpa meninggalkan kearifan
          lokal. Bersama kami, mari ciptakan pasar desa yang lebih kuat,
          efisien, dan terkoneksi.
        </p>
      </div>

      <Image
        src="/images/market-about.webp"
        alt="mission"
        width={500}
        height={500}
        quality={100}
        className="max-w-[514px] min-w-[514px] max-h-[314px] min-h-[314px] rounded-[10px] object-cover object-center"
      />
    </div>
  );
};

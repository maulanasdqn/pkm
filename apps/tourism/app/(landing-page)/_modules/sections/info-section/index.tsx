import { cn } from '@pkm/libs/clsx';
import Image from 'next/image';

const informations = [
  {
    title: 'Jumlah Penduduk',
    total: 1709,
    suffix: 'Jiwa',
    description: 'Data tahun 2024',
    isPrimary: true,
  },
  {
    title: 'Jumlah Kepala Keluarga',
    total: 578,
    suffix: 'Kepala keluarga',
    description: 'Data tahun 2024',
    isPrimary: false,
  },
  {
    title: 'Luas Wilayah Desa Bojongsari',
    total: 51351,
    suffix: 'Km²',
    description: '',
    isPrimary: false,
  },
];
const InfoSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 container justify-center mb-8">
      {informations.map((item) => (
        <div
          key={item.title}
          className={cn(
            'relative bg-primary-50% h-[155px] text-white p-6 rounded-lg w-full',
            item.isPrimary
              ? 'bg-primary-50% text-white'
              : 'bg-white text-primary-50% border border-primary-50%'
          )}
        >
          {/* Titik-titik dekorasi */}
          <div className="absolute top-6 right-6 size-[64px]">
            <Image
              src={
                item.isPrimary
                  ? '/images/dot-white.svg'
                  : '/images/dot-green.svg'
              }
              alt="Dot decoration"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
          <p className="text-2xl xl:text-4xl font-bold mb-2">
            {item.total}{' '}
            <span className="text-base xl:text-xl font-semibold">
              {item.suffix}
            </span>
          </p>
          <span className="text-sm xl:text-base opacity-80">
            {item.description}
          </span>
        </div>
      ))}
    </section>
  );
};

export default InfoSection;

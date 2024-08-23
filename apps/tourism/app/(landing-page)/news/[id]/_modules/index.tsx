import Image from 'next/image';
import { FC, ReactElement } from 'react';

const newsDetail = {
  img: '/images/mountain.png',
  createdAt: '15 Agustus 2024',
  location: 'Bandung',
  title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
  content:
    'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
};
const news = [
  {
    img: '/images/news.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
  {
    img: '/images/news-2.png',
    createdAt: '15 Agustus 2024',
    location: 'Bandung',
    title: 'Keindahan Desa Wisata Bojongsari Menarik Wisatawan Lokal',
    content:
      'Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa Barat, semakin mendapatkan perhatian sebagai destinasi wisata unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik, mulai dari pemandangan alam yang memukau...',
  },
];

export const NewsDetailModule: FC = (): ReactElement => {
  return (
    <>
      <section className="container mx-auto w-full flex flex-col gap-8 pt-10 pb-20">
        <h1 className="text-4xl font-bold text-primary-70%">Informasi</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 w-full flex flex-col gap-8">
            <Image
              src={newsDetail.img}
              alt="mountain"
              width={913}
              height={425}
              quality={100}
              className="w-full max-h-[425px] aspect-video rounded"
            />
            <h2 className="text-3xl text-primary-70%">
              <span>{newsDetail.location},</span>
              <span> {newsDetail.createdAt}</span>
              <span> - </span>
              <span>{newsDetail.title}</span>
            </h2>
            <p className="text-lg">
              {newsDetail.content}
              Desa Wisata Bojongsari, yang terletak di Kabupaten Bandung, Jawa
              Barat, semakin mendapatkan perhatian sebagai destinasi wisata
              unggulan di Indonesia. Desa ini menawarkan berbagai daya tarik,
              mulai dari pemandangan alam yang memukau, budaya lokal yang kaya,
              hingga kerajinan tangan khas yang diminati oleh wisatawan. Desa
              Bojongsari dikenal dengan hamparan sawah yang menghijau dan udara
              segar pegunungan yang menyegarkan. Selain keindahan alamnya, desa
              ini juga mempertahankan tradisi lokal seperti upacara adat,
              tari-tarian, dan pembuatan kerajinan tangan yang diwariskan secara
              turun-temurun. Para wisatawan dapat mengikuti berbagai aktivitas
              seru seperti bersepeda di sekitar desa, belajar menenun, hingga
              mencicipi kuliner tradisional yang otentik. &quot;Kami sangat
              senang melihat antusiasme wisatawan terhadap desa kami. Banyak
              yang datang untuk merasakan kehidupan pedesaan yang tenang dan
              autentik,&quot; ujar Kepala Desa Bojongsari, Ibu Siti Nuraeni.
              Beliau juga menambahkan bahwa desa ini terus berupaya meningkatkan
              fasilitas dan layanan untuk kenyamanan pengunjung. Untuk mendukung
              pariwisata berkelanjutan, warga desa aktif terlibat dalam menjaga
              kebersihan dan keasrian lingkungan. Dengan semakin banyaknya
              kunjungan wisatawan, perekonomian desa juga mengalami peningkatan,
              terutama dari sektor penginapan, kuliner, dan kerajinan tangan.
              Pemerintah Kabupaten Bandung mendukung penuh pengembangan Desa
              Wisata Bojongsari dengan menyediakan pelatihan bagi warga dalam
              pengelolaan pariwisata serta pemasaran produk lokal. &quot;Kami
              berharap Desa Bojongsari bisa menjadi contoh desa wisata yang
              sukses dan memberikan manfaat yang besar bagi masyarakat
              setempat,&quot; kata Bupati Bandung. Dengan berbagai potensi yang
              dimiliki, Desa Wisata Bojongsari diprediksi akan terus berkembang
              dan menjadi salah satu destinasi wisata favorit di Indonesia.
            </p>
          </div>
          <aside className="flex flex-col w-full gap-4">
            <h1 className="text-3xl text-primary-70%">Informasi Lainnya</h1>
            {news.map((item, index) => (
              <div
                key={index}
                className="border border-neutral-60% rounded-lg shadow-md flex flex-col gap-3 cursor-pointer bg-white"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={515}
                  height={200}
                  className="h-[200px] w-full aspect-video rounded-lg"
                />
                <div className="flex flex-col gap-3 items-center justify-center p-3">
                  <h1 className="text-xl text-primary-70%">
                    <span>{item.location},</span>
                    <span> {item.createdAt}</span>
                    <span> - </span>
                    <span>{item.title}</span>
                  </h1>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
};

import { NextPage } from 'next';
import { ReactElement } from 'react';
import { ToursPageModule } from './_modules';
import { getAllDestinations } from '@pkm/libs/actions/tourism';

// const tours = [
//   {
//     id: 'asdad',
//     images: ['/images/angklung.png'],
//     ticketPrice: 1000,
//     status: 'active',
//     name: 'pertunjukan',
//     description:
//       'Pertujukan alat musik tradisional yang terbuat dari bambu. Alat musik ini dimainkan dengan cara digoyangkan sehingga menghasilkan suara dari tabung-tabung bambu yang disusun sesuai dengan tangga nada.',
//   },
//   {
//     id: 'asdad22',
//     images: ['/images/lake.png'],
//     ticketPrice: 1000,
//     status: 'active',
//     name: 'Danau',
//     description:
//       'Danau sering menjadi pusat perhatian wisatawan karena keindahannya yang alami. Air yang tenang dan jernih, dikelilingi oleh pepohonan hijau, menciptakan pemandangan yang menenangkan dan memanjakan mata. ',
//   },
//   {
//     id: 'asdad3',
//     images: ['/images/rice-field.jpeg'],
//     ticketPrice: 1000,
//     status: 'active',
//     name: 'Fotogenik Sawah',
//     description:
//       'Fotogenik Sawah adalah salah satu atraksi utama di destinasi wisata desa yang menawarkan keindahan lanskap pedesaan yang menawan. Berikut adalah penjelasan tentang Fotogenik Sawah sebagai daya tarik wisata.',
//   },
//   {
//     id: 'asdad4',
//     images: ['/images/angklung.png'],
//     ticketPrice: 1000,
//     status: 'active',
//     name: 'pertunjukan',
//     description:
//       'Pertujukan alat musik tradisional yang terbuat dari bambu. Alat musik ini dimainkan dengan cara digoyangkan sehingga menghasilkan suara dari tabung-tabung bambu yang disusun sesuai dengan tangga nada.',
//   },
// ];

const ToursPage: NextPage = async (): Promise<ReactElement> => {
  const { data } = await getAllDestinations();

  return <ToursPageModule data={data} />;
};

export default ToursPage;

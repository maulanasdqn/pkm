type TProgram = {
  title: string;
  desc: string;
};

export type TDataProgram = {
  title: string;
  imgSrc: string;
  slug: string;
  data: TProgram[];
};

export const dataPrograms: TDataProgram[] = [
  {
    title: 'Penanggulangan stunting',
    imgSrc: '/images/two-people.svg',
    slug: 'penanggulangan-stunting',
    data: [
      {
        title: 'Insentif Kader pembangunan manusia',
        desc: 'Program ini bertujuan untuk memberikan dukungan dan insentif kepada kader pembangunan manusia yang aktif berperan dalam membantu peningkatan kualitas hidup warga, terutama terkait pencegahan stunting dan peningkatan kesejahteraan anak-anak di desa.',
      },
      {
        title: 'Insentif dan Operasional kader posyandu',
        desc: 'Program ini memberikan insentif dan dukungan operasional kepada kader Posyandu yang berperan penting dalam memberikan layanan kesehatan dasar kepada balita dan ibu hamil di desa, guna memastikan kesehatan dan gizi yang optimal.',
      },
      {
        title: 'konvergensi stunting',
        desc: 'Program ini bertujuan untuk menyelaraskan dan mengintegrasikan berbagai upaya penanganan stunting melalui kolaborasi antar sektor di desa, termasuk pendidikan, kesehatan, dan pemberdayaan masyarakat, untuk mencegah dan mengurangi kasus stunting.',
      },
      {
        title: 'pembangunan posyandu RW 04',
        desc: 'Program ini difokuskan pada pembangunan fasilitas Posyandu di RW 04, guna memperluas akses layanan kesehatan dasar bagi masyarakat di wilayah tersebut, terutama untuk ibu hamil dan anak balita.',
      },
      {
        title: 'Insentif guru paud Binaan Desa (Paud Sinarasih 05)',
        desc: 'Program ini memberikan insentif kepada para guru PAUD di Paud Sinarasih 05 sebagai bentuk apresiasi dan dukungan atas peran mereka dalam pendidikan anak usia dini, yang merupakan dasar penting dalam perkembangan anak.',
      },
    ],
  },
  {
    title: 'Ketahanan Pangan',
    imgSrc: '/images/wheat.svg',
    slug: 'ketahanan-pangan',
    data: [
      {
        title: 'Pembangunan Lumbung pangan desa',
        desc: 'Pembangunan Lumbung Pangan Desa bertujuan untuk menyediakan fasilitas penyimpanan bahan pangan yang memadai di tingkat desa. Program ini bertujuan meningkatkan ketahanan pangan masyarakat dengan mengantisipasi kekurangan pangan selama musim paceklik atau kondisi darurat.',
      },
    ],
  },
  {
    title: 'BLT Dana Desa',
    imgSrc: '/images/hand.svg',
    slug: 'blt-dana-desa',
    data: [
      {
        title: 'Bantuan Langsung Tunai Dana Desa',
        desc: 'BLT Dana Desa (Bantuan Langsung Tunai Dana Desa) adalah program bantuan sosial dari pemerintah Indonesia yang disalurkan menggunakan alokasi Dana Desa untuk membantu masyarakat desa yang terdampak oleh situasi tertentu',
      },
    ],
  },
  {
    title: 'Pembangunan Desa',
    imgSrc: '/images/building.svg',
    slug: 'pembangunan-desa',
    data: [
      {
        title: 'Rehabilitasi kantor desa',
        desc: 'Program ini bertujuan untuk memperbaiki dan meningkatkan kondisi fisik kantor desa agar lebih layak digunakan. Rehabilitasi mencakup perbaikan struktural, pengecatan, serta pengadaan fasilitas baru untuk mendukung pelayanan masyarakat.',
      },
      {
        title: 'Pembangunan tembok penahan tanah',
        desc: 'Program ini dilakukan untuk membangun tembok penahan di area rawan longsor guna mencegah erosi dan tanah longsor. Hal ini penting untuk menjaga keselamatan warga dan infrastruktur desa di sekitar lokasi tersebut.',
      },
      {
        title: 'Rehabilitasi perkerasan jalan/gang rabat beton',
        desc: 'Program ini fokus pada peningkatan kualitas jalan atau gang di desa dengan menggunakan rabat beton, memperbaiki jalan yang rusak untuk memperlancar mobilitas warga serta meningkatkan aksesibilitas antar wilayah.',
      },
      {
        title: 'Normalisasi drainase/Saluran pembuangan air',
        desc: 'Program ini bertujuan untuk memperbaiki dan membersihkan saluran drainase yang tersumbat atau rusak. Normalisasi ini penting untuk mencegah banjir serta menjaga sistem pembuangan air desa agar berfungsi dengan baik.',
      },
    ],
  },
  {
    title: 'Pemberdayaan Masyarakat',
    imgSrc: '/images/people.svg',
    slug: 'pemberdayaan-masyarakat',
    data: [
      {
        title: 'Insentif guru ngaji',
        desc: 'Program ini memberikan dukungan finansial berupa insentif kepada para guru ngaji sebagai bentuk apresiasi atas peran mereka dalam pendidikan agama di desa, membantu menjaga tradisi keagamaan dan mendidik generasi muda.',
      },
      {
        title: 'Bantuan penunjang operasional keagamaan',
        desc: 'Program ini menyediakan dana bantuan untuk mendukung kegiatan operasional lembaga keagamaan di desa, seperti masjid, mushola, atau kegiatan-kegiatan keagamaan lainnya agar dapat berjalan lancar dan berkelanjutan.',
      },
      {
        title: 'pelatihan manajemen BUMDES',
        desc: 'Program ini bertujuan untuk memberikan pelatihan keterampilan manajemen kepada pengelola Badan Usaha Milik Desa (BUMDES), sehingga dapat meningkatkan efektivitas dan efisiensi operasional BUMDES dalam mengembangkan ekonomi desa.',
      },
      {
        title: 'Pemutakhiran IDM Berbasis SDGs',
        desc: 'Program ini fokus pada pemutakhiran Indeks Desa Membangun (IDM) dengan pendekatan berbasis Sustainable Development Goals (SDGs), guna mengukur dan meningkatkan kualitas pembangunan desa secara lebih komprehensif dan berkelanjutan.',
      },
      {
        title: 'Sosialisasi pencegahan narkoba',
        desc: 'Program ini menyediakan dana bantuan untuk mendukung kegiatan operasional lembaga keagamaan di desa, seperti masjid, mushola, atau kegiatan-kegiatan keagamaan lainnya agar dapat berjalan lancar dan berkelanjutan.',
      },
      {
        title: 'Pelatihan menjahit',
        desc: 'Program ini menyediakan pelatihan keterampilan menjahit kepada warga desa, terutama bagi perempuan, dengan tujuan untuk meningkatkan kapasitas ekonomi warga melalui keterampilan yang dapat menghasilkan pendapatan tambahan.',
      },
      {
        title: 'Pelatihan Sosialisasi tanggap bencana skala desa',
        desc: 'Program ini memberikan edukasi dan pelatihan kepada masyarakat desa tentang bagaimana merespons dan menangani bencana alam dengan cepat dan tepat, guna meminimalkan risiko dan dampak bencana.',
      },
      {
        title: 'biaya operasional penanganan TBC',
        desc: 'Program ini menyediakan dana untuk mendukung operasional penanganan penyakit Tuberkulosis (TBC) di desa, termasuk biaya deteksi, pengobatan, dan sosialisasi pencegahan agar penularan TBC dapat dikendalikan.',
      },
    ],
  },
  {
    title: 'Operasional Pemerintah Desa',
    imgSrc: '/images/book.svg',
    slug: 'operasional-pemerintah-desa',
    data: [
      {
        title: 'biaya koordinasi',
        desc: 'Program ini mencakup alokasi dana untuk mendukung kegiatan koordinasi antar perangkat desa, lembaga terkait, dan masyarakat dalam merencanakan serta melaksanakan berbagai program pembangunan dan pelayanan desa secara efektif.',
      },
      {
        title: 'biaya Penanggulangan kerawanan sosial',
        desc: ' Program ini bertujuan untuk mengatasi masalah kerawanan sosial di desa, seperti kemiskinan, pengangguran, dan konflik sosial. Kegiatan ini melibatkan pemberian bantuan kepada kelompok rentan dan upaya meningkatkan kesejahteraan serta keharmonisan masyarakat.',
      },
      {
        title: 'biaya kegiatan khusus',
        desc: 'Program ini menyediakan dana untuk mendukung kegiatan olahraga desa, termasuk pengadaan perlengkapan olahraga, pemberian penghargaan kepada atlet desa yang berprestasi, serta sosialisasi untuk mendorong partisipasi masyarakat dalam kegiatan olahraga dan pengembangan potensi atlet lokal.',
      },
    ],
  },
  {
    title: 'Penanggulangan Bencana',
    imgSrc: '/images/shield.svg',
    slug: 'penanggulangan-bencana',
    data: [
      {
        title: 'penanggulangan bencana di desa',
        desc: ' Program yang untuk mempersiapkan masyarakat desa dalam menghadapi dan mengatasi bencana alam seperti banjir, tanah longsor, gempa bumi, dan kebakaran hutan. Kegiatan ini mencakup peningkatan kapasitas masyarakat melalui pelatihan tanggap bencana, sosialisasi mitigasi risiko, serta penyusunan rencana evakuasi.',
      },
    ],
  },
];

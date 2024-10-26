import * as React from 'react';

export const ProgramDescSection: React.FC = (): React.ReactElement => {
  return (
    <section className="py-14 container space-y-6 text-center">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-primary font-bold">
        Program Kegiatan
      </h1>
      <p className="text-primary text-sm md:text-base">
        Program kegiatan desa adalah upaya bersama untuk meningkatkan
        kesejahteraan dan kualitas hidup masyarakat. Melalui berbagai program
        seperti pelatihan, pemberdayaan ekonomi, kesehatan, dan lingkungan,
        pemerintah desa berkomitmen untuk memberdayakan warga, memajukan potensi
        lokal, serta menciptakan lingkungan yang lebih sejahtera dan
        berkelanjutan. Partisipasi aktif dari masyarakat dalam program-program
        ini sangat penting agar setiap kegiatan dapat memberikan manfaat nyata
        dan berkelanjutan bagi seluruh warga desa.
      </p>
    </section>
  );
};

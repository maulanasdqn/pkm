import * as React from 'react';
import { NextPage } from 'next';
import { DetailProgramModule } from './_modules';
import { dataPrograms, TDataProgram } from '@pkm/libs/entities';

const ProgramDetailPage: NextPage<{ params: { slug: string } }> = ({
  params: { slug },
}): React.ReactElement => {
  const dataProgram = dataPrograms.find((item) => item.slug === slug);
  return <DetailProgramModule dataProgram={dataProgram as TDataProgram} />;
};

export default ProgramDetailPage;

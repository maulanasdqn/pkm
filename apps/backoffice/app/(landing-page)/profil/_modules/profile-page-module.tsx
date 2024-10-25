import * as React from 'react';
import {
  MisiSection,
  ProfileSection,
  StructureSection,
  VisiSection,
} from './sections';

export const ProfilePageModule: React.FC = (): React.ReactElement => {
  return (
    <>
      <ProfileSection />
      <StructureSection />
      <VisiSection />
      <MisiSection />
    </>
  );
};

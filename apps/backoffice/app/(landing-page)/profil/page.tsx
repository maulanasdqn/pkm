import * as React from 'react';
import { NextPage } from 'next';
import { ProfilePageModule } from './_modules';

const ProfilePage: NextPage = (): React.ReactElement => {
  return (
    <>
      <ProfilePageModule />
    </>
  )
};

export default ProfilePage;

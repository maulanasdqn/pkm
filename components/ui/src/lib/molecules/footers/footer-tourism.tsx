import { FC, ReactElement } from 'react';
import { Button } from '../../atoms/button/button';
import {
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { NavLinks } from '../../atoms';
export const FooterTourism: FC = (): ReactElement => {
  return (
    <>
      <footer className="bg-primary-90% w-full text-white px-5 py-10 md:p-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 container mx-auto py-8">
          <div className="flex flex-col justify-start items-start md:items-center w-full gap-8">
            <h1 className="text-3xl font-semibold">Terhubung dengan kami</h1>
            <div className="flex gap-3">
              <Button
                size="icon"
                className="bg-gradient-to-tr from-yellow-300 via-red to-fuchsia-400 hover:from-yellow-400 hover:via-red-60% hover:to-fuchsia-500"
                href="https://www.instagram.com"
              >
                <InstagramOutlined className="text-3xl" />
              </Button>
              <Button
                size="icon"
                className="bg-red hover:bg-red-60% active:bg-red-70% focus:bg-red-60%"
                href="https://www.youtube.com"
              >
                <YoutubeOutlined className="text-3xl" />
              </Button>
              <Button
                size="icon"
                className="bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-700"
                href="https://www.whatsapp.com"
              >
                <WhatsAppOutlined className="text-2xl ml-0.5" />
              </Button>
              <Button
                size="icon"
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
                href="https://www.facebook.com"
              >
                <FacebookOutlined className="text-3xl ml-0.5" />
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 md:items-center md:justify-center">
            <h1 className="text-2xl font-semibold md:sr-only">Menu cepat</h1>
            <NavLinks component="footer" apps="tourism" />
          </div>
          <div className="flex flex-col w-full gap-8">
            <h1 className="text-2xl font-semibold">Alamat</h1>
            <p className="text-lg">
              Jln.Bojongsari No.70 Kec.Bojongsoang Kab.Bandung, Jawa Barat
            </p>
          </div>
        </div>
      </footer>
      <div className="bg-primary-90% w-full border-t text-center border-white text-white py-8">
        <h6> © 2024 Wisata Desa Bojongsari.</h6>
      </div>
    </>
  );
};

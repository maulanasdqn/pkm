import Image from 'next/image';
import { FC, Fragment, ReactElement } from 'react';
import { FormContact } from './form-contact';
import {
  Accordion,
  CardMarket,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@pkm/ui';
import { UserOutlined } from '@ant-design/icons';

export const ContactModule: FC = (): ReactElement => {
  return (
    <Fragment>
      <div className="w-full flex justify-between gap-[6.2rem] items-center rounded-lg bg-neutral-10% px-8 2xl:py-24 md:py-14 shadow-lg">
        <Image
          src="/images/contact-1.png"
          alt="contact"
          width={700}
          height={700}
          quality={100}
          className="max-w-[619px] w-full 2xl:min-w-[619px] md:min-w-[500px]"
        />

        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="2xl:text-5xl md:text-3xl">Kontak Kami</h2>
            <p className="2xl:text-2xl md:text-xl">
              Jika anda memiliki pertanyaan atau ingin mendapatkan informasi
              lebih lanjut, silahkan isi formulir di bawah ini
            </p>
          </div>

          <FormContact />
        </div>
      </div>

      <div className="w-full flex justify-between items-center py-6">
        <div className="flex flex-col gap-2">
          <h3 className="pl-6 font-bold text-3xl">
            Pertanyaan yang sering diajukan
          </h3>
          <div className="w-full flex flex-col rounded-lg bg-neutral-10% max-w-[868px] min-h-[323px] p-4 shadow-lg">
            {Array.from({ length: 4 }).map((_, index) => (
              <Accordion
                key={index}
                title="Bagaimana cara mendaftarkan produk untuk dijual oleh pihak desa"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                vel sit eius dicta suscipit officia rem animi? Quam molestias
                explicabo veniam voluptatum quia illum labore fuga magnam ipsum
                reiciendis consequatur consequuntur temporibus error, molestiae
                delectus numquam amet. Vel eligendi voluptatum impedit
                blanditiis cum eos consectetur laboriosam facilis ea totam, nisi
                commodi fugit fugiat, aspernatur veniam praesentium minima
                voluptates reiciendis omnis sunt repudiandae accusamus libero
                soluta! Deserunt asperiores perspiciatis delectus nobis,
                suscipit itaque dolor atque repellat, repudiandae assumenda id
                eum nam deleniti maiores, dignissimos sit facilis voluptatem
                libero nesciunt minus. Vel, assumenda recusandae! Accusantium
                ipsum sed nemo a. Similique, quam veritatis?
              </Accordion>
            ))}
          </div>
        </div>

        <Image
          src="/images/contact-2.png"
          alt="contact-2"
          width={700}
          height={700}
          quality={100}
          className="max-w-[464px] w-full 2xl:min-w-[464px] md:min-w-[350px]"
        />
      </div>

      <div className="w-full px-20 flex justify-center items-center">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full max-w-[730px]"
        >
          <CarouselPrevious className="disabled:cursor-not-allowed" />
          <CarouselContent className="py-6 px-2.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <CarouselItem key={i}>
                <div className="flex flex-col max-w-[710px] min-w-[710px] justify-center items-center gap-4 px-6 py-8 rounded-lg shadow-md bg-neutral-10%">
                  <UserOutlined className="text-5xl fill-black" />

                  <p className="text-2xl text-center">
                    Saya sangat senang bisa mendaftarkan produk saya ke usaha
                    desa. Ini adalah langkah besar untuk memperkenalkan produk
                    lokal kami ke pasar yang lebih luas. Dengan adanya dukungan
                    usaha dari desa, saya yakin produk kami dapat berkembang dan
                    dikenal oleh lebih banyak orang. Terimakasih atas kesempatan
                    dan fasilitas yang telah disediakan, semoga kolaborasi ini
                    mwmbawa manfaat besar bagi kami dan masyarakat sekitar.
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="disabled:cursor-not-allowed" />
        </Carousel>
      </div>
    </Fragment>
  );
};

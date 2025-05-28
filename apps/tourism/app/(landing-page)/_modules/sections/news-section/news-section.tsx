'use client';
import { getAllInformations } from '@pkm/libs/actions/tourism';
import { TInformationSchema } from '@pkm/libs/entities';
import { Button } from '@pkm/ui';
import Image from 'next/image';
import {
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactElement,
} from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale/id';
import Link from 'next/link';

export const NewsSection: FC = (): ReactElement => {
  const [data, setData] = useState<TInformationSchema[]>([]);
  const [featuredData, setFeaturedData] = useState<TInformationSchema | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const formattedDate = useMemo(() => {
    if (data.length === 0) return null;
    return formatDistanceToNow(featuredData?.createdAt as Date, {
      locale: id,
      addSuffix: true,
    });
  }, [data, featuredData]);

  useEffect(() => {
    const fetchData = async () => {
      const destinations = await getAllInformations({ perPage: 6 });

      if (destinations.status.ok) {
        setData(destinations.data.slice(1, 5));
        setFeaturedData(destinations.data[0]);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="-mt-[7rem] lg:-mt-[14rem] relative z-20 rounded-lg drop-shadow-2xl bg-white container mb-20 mx-auto p-6">
      {/* Header */}
      <div className="flex flex-row w-full gap-4 items-center mb-6">
        <h2 className="text-xl md:text-3xl whitespace-nowrap font-semibold text-center md:text-left">
          Berita Terkini
        </h2>
        <div className="h-[1px] w-full bg-gray" />
        <Button
          href="/news"
          variant="text"
          color="primary"
          className="border border-primary mt-4 md:mt-0"
        >
          Lihat Semua Berita
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Featured News */}
        <div className="flex-1">
          <div className="relative w-full">
            {isLoading ? (
              <div className="w-full h-[480px] bg-gray rounded animate-pulse" />
            ) : (
              <div className="size-[480px]">
                <Image
                  src={featuredData?.image ?? '/images/news.png'}
                  alt="News Image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <div className="absolute bottom-0 space-y-2 left-0 bg-black bg-opacity-50 p-4 w-full text-white">
              {isLoading ? (
                <>
                  <div className="w-[60%] bg-gray animate-pulse rounded h-[28px]" />
                  <div className="flex items-center justify-between">
                    <div className="w-[30%] bg-gray animate-pulse rounded h-[28px]" />
                    <div className="w-[40%] bg-gray animate-pulse rounded h-[28px]" />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">{featuredData?.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{formattedDate}</p>
                    <Button
                      href={`/news/${featuredData?.id}`}
                      variant="primary"
                    >
                      Baca Selengkapnya
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Latest News List */}
        <div className="w-full md:w-1/3">
          <h3 className="text-2xl font-bold ml-3 mb-3">Terbaru</h3>
          <div className="space-y-4">
            {isLoading ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-3 space-y-3 rounded hover:bg-primary-10%"
                  >
                    <h4 className="text-base font-semibold bg-gray animate-pulse h-4 w-[70%]"></h4>
                    <p className="text-sm text-gray-500 bg-gray animate-pulse h-4 w-[40%]"></p>
                    <div className="h-[1px] w-full bg-gray" />
                  </div>
                ))}
              </>
            ) : (
              <div className="flex flex-col gap-3">
                {data.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <div className="p-3 space-y-3 rounded hover:bg-primary-10%">
                      <h4 className="text-base font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(item?.createdAt as Date, {
                          locale: id,
                          addSuffix: true,
                        })}
                      </p>
                      <div className="h-[1px] w-full bg-gray" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

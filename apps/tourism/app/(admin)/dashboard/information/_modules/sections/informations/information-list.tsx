'use client';
import { cn } from '@pkm/libs/clsx';
import {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { InformationItem, InformationItemSkeleton } from './information-item';
import { getAllInformations } from '@pkm/libs/actions/tourism';
import { TInformationSchema, TMetaResponse } from '@pkm/libs/entities';
import { useSearchParams } from 'next/navigation';
import { Paginations } from './paginations';

const useInformationPagination = () => {
  const [dataState, setDataState] = useState<{
    status: {
      [key: string]: boolean;
    };
    data: TInformationSchema[];
    meta?: TMetaResponse;
  } | null>(null);
  const searchParams = useSearchParams();
  const pageNumberLimit = 6;
  const currentPage = Number(searchParams?.get('page')) || 1;

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllInformations({
        perPage: pageNumberLimit,
        page: currentPage,
      });
      setDataState(res);
    } catch (err) {
      console.error(err);
      throw new Error('Something went wrong');
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    dataState,
    pageNumberLimit,
    currentPage,
  };
};

export const InformationListSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  const { dataState, currentPage, pageNumberLimit } =
    useInformationPagination();
  return (
    <section
      className={cn('mx-auto px-10 py-5 grid grid-cols-3 gap-5', className)}
    >
      {dataState ? (
        dataState?.data.map((item, index) => (
          <InformationItem key={index} item={item} />
        ))
      ) : (
        <InformationListSkeleton />
      )}
      <div className="col-span-3 w-full justify-center items-center">
        <Paginations
          currentPage={currentPage}
          pageNumberLimit={pageNumberLimit}
          lastPage={dataState?.meta?.totalPage}
        />
      </div>
    </section>
  );
};

const InformationListSkeleton: FC = (): ReactElement => {
  return (
    <Fragment>
      {Array.from({ length: 6 }).map((_, index) => (
        <InformationItemSkeleton key={index} />
      ))}
    </Fragment>
  );
};

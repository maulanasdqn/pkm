import { cn } from '@pkm/libs/clsx';
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@pkm/ui';

interface PaginationsProps {
  currentPage: number;
  lastPage: number | undefined;
  pageNumberLimit: number;
}

export const Paginations: React.FC<PaginationsProps> = ({
  currentPage,
  lastPage,
  pageNumberLimit,
}) => {
  const pages = [];
  if (lastPage) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
  }

  const totalPages = pages.length;

  const calculateLimits = () => {
    const halfLimit = Math.floor(pageNumberLimit / 2);

    if (currentPage > halfLimit) {
      const maxPageNumberLimit = Math.min(currentPage + halfLimit, totalPages);
      const minPageNumberLimit = Math.max(
        maxPageNumberLimit - pageNumberLimit + 1,
        1
      );

      return { minPageNumberLimit, maxPageNumberLimit };
    } else {
      return {
        minPageNumberLimit: 1,
        maxPageNumberLimit: Math.min(pageNumberLimit, totalPages),
      };
    }
  };

  const { minPageNumberLimit, maxPageNumberLimit } = calculateLimits();

  const renderPageNumbers = pages.map((number, index) => {
    if (number >= minPageNumberLimit && number <= maxPageNumberLimit) {
      return (
        <PaginationLink
          key={index}
          href={`?page=${number}`}
          isActive={currentPage === number}
          className={cn(
            'hidden md:flex',

            currentPage === number
              ? 'pointer-events-none'
              : 'pointer-events-auto hover:bg-primary-20%'
          )}
        >
          {number}
        </PaginationLink>
      );
    } else {
      return null;
    }
  });

  return (
    <Pagination className="flex justify-center py-8">
      <PaginationContent>
        <PaginationPrevious
          href={`?page=${currentPage - 1}`}
          className={
            currentPage === 1
              ? 'pointer-events-none text-primary-40%'
              : 'pointer-events-auto hover:bg-primary-20%'
          }
        />
        {renderPageNumbers}
        <PaginationNext
          href={`?page=${currentPage + 1}`}
          className={
            currentPage === totalPages
              ? 'pointer-events-none text-primary-40%'
              : 'pointer-events-auto hover:bg-primary-20%'
          }
        />
      </PaginationContent>
    </Pagination>
  );
};

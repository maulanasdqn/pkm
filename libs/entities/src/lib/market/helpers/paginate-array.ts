type TPaginateArray = {
  page: number;
  totalPages: number;
  maxButtons?: number;
};

export const generatePageArray = ({
  maxButtons = 4,
  ...props
}: TPaginateArray): number[] => {
  const pages: number[] = [];
  const totalPages = props.totalPages;
  const currentPage = props.page;
  let startPage: number, endPage: number;

  if (totalPages <= maxButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const middle = Math.floor(maxButtons / 2);
    if (currentPage <= middle) {
      startPage = 1;
      endPage = maxButtons;
    } else if (currentPage + middle >= totalPages) {
      startPage = totalPages - maxButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middle;
      endPage = currentPage + middle - 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
};

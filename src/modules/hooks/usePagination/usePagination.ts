import { useCallback, useMemo, useState } from 'react';

type Pagination = {
  pageSize: number;
  data: Array<any>;
};

export const usePagination = ({ data, pageSize }: Pagination) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / pageSize);

  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * pageSize;
    const end = begin + pageSize;
    return data.slice(begin, end);
  }, [currentPage, data, pageSize]);

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, page);
      setCurrentPage(() => Math.min(pageNumber, maxPage));
    },
    [maxPage]
  );

  return { next, prev, jump, currentData, currentPage, maxPage };
};

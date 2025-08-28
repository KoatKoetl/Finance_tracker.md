import { useTranslation } from "react-i18next";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  const { t } = useTranslation();

  const getPageNumbers = () => {
    if (totalPages <= 2)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const showEllipsisStart = totalPages > 2 && currentPage > 2;
  const showEllipsisEnd =
    totalPages > 2 && currentPage > 2 && currentPage < totalPages - 1;

  return (
    <Pagination className="mt-auto">
      <PaginationContent className="flex flex-wrap justify-center">
        <PaginationItem className="order-1 sm:order-none">
          <PaginationPrevious
            size=""
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.max(currentPage - 1, 1));
            }}
            title={t("pagination.previous")}
            className="hover:bg-gray-100"
          />
        </PaginationItem>

        <div className="flex-row items-center justify-center w-full sm:w-auto gap-1 flex order-0 sm:order-none">
          {showEllipsisStart && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          {getPageNumbers().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                size=""
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                className={`${page === currentPage ? "" : "hover:bg-gray-100"}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {showEllipsisEnd && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
        </div>

        <PaginationItem className="order-2 sm:order-none">
          <PaginationNext
            size=""
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.min(currentPage + 1, totalPages));
            }}
            title={t("pagination.next")}
            className="hover:bg-gray-100"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;

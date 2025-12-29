"use client";

import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function getVisiblePageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: number[] = [];
  
  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) {
      pages.push(i);
    }
    pages.push(-1);
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(1);
    pages.push(-1);
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push(-1);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push(-1);
    pages.push(totalPages);
  }

  return pages;
}

function getStartEndIndex(currentPage: number, pageSize: number, total: number) {
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  return { start, end };
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  className = "",
}: PaginationProps) {
  if (totalPages === 0) {
    return null;
  }

  const visiblePages = getVisiblePageNumbers(currentPage, totalPages);
  const { start, end } = getStartEndIndex(currentPage, pageSize, total);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={`flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="whitespace-nowrap">
          Showing {start}-{end} of {total}
        </span>
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline">per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 px-2 py-1 text-sm border border-light rounded-md bg-background text-dark-blue focus:outline-none focus:border-input-focus focus:ring-2 focus:ring-input-focus-ring"
            aria-label="Items per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          aria-label="Previous page"
          className="h-10 lg:h-8 px-4 lg:px-3 text-sm lg:text-sm"
        >
          <span className="hidden lg:inline">Previous</span>
          <span className="lg:hidden">Prev</span>
        </Button>

        <div className="hidden lg:flex items-center gap-1">
          {visiblePages.map((page, index) => {
            if (page === -1) {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-muted-foreground"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isCurrentPage = page === currentPage;
            return (
              <Button
                key={page}
                variant={isCurrentPage ? "primary" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={isCurrentPage ? "page" : undefined}
                className="h-8 w-8 p-0 min-w-[2rem]"
              >
                {page}
              </Button>
            );
          })}
        </div>

        <div className="lg:hidden text-sm text-muted-foreground px-2">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          aria-label="Next page"
          className="h-10 lg:h-8 px-4 lg:px-3 text-sm lg:text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

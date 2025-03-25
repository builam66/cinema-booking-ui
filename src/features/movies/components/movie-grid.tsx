import React, { ReactNode } from 'react';
import MovieCard from './movie-card';
import { Movie } from '@/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/pagination';
import { Skeleton } from '@/components/skeleton';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
  isLoading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  title,
  itemsPerPage = 8,
  currentPage = 1,
  onPageChange,
  totalPages = 1,
  isLoading = false
}) => {
  const renderPagination = () => {
    if (!onPageChange || totalPages <= 1) return null;

    const renderPageNumbers = () => {
      const pageNumbers: ReactNode[] = [];

      // Logic for showing page numbers with ellipsis
      if (totalPages <= 7) {
        // If we have 7 or fewer pages, show all pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Always show first page
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              isActive={1 === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        // Add ellipsis if current page is > 3
        if (currentPage > 3) {
          pageNumbers.push(
            <PaginationItem key="start-ellipsis">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Show pages around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={i === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i);
                }}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }

        // Add ellipsis if current page is < totalPages - 2
        if (currentPage < totalPages - 2) {
          pageNumbers.push(
            <PaginationItem key="end-ellipsis">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Always show last page
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              isActive={totalPages === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }

      return pageNumbers;
    };

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
          )}

          {renderPageNumbers()}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[320px] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ));
  };

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-medium mb-6">{title}</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? renderSkeletons()
          : movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>

      {!isLoading && movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No movies found.</p>
        </div>
      )}

      {!isLoading && renderPagination()}
    </div>
  );
};

export default MovieGrid;

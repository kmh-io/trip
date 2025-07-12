"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export default function AppPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pagignationItems: number[] = [];
  if (totalPages == 1) {
    pagignationItems.push(currentPage)
  } else {
    if (currentPage + 1 == totalPages) {
      pagignationItems.push(currentPage - 2);
      pagignationItems.push(currentPage - 1);
      pagignationItems.push(currentPage);
    } else if (currentPage == 1) {
      pagignationItems.push(currentPage);
      pagignationItems.push(currentPage + 1);
      pagignationItems.push(currentPage + 2);
    } else if (currentPage > 1 && currentPage < totalPages) {
      pagignationItems.push(currentPage - 1);
      pagignationItems.push(currentPage);
      pagignationItems.push(currentPage + 1);
    }
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
            href={createPageURL(currentPage - 1)}
          />
        </PaginationItem>
        {
          pagignationItems.map((page) => (
            <PaginationItem key={page}>
              {page === currentPage ? (
                <PaginationLink className="bg-primary text-primary-foreground">
                  {page}
                </PaginationLink>
              ) : (
                <PaginationLink href={createPageURL(page)}>{page}</PaginationLink>
              )}
            </PaginationItem>
          ))
        }
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage + 1 == totalPages}
            tabIndex={currentPage + 1 == totalPages ? -1 : undefined}
            className={
              currentPage + 1 == totalPages ? "pointer-events-none opacity-50" : undefined
            }
            href={createPageURL(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

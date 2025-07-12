import { fetchRouteList } from "../lib/mock-api";
import AppPagination from "./pagination";
import { RoutesTable } from "./routes-table";

interface RoutesListProps {
  query?: string;
  currentPage?: number;
}

export async function RoutesList({ query, currentPage }: RoutesListProps) {
  const routes = await fetchRouteList({
    limit: 10,
    page: currentPage || 1,
    search: query,
    order_by: "departur",
    sort_by: "asc",
  });

  if (!(routes.success && routes.data != null)) {
    return (
      <div className="">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          No routes found.
        </h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <RoutesTable routes={routes.data} />
      <AppPagination totalPages={routes.metaData?.totalPages || 1} />
    </div>
  )
}

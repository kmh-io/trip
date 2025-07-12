import { RoutesList } from "@/app/dashboard/[account_id]/(features)/routes/components/routes-list";
import withDashboardHeader from "@/app/dashboard/[account_id]/components/dashboard-header";
import { Suspense } from "react";
import { RoutesHeader } from "./components/routes-header";
import { RoutesTableSkeleton } from "./components/routes-table-skeleton";

export default async function RoutesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const Header = withDashboardHeader(RoutesHeader);

  return (
    <main className="container h-full space-y-2 mx-auto">
      <Header />
      <Suspense fallback={<RoutesTableSkeleton />}>
        <div className="pr-1 pl-1 ">
          <RoutesList query={query} currentPage={currentPage} />
        </div>
      </Suspense>
    </main>
  );
}

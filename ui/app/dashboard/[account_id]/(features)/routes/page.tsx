import { Suspense } from 'react';
import { RoutesHeader } from './components/routes-header';
import { RoutesTableSkeleton } from './components/routes-table-skeleton';
import withDashboardHeader from '@/app/dashboard/[account_id]/components/dashboard-header';
import { RoutesList } from '@/app/dashboard/[account_id]/(features)/routes/components/routes-list';

export default async function RoutesPage() {
  const Header = withDashboardHeader(RoutesHeader);

  return (
    <div className="container h-full mx-auto space-y-2">
      <Header />
      <Suspense fallback={<RoutesTableSkeleton />}>
        <RoutesList />
      </Suspense>
    </div>
  );
}

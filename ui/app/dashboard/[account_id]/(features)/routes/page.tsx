import { Suspense } from 'react';
import { RoutesList } from './components/routes-list';
import { RoutesHeader } from './components/routes-header';
import { RoutesTableSkeleton } from './components/routes-table-skeleton';

export default function RoutesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <RoutesHeader />
      <Suspense fallback={<RoutesTableSkeleton />}>
        <RoutesList />
      </Suspense>
    </div>
  );
}

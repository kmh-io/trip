import { getRouteById } from '../lib/data';
import { RouteDetail } from '../components/route-detail';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface RouteDetailPageProps {
  params: {
    account_id: string,
    route_id: string
  };
}

export default function RouteDetailPage({ params }: RouteDetailPageProps) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Suspense fallback={<RouteDetailSkeleton />}>
        <RouteDetailContent
          route_id={params.route_id}
          account_id={params.account_id}
        />
      </Suspense>
    </div>
  );
}

async function RouteDetailContent({ account_id, route_id }: {
  account_id: string,
  route_id: string
}) {
  const route = await getRouteById(route_id);

  if (!route) {
    notFound();
  }

  return <RouteDetail account_id={account_id} route={route} />;
}

function RouteDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-[300px] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    </div>
  );
}

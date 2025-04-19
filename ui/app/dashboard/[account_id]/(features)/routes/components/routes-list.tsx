import { getRoutes } from '../lib/data';
import { RoutesTable } from './routes-table';
import { RouteFilters } from './route-filters';

export async function RoutesList() {
  const routes = await getRoutes()

  return (
    <div className="space-y-4">
      <RouteFilters />
      <RoutesTable routes={routes} />
    </div>
  )
}

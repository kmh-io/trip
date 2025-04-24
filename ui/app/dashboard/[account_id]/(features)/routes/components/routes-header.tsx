import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function RoutesHeader() {
  return (
    <div
      className="flex-1 flex sm:flex-row justify-between items-start sm:items-center gap-2">
      {/*<RouteFilters />*/}
      <p className="text-muted-foreground">Manage transportation routes,
        schedules, and details.</p>
      <Button asChild>
        <Link href={'routes/new'}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Route
        </Link>
      </Button>
    </div>
  );
}

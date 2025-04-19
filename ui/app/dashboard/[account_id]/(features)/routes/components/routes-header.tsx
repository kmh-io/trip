import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function RoutesHeader() {
  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Routes</h1>
        <p className="text-muted-foreground">Manage transportation routes,
          schedules, and details.</p>
      </div>
      <Button asChild>
        <Link href={'routes/new'}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Route
        </Link>
      </Button>
    </div>
  );
}

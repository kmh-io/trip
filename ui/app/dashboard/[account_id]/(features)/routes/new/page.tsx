import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RouteForm } from "../components/route-form";
import { getCities, getOperators } from "../lib/mock-api";

interface NewRoutePageProps {
  params: {
    account_id: string;
  };
}

export default async function NewRoutePage({ params }: NewRoutePageProps) {
  const cities = await getCities();
  const operators = await getOperators();
  params = await params;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="p-0">
              <Link href={`/dashboard/${params.account_id}/routes`}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Create New Route
            </h1>
          </div>
          <p className="text-muted-foreground">
            Add a new transportation route to the system
          </p>
        </div>
      </div>

      <RouteForm cities={cities} operators={operators} />
    </div>
  );
}

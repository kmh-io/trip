"use client";

import { Suspense, useState } from "react";

import { RoutesList } from "./components/routes-list";
import { RouteFilters } from "./components/route-filters";
import { DateSelector } from "./components/date-selector";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoutesPage() {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-05-15"));

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Travel Routes</h1>
          <p className="text-muted-foreground">
            Browse available routes and book your next journey
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-[116px] w-full bg-muted/20 animate-pulse rounded-lg"></div>
          }
        >
          <DateSelector
            selectedDate={selectedDate}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <RouteFilters />
          <Suspense fallback={<RoutesListSkeleton />}>
            <RoutesList selectedDate={selectedDate} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function RoutesListSkeleton() {
  return (
    <div className="grid gap-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

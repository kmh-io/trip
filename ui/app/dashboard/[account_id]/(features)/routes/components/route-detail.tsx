'use client';

import {
  deleteRouteById
} from '@/app/dashboard/[account_id]/(features)/routes/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatDate, formatDuration } from '../lib/utils';
import type { IRoute } from '../lib/types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  MapPin,
  Trash2,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { RouteImages } from './route-images';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface RouteDetailProps {
  account_id: string;
  route: IRoute;
}

export function RouteDetail({ account_id, route }: RouteDetailProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="p-0">
              <Link href={`/dashboard/${account_id}/routes`}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Route Details</h1>
          </div>
          <p className="text-muted-foreground">View and manage route
            information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`${route.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  route and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={async () => {
                    const resp = await deleteRouteById(route.id);
                    if (!resp.success) {
                      toast.error(resp.message);
                    } else {
                      toast.success(resp.message);
                      router.push(`/dashboard/${account_id}/routes`);
                    }
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Route Information</CardTitle>
                <CardDescription>Basic route details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3
                      className="text-sm font-medium text-muted-foreground">Origin</h3>
                    <p className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {route.origin}
                    </p>
                  </div>
                  <div>
                    <h3
                      className="text-sm font-medium text-muted-foreground">Destination</h3>
                    <p className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {route.destination}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3
                      className="text-sm font-medium text-muted-foreground">Departure</h3>
                    <p className="flex items-center gap-1 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(route.departure)}
                    </p>
                  </div>
                  <div>
                    <h3
                      className="text-sm font-medium text-muted-foreground">Arrival</h3>
                    <p className="flex items-center gap-1 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(route.arrival)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3
                      className="text-sm font-medium text-muted-foreground">Duration</h3>
                    <p className="flex items-center gap-1 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {formatDuration(route.duration)}
                    </p>
                  </div>
                  <div>
                    <h3
                      className="text-sm font-medium text-muted-foreground">Transport
                      Type</h3>
                    <p className="mt-1">
                      <Badge variant="outline">{route.transportType}</Badge>
                    </p>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-sm font-medium text-muted-foreground">Operator</h3>
                  <p className="flex items-center gap-1 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {route.operator.name}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Station Information</CardTitle>
                <CardDescription>Departure and arrival
                  stations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3
                    className="text-sm font-medium text-muted-foreground">Departure
                    Station</h3>
                  <div className="mt-2 p-3 border rounded-md">
                    <p className="font-medium">{route.departureStation.name}</p>
{/*                    <p
                      className="text-sm text-muted-foreground">{route.departureStation.address}</p>
                    {route.departureStation.description && (
                      <p
                        className="text-sm mt-2">{route.departureStation.description}</p>
                    )}*/}
                  </div>
                </div>

                <div>
                  <h3
                    className="text-sm font-medium text-muted-foreground">Arrival
                    Station</h3>
                  <div className="mt-2 p-3 border rounded-md">
                    <p className="font-medium">{route.arrivalStation.name}</p>
{/*                    <p
                      className="text-sm text-muted-foreground">{route.arrivalStation.address}</p>
                    {route.arrivalStation.description && (
                      <p
                        className="text-sm mt-2">{route.arrivalStation.description}</p>
                    )}*/}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="images">
          <RouteImages images={route.images} routeId={route.id} />
        </TabsContent>

        {/*<TabsContent value="tickets">*/}
        {/*  <Card>*/}
        {/*    <CardHeader>*/}
        {/*      <CardTitle>Tickets</CardTitle>*/}
        {/*      <CardDescription>Available tickets for this*/}
        {/*        route</CardDescription>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent>*/}
        {/*      {route.tickets && route.tickets.length > 0 ? (*/}
        {/*        <div className="space-y-4">*/}
        {/*          {route.tickets.map((ticket) => (*/}
        {/*            <div key={ticket.id} className="p-4 border rounded-md">*/}
        {/*              <div className="flex justify-between">*/}
        {/*                <div>*/}
        {/*                  <p className="font-medium">{ticket.type}</p>*/}
        {/*                  <p*/}
        {/*                    className="text-sm text-muted-foreground">{ticket.description}</p>*/}
        {/*                </div>*/}
        {/*                <div className="text-right">*/}
        {/*                  <p*/}
        {/*                    className="font-bold">${ticket.price.toFixed(2)}</p>*/}
        {/*                  <p*/}
        {/*                    className="text-sm text-muted-foreground">{ticket.available ? 'Available' : 'Sold out'}</p>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          ))}*/}
        {/*        </div>*/}
        {/*      ) : (*/}
        {/*        <p className="text-muted-foreground">No tickets available for*/}
        {/*          this route.</p>*/}
        {/*      )}*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*</TabsContent>*/}
      </Tabs>
    </div>
  );
}

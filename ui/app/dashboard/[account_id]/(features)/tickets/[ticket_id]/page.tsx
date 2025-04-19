import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  MapPin,
  Tag,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { TicketStatusBadge } from "../components/ticket-status-badge";
import { getTicketById } from "../lib/actions";

// Mock route details - in a real app, this would come from your database
const routeDetails = {
  "route-1": {
    departureTime: "08:00 AM",
    arrivalTime: "11:30 AM",
    departureDate: "2023-05-15",
    departureLocation: "New York Grand Central",
    arrivalLocation: "Boston South Station",
  },
  "route-2": {
    departureTime: "09:15 AM",
    arrivalTime: "11:45 AM",
    departureDate: "2023-05-16",
    departureLocation: "Chicago Union Station",
    arrivalLocation: "Detroit Station",
  },
  "route-3": {
    departureTime: "07:30 AM",
    arrivalTime: "10:00 AM",
    departureDate: "2023-05-17",
    departureLocation: "Los Angeles Union Station",
    arrivalLocation: "San Francisco Transbay Terminal",
  },
  "route-4": {
    departureTime: "08:45 AM",
    arrivalTime: "10:30 AM",
    departureDate: "2023-05-18",
    departureLocation: "Seattle King Street Station",
    arrivalLocation: "Portland Union Station",
  },
};

export default async function TicketDetailsPage({
  params,
}: {
  params: { ticket_id: string };
}) {
  // Fetch ticket data
  const ticket = await getTicketById(params.ticket_id);

  if (!ticket) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Ticket Not Found
        </h1>
        <p className="mb-4">
          The ticket you are looking for does not exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/tickets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tickets
          </Link>
        </Button>
      </div>
    );
  }

  // Get route details
  const details = routeDetails[ticket.routeId as keyof typeof routeDetails] || {
    departureTime: "N/A",
    arrivalTime: "N/A",
    departureDate: "N/A",
    departureLocation: "N/A",
    arrivalLocation: "N/A",
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/tickets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tickets
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Ticket Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  {ticket.ticketNumber}
                </CardTitle>
                <CardDescription>{ticket.routeName}</CardDescription>
              </div>
              <TicketStatusBadge status={ticket.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Ticket ID:</span>
                  <span className="font-mono">{ticket.id}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold">
                    ${Number.parseFloat(ticket.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span>{formatDate(ticket.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{formatDate(ticket.updatedAt)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Route ID:</span>
                  <span className="font-mono">{ticket.routeId}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Departure:</span>
                  <span>{details.departureLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Arrival:</span>
                  <span>{details.arrivalLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Travel Date:</span>
                  <span>{details.departureDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Travel Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium">Departure</div>
                  <div className="text-lg font-bold">
                    {details.departureTime}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {details.departureLocation}
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium">Arrival</div>
                  <div className="text-lg font-bold">{details.arrivalTime}</div>
                  <div className="text-sm text-muted-foreground">
                    {details.arrivalLocation}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Manage this ticket</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" asChild>
              <Link href={`/tickets/${ticket.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Ticket
              </Link>
            </Button>

            {ticket.status === "AVAILABLE" && (
              <Button variant="outline" className="w-full">
                Reserve Ticket
              </Button>
            )}

            {ticket.status === "RESERVED" && (
              <Button variant="outline" className="w-full">
                Complete Sale
              </Button>
            )}

            {(ticket.status === "AVAILABLE" ||
              ticket.status === "RESERVED") && (
              <Button variant="destructive" className="w-full">
                Cancel Ticket
              </Button>
            )}

            <Button variant="outline" className="w-full">
              Print Ticket
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              {ticket.bookingId ? (
                <span>
                  Associated with booking:{" "}
                  <Link
                    href={`/bookings/${ticket.bookingId}`}
                    className="underline"
                  >
                    {ticket.bookingId}
                  </Link>
                </span>
              ) : (
                <span>No booking associated with this ticket</span>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

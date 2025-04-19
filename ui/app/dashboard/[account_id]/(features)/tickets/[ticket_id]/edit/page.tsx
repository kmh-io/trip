"use client";

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { getTicketById, updateTicket } from "../../lib/actions";
import { TicketStatus, ticketSchema } from "../../lib/schema";

// Define the form schema type
type FormValues = z.infer<typeof ticketSchema>;

// Define routes directly in the component to avoid async issues
const routeOptions = [
  { id: "route-1", name: "New York to Boston" },
  { id: "route-2", name: "Chicago to Detroit" },
  { id: "route-3", name: "Los Angeles to San Francisco" },
  { id: "route-4", name: "Seattle to Portland" },
];

export default function EditTicketPage({
  params,
}: {
  params: { ticket_id: string };
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<any>(null);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      ticketNumber: "",
      price: "",
      routeId: "",
      status: TicketStatus.AVAILABLE,
      bookingId: "",
    },
  });

  // Fetch ticket data
  useEffect(() => {
    async function loadTicket() {
      try {
        const ticketData = await getTicketById(params.ticket_id);

        if (!ticketData) {
          toast.error("Error", {
            description: "Ticket not found",
          });
          router.push("/dashboard/abc123/tickets");
          return;
        }

        setTicket(ticketData);

        // Set form values
        form.reset({
          ticketNumber: ticketData.ticketNumber,
          price: ticketData.price,
          routeId: ticketData.routeId,
          status: ticketData.status as TicketStatus,
          bookingId: ticketData.bookingId || "",
        });
      } catch (error) {
        console.error("Error loading ticket:", error);
        toast.error("Error", {
          description: "Failed to load ticket data",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadTicket();
  }, [params.id, router, form]);

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Submit the form using server action
      const result = await updateTicket(params.id, formData);

      if (result.success) {
        // Show success toast
        toast.success("Ticket updated", {
          description: `Ticket ${data.ticketNumber} has been updated successfully.`,
        });

        // Redirect to ticket details page
        router.push(`/tickets/${params.id}`);
      } else {
        // Handle validation errors
        if (result.errors) {
          // Set form errors
          Object.entries(result.errors).forEach(([key, value]) => {
            if (key === "_form") {
              // Show form-level error
              toast.error("Error", {
                description: value[0],
              });
            } else {
              // Set field-level errors
              form.setError(key as any, { message: value[0] });
            }
          });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading ticket data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href={`/tickets/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to ticket
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Ticket</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Ticket Information</CardTitle>
          <CardDescription>
            Update the details for ticket {ticket?.ticketNumber}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ticketNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ticket Number</FormLabel>
                      <FormControl>
                        <Input placeholder="TK-001" {...field} />
                      </FormControl>
                      <FormDescription>
                        Format: TK-XXX (e.g., TK-001)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormDescription>
                        The price of the ticket in USD.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="routeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a route" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {routeOptions.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The route this ticket is valid for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(TicketStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The current status of the ticket.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookingId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional" {...field} />
                    </FormControl>
                    <FormDescription>
                      Associated booking ID (if applicable).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button variant="outline" type="button" asChild>
                <Link href={`/tickets/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Ticket"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

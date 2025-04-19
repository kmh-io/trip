import { z } from "zod";

// Define the TicketStatus enum
export enum TicketStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  SOLD = "SOLD",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

// Schema for ticket creation
export const ticketSchema = z.object({
  ticketNumber: z
    .string()
    .min(1, "Ticket number is required")
    .regex(/^TK-\d{3,}$/, "Ticket number must be in format TK-XXX"),
  price: z.string().min(1, "Price is required"),
  routeId: z.string().min(1, "Route is required"),
  status: z.nativeEnum(TicketStatus),
  bookingId: z.string().optional(),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;

"use server";

import { revalidatePath } from "next/cache";
import { type TicketFormValues, ticketSchema } from "./schema";

// Mock database of tickets
const tickets = [
  {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    ticketNumber: "TK-001",
    price: "125.00",
    status: "AVAILABLE",
    createdAt: new Date("2023-04-15T09:30:00"),
    updatedAt: new Date("2023-04-15T09:30:00"),
    routeId: "route-1",
    routeName: "New York to Boston",
    bookingId: "",
  },
  {
    id: "7c8b9e1f-a3d2-4c5b-9e8f-7a1b2c3d4e5f",
    ticketNumber: "TK-002",
    price: "85.50",
    status: "SOLD",
    createdAt: new Date("2023-04-16T10:15:00"),
    updatedAt: new Date("2023-04-17T14:20:00"),
    routeId: "route-2",
    routeName: "Chicago to Detroit",
    bookingId: "booking-1",
  },
  {
    id: "3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b",
    ticketNumber: "TK-003",
    price: "210.75",
    status: "RESERVED",
    createdAt: new Date("2023-04-18T08:45:00"),
    updatedAt: new Date("2023-04-18T16:30:00"),
    routeId: "route-3",
    routeName: "Los Angeles to San Francisco",
    bookingId: "booking-2",
  },
  {
    id: "9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d",
    ticketNumber: "TK-004",
    price: "150.25",
    status: "CANCELLED",
    createdAt: new Date("2023-04-19T11:20:00"),
    updatedAt: new Date("2023-04-20T09:10:00"),
    routeId: "route-1",
    routeName: "New York to Boston",
    bookingId: "booking-3",
  },
  {
    id: "2a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d",
    ticketNumber: "TK-005",
    price: "95.00",
    status: "EXPIRED",
    createdAt: new Date("2023-04-10T14:50:00"),
    updatedAt: new Date("2023-04-21T18:05:00"),
    routeId: "route-4",
    routeName: "Seattle to Portland",
    bookingId: "",
  },
];

// Mock function to get routes
export async function getRoutes() {
  return [
    { id: "route-1", name: "New York to Boston" },
    { id: "route-2", name: "Chicago to Detroit" },
    { id: "route-3", name: "Los Angeles to San Francisco" },
    { id: "route-4", name: "Seattle to Portland" },
  ];
}

// Mock function to get a ticket by ID
export async function getTicketById(id: string) {
  // In a real app, this would fetch from your database
  const ticket = tickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    return null;
  }

  return ticket;
}

// Mock function to get all tickets
export async function getTickets() {
  // In a real app, this would fetch from your database
  return tickets;
}

// Mock function to simulate database operations for creating a ticket
async function saveTicketToDatabase(ticket: TicketFormValues) {
  // In a real app, this would save to your database
  console.log("Saving ticket to database:", ticket);

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Create a new ticket with generated ID
  const newTicket = {
    id: `ticket-${Math.random().toString(36).substring(2, 9)}`,
    ...ticket,
    createdAt: new Date(),
    updatedAt: new Date(),
    routeName:
      (await getRoutes()).find((route) => route.id === ticket.routeId)?.name ||
      "",
  };

  // Add to our mock database
  tickets.push(newTicket);

  return newTicket;
}

// Mock function to update a ticket in the database
async function updateTicketInDatabase(id: string, ticket: TicketFormValues) {
  // In a real app, this would update your database
  console.log("Updating ticket in database:", id, ticket);

  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find the ticket index
  const ticketIndex = tickets.findIndex((t) => t.id === id);

  if (ticketIndex === -1) {
    throw new Error("Ticket not found");
  }

  // Update the ticket
  const updatedTicket = {
    ...tickets[ticketIndex],
    ...ticket,
    updatedAt: new Date(),
    routeName:
      getRoutes().find((route) => route.id === ticket.routeId)?.name || "",
  };

  // Replace in our mock database
  tickets[ticketIndex] = updatedTicket;

  return updatedTicket;
}

export async function createTicket(formData: FormData) {
  // Convert FormData to a plain object
  const rawData = Object.fromEntries(formData.entries());

  // Validate the form data
  const validationResult = ticketSchema.safeParse(rawData);

  if (!validationResult.success) {
    // Return validation errors
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Save the ticket to the database
    const ticket = await saveTicketToDatabase(validationResult.data);

    // Revalidate the tickets page to show the new ticket
    revalidatePath("/tickets");

    // Return success
    return {
      success: true,
      ticket,
    };
  } catch (error) {
    console.error("Error creating ticket:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to create ticket. Please try again."],
      },
    };
  }
}

export async function updateTicket(id: string, formData: FormData) {
  // Convert FormData to a plain object
  const rawData = Object.fromEntries(formData.entries());

  // Validate the form data
  const validationResult = ticketSchema.safeParse(rawData);

  if (!validationResult.success) {
    // Return validation errors
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Update the ticket in the database
    const ticket = await updateTicketInDatabase(id, validationResult.data);

    // Revalidate the tickets page to show the updated ticket
    revalidatePath("/tickets");
    revalidatePath(`/tickets/${id}`);

    // Return success
    return {
      success: true,
      ticket,
    };
  } catch (error) {
    console.error("Error updating ticket:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to update ticket. Please try again."],
      },
    };
  }
}

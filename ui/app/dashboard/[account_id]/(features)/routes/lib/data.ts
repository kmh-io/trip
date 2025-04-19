import type { RouteType } from "./types";

// Mock data for demonstration purposes
// In a real application, this would be fetched from a database

const mockRoutes: RouteType[] = [
  {
    id: "1",
    departure: new Date(Date.now() + 86400000), // Tomorrow
    arrival: new Date(Date.now() + 86400000 + 7200000), // Tomorrow + 2 hours
    origin: "New York",
    destination: "Boston",
    duration: 120, // 2 hours in minutes
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    transportType: "BUS",
    createdAt: new Date(),
    updatedAt: new Date(),
    operatorId: "123e4567-e89b-12d3-a456-426614174000",
    departureStationId: "123e4567-e89b-12d3-a456-426614174001",
    arrivalStationId: "223e4567-e89b-12d3-a456-426614174001",
    operator: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Express Transit",
      description: "Leading bus operator in the Northeast",
    },
    departureStation: {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Port Authority Bus Terminal",
      address: "625 8th Ave, New York, NY 10018",
      description: "Main bus terminal in Manhattan",
    },
    arrivalStation: {
      id: "223e4567-e89b-12d3-a456-426614174001",
      name: "South Station",
      address: "700 Atlantic Ave, Boston, MA 02110",
      description: "Major transportation hub in Boston",
    },
    tickets: [
      {
        id: "ticket1",
        type: "Economy",
        price: 45.99,
        description: "Standard seating",
        available: true,
        routeId: "1",
      },
      {
        id: "ticket2",
        type: "Business",
        price: 75.99,
        description: "Extra legroom and complimentary snacks",
        available: true,
        routeId: "1",
      },
    ],
  },
  {
    id: "2",
    departure: new Date(Date.now() + 172800000), // Day after tomorrow
    arrival: new Date(Date.now() + 172800000 + 10800000), // Day after tomorrow + 3 hours
    origin: "Chicago",
    destination: "Detroit",
    duration: 180, // 3 hours in minutes
    images: ["/placeholder.svg?height=300&width=300"],
    transportType: "TRAIN",
    createdAt: new Date(),
    updatedAt: new Date(),
    operatorId: "223e4567-e89b-12d3-a456-426614174000",
    departureStationId: "323e4567-e89b-12d3-a456-426614174001",
    arrivalStationId: "423e4567-e89b-12d3-a456-426614174001",
    operator: {
      id: "223e4567-e89b-12d3-a456-426614174000",
      name: "Midwest Rail",
      description: "Regional train service",
    },
    departureStation: {
      id: "323e4567-e89b-12d3-a456-426614174001",
      name: "Union Station",
      address: "225 S Canal St, Chicago, IL 60606",
      description: "Chicago's primary railway station",
    },
    arrivalStation: {
      id: "423e4567-e89b-12d3-a456-426614174001",
      name: "Detroit Station",
      address: "11 W Baltimore Ave, Detroit, MI 48202",
      description: "Central station in Detroit",
    },
    tickets: [
      {
        id: "ticket3",
        type: "Standard",
        price: 65.5,
        description: "Regular train seating",
        available: true,
        routeId: "2",
      },
    ],
  },
  {
    id: "3",
    departure: new Date(Date.now() + 259200000), // 3 days from now
    arrival: new Date(Date.now() + 259200000 + 5400000), // 3 days from now + 1.5 hours
    origin: "San Francisco",
    destination: "Los Angeles",
    duration: 90, // 1.5 hours in minutes
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    transportType: "FLIGHT",
    createdAt: new Date(),
    updatedAt: new Date(),
    operatorId: "323e4567-e89b-12d3-a456-426614174000",
    departureStationId: "523e4567-e89b-12d3-a456-426614174001",
    arrivalStationId: "623e4567-e89b-12d3-a456-426614174001",
    operator: {
      id: "323e4567-e89b-12d3-a456-426614174000",
      name: "Pacific Airways",
      description: "West coast airline service",
    },
    departureStation: {
      id: "523e4567-e89b-12d3-a456-426614174001",
      name: "San Francisco International Airport",
      address: "San Francisco, CA 94128",
      description: "Major international airport in the Bay Area",
    },
    arrivalStation: {
      id: "623e4567-e89b-12d3-a456-426614174001",
      name: "Los Angeles International Airport",
      address: "1 World Way, Los Angeles, CA 90045",
      description: "Primary international airport serving Los Angeles",
    },
    tickets: [
      {
        id: "ticket4",
        type: "Economy",
        price: 129.99,
        description: "Standard economy class",
        available: true,
        routeId: "3",
      },
      {
        id: "ticket5",
        type: "First Class",
        price: 349.99,
        description: "Premium seating with extra services",
        available: false,
        routeId: "3",
      },
    ],
  },
];

// Simulate API calls with delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRoutes(): Promise<RouteType[]> {
  await delay(500); // Simulate network delay
  return [...mockRoutes];
}

export async function getRouteById(id: string): Promise<RouteType | undefined> {
  await delay(300); // Simulate network delay
  return mockRoutes.find((route) => route.id === id);
}

"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Plane, Train, Bus, Ship } from "lucide-react"
import { format, isSameDay } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for routes
const routes = [
  {
    id: "1",
    from: "New York",
    to: "Los Angeles",
    departureDate: new Date("2024-05-15T08:30:00"),
    arrivalDate: new Date("2024-05-15T12:15:00"),
    price: 299,
    type: "flight",
    operator: "SkyWings Airlines",
    available: 23,
  },
  {
    id: "2",
    from: "Boston",
    to: "Washington DC",
    departureDate: new Date("2024-05-16T10:00:00"),
    arrivalDate: new Date("2024-05-16T14:30:00"),
    price: 89,
    type: "train",
    operator: "East Coast Railways",
    available: 56,
  },
  {
    id: "3",
    from: "Chicago",
    to: "Detroit",
    departureDate: new Date("2024-05-17T07:15:00"),
    arrivalDate: new Date("2024-05-17T10:45:00"),
    price: 45,
    type: "bus",
    operator: "Midwest Express",
    available: 12,
  },
  {
    id: "4",
    from: "Miami",
    to: "Bahamas",
    departureDate: new Date("2024-05-18T09:00:00"),
    arrivalDate: new Date("2024-05-18T15:30:00"),
    price: 199,
    type: "ferry",
    operator: "Caribbean Cruises",
    available: 78,
  },
  {
    id: "5",
    from: "Seattle",
    to: "Vancouver",
    departureDate: new Date("2024-05-19T11:30:00"),
    arrivalDate: new Date("2024-05-19T13:45:00"),
    price: 129,
    type: "train",
    operator: "Pacific Northwest Rail",
    available: 34,
  },
  {
    id: "6",
    from: "San Francisco",
    to: "San Diego",
    departureDate: new Date("2024-05-20T06:45:00"),
    arrivalDate: new Date("2024-05-20T08:30:00"),
    price: 179,
    type: "flight",
    operator: "West Coast Air",
    available: 8,
  },
  {
    id: "7",
    from: "Denver",
    to: "Salt Lake City",
    departureDate: new Date("2024-05-21T12:15:00"),
    arrivalDate: new Date("2024-05-21T14:00:00"),
    price: 149,
    type: "flight",
    operator: "Mountain Express",
    available: 15,
  },
  {
    id: "8",
    from: "New Orleans",
    to: "Memphis",
    departureDate: new Date("2024-05-22T08:00:00"),
    arrivalDate: new Date("2024-05-22T13:30:00"),
    price: 75,
    type: "bus",
    operator: "Southern Comfort Lines",
    available: 22,
  },
]

interface RoutesListProps {
  selectedDate: Date
}

export function RoutesList({ selectedDate }: RoutesListProps) {
  const [page, setPage] = useState(1)
  const routesPerPage = 5

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "train":
        return <Train className="h-4 w-4" />
      case "bus":
        return <Bus className="h-4 w-4" />
      case "ferry":
        return <Ship className="h-4 w-4" />
      default:
        return <Plane className="h-4 w-4" />
    }
  }

  const filteredRoutes = routes.filter((route) => isSameDay(route.departureDate, selectedDate))

  const totalPages = Math.ceil(filteredRoutes.length / routesPerPage)

  const paginatedRoutes = filteredRoutes.slice((page - 1) * routesPerPage, page * routesPerPage)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedRoutes.length} of {filteredRoutes.length} routes
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Sort by:</p>
          <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Departure: Earliest</option>
            <option>Duration: Shortest</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {paginatedRoutes.length > 0 ? (
          paginatedRoutes.map((route) => (
            <Card key={route.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTransportIcon(route.type)}
                        {route.type.charAt(0).toUpperCase() + route.type.slice(1)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{route.operator}</span>
                    </div>
                    <p className="font-semibold text-lg">${route.price}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{format(route.departureDate, "HH:mm")}</span>
                          <span className="text-sm text-muted-foreground">{route.from}</span>
                        </div>
                        <div className="flex-1 border-t border-dashed border-muted-foreground/30 relative px-4">
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                            {Math.round(
                              (route.arrivalDate.getTime() - route.departureDate.getTime()) / (1000 * 60 * 60),
                            )}
                            h{" "}
                            {Math.round(
                              ((route.arrivalDate.getTime() - route.departureDate.getTime()) / (1000 * 60)) % 60,
                            )}
                            m
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{format(route.arrivalDate, "HH:mm")}</span>
                          <span className="text-sm text-muted-foreground">{route.to}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(route.departureDate, "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {format(route.departureDate, "HH:mm")} - {format(route.arrivalDate, "HH:mm")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {route.from} to {route.to}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-end items-end">
                      <span className="text-sm text-muted-foreground">{route.available} seats left</span>
                      <Button>Book Now</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium">No routes available for this date</p>
            <p className="text-muted-foreground mt-1">Try selecting a different date or adjusting your filters</p>
          </div>
        )}
      </div>

      {filteredRoutes.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page > 1) setPage(page - 1)
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(i + 1)
                  }}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (page < totalPages) setPage(page + 1)
                }}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

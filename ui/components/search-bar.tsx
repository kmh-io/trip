"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  MapPin,
  ChevronDown,
  Bus,
  Train,
  Plane,
  Ship,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMediaQuery } from "@/hooks/use-media-query";

// Popular destinations for autocomplete
const popularDestinations = [
  { name: "Bangkok", country: "Thailand", popular: true },
  { name: "Chiang Mai", country: "Thailand", popular: true },
  { name: "Phuket", country: "Thailand", popular: true },
  { name: "Pattaya", country: "Thailand" },
  { name: "Krabi", country: "Thailand" },
  { name: "Koh Samui", country: "Thailand" },
  { name: "Ayutthaya", country: "Thailand" },
  { name: "Hua Hin", country: "Thailand" },
  { name: "Singapore", country: "Singapore", popular: true },
  { name: "Kuala Lumpur", country: "Malaysia", popular: true },
  { name: "Penang", country: "Malaysia" },
  { name: "Bali", country: "Indonesia", popular: true },
  { name: "Jakarta", country: "Indonesia" },
  { name: "Ho Chi Minh City", country: "Vietnam", popular: true },
  { name: "Hanoi", country: "Vietnam" },
  { name: "Manila", country: "Philippines" },
  { name: "Cebu", country: "Philippines" },
];

type TransportMode = "bus" | "train" | "flight";

export default function SearchBar() {
  const [origin, setOrigin] = useState("Bangkok");
  const [destination, setDestination] = useState("Chiang Mai");
  const [departDate, setDepartDate] = useState<Date>(addDays(new Date(), 3));
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [originOpen, setOriginOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [passengersOpen, setPassengersOpen] = useState(false);
  const [transportMode, setTransportMode] = useState<TransportMode>("bus");
  const [recentSearches] = useState([
    { origin: "Bangkok", destination: "Phuket" },
    { origin: "Chiang Mai", destination: "Bangkok" },
  ]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Swap origin and destination
  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Add return date
  const handleAddReturn = () => {
    if (!showReturnDate) {
      setReturnDate(addDays(departDate, 7));
    }
    setShowReturnDate(!showReturnDate);
  };

  // Ensure return date is after depart date
  useEffect(() => {
    if (returnDate && departDate && returnDate < departDate) {
      setReturnDate(addDays(departDate, 1));
    }
  }, [departDate, returnDate]);

  // Get transport mode icon
  const getTransportIcon = (mode: TransportMode) => {
    switch (mode) {
      case "bus":
        return <Bus className="h-4 w-4" />;
      case "train":
        return <Train className="h-4 w-4" />;
      case "flight":
        return <Plane className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative z-10">
      <div className="flex flex-col w-full rounded-xl overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm">
        {/* Transport Mode Selector */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <div className="flex space-x-1">
            {(["bus", "train", "flight"] as TransportMode[]).map((mode) => (
              <Button
                key={mode}
                variant={transportMode === mode ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 rounded-full px-3",
                  transportMode === mode
                    ? "bg-primary hover:bg-primary/80"
                    : "text-gray-600"
                )}
                onClick={() => setTransportMode(mode)}
              >
                <div className="flex items-center gap-1.5">
                  {mode === "bus" && <Bus className="h-3.5 w-3.5" />}
                  {mode === "train" && <Train className="h-3.5 w-3.5" />}
                  {mode === "flight" && <Plane className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline capitalize text-xs font-medium">
                    {mode}
                  </span>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <span className="hidden md:inline mr-2">Round trip</span>
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 rounded-full text-xs border-gray-300"
              onClick={handleAddReturn}
            >
              {showReturnDate ? "One way" : "Round trip"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          {/* Origin & Destination */}
          <div className="flex flex-1 md:border-r border-gray-100">
            {/* Origin */}
            <div className="flex-1 relative">
              <Popover open={originOpen} onOpenChange={setOriginOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-full justify-start rounded-none py-2 px-3 font-normal text-left"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500">From</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium truncate">
                          {origin}
                        </span>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-[300px]"
                  align={isDesktop ? "start" : "center"}
                >
                  <Command>
                    <CommandInput placeholder="Search destination..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {recentSearches.length > 0 && (
                        <CommandGroup heading="Recent Searches">
                          {recentSearches.map((search, index) => (
                            <CommandItem
                              key={`recent-${index}`}
                              onSelect={() => {
                                setOrigin(search.origin);
                                setOriginOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                {search.origin}
                                <ChevronDown className="h-3 w-3 ml-1 mr-2" />
                                {search.destination}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                      <CommandGroup heading="Popular Destinations">
                        {popularDestinations
                          .filter((city) => city.popular)
                          .map((city) => (
                            <CommandItem
                              key={city.name}
                              onSelect={() => {
                                setOrigin(city.name);
                                setOriginOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{city.name}</span>
                                <span className="ml-2 text-xs text-gray-500">
                                  {city.country}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Swap button */}
            <div className="flex items-center justify-center px-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-gray-100 transition-all"
                onClick={handleSwap}
              >
                <ArrowLeftRight className="h-3 w-3" />
                <span className="sr-only">Swap origin and destination</span>
              </Button>
            </div>

            {/* Destination */}
            <div className="flex-1 relative">
              <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-full justify-start rounded-none py-2 px-3 font-normal text-left"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500">To</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium truncate">
                          {destination}
                        </span>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-[300px]"
                  align={isDesktop ? "start" : "center"}
                >
                  <Command>
                    <CommandInput placeholder="Search destination..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Popular Destinations">
                        {popularDestinations
                          .filter(
                            (city) => city.popular && city.name !== origin
                          )
                          .map((city) => (
                            <CommandItem
                              key={city.name}
                              onSelect={() => {
                                setDestination(city.name);
                                setDestinationOpen(false);
                              }}
                            >
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{city.name}</span>
                                <span className="ml-2 text-xs text-gray-500">
                                  {city.country}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-1 md:border-r border-gray-100">
            {/* Depart Date */}
            <div className="flex-1 relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-full justify-start rounded-none py-2 px-3 font-normal text-left"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500">Depart</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {departDate
                            ? format(departDate, "EEE, MMM d")
                            : "Select date"}
                        </span>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align={isDesktop ? "start" : "center"}
                >
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={(date) => date && setDepartDate(date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                  <div className="p-3 border-t">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {departDate
                          ? format(departDate, "EEEE, MMMM d, yyyy")
                          : "No date selected"}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDepartDate(new Date())}
                        >
                          Today
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDepartDate(addDays(new Date(), 1))}
                        >
                          Tomorrow
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            <div className="flex-1 relative">
              <AnimatePresence initial={false}>
                {showReturnDate ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0"
                  >
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full h-full justify-start rounded-none py-2 px-3 font-normal text-left"
                        >
                          <div className="flex flex-col items-start">
                            <div className="flex items-center text-xs text-gray-500">
                              <span>Return</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                {returnDate
                                  ? format(returnDate, "EEE, MMM d")
                                  : "Select date"}
                              </span>
                            </div>
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align={isDesktop ? "start" : "center"}
                      >
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={(date) => date && setReturnDate(date)}
                          initialFocus
                          disabled={(date) => date < departDate}
                          className="rounded-md border"
                        />
                        <div className="p-3 border-t">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              {returnDate
                                ? format(returnDate, "EEEE, MMMM d, yyyy")
                                : "No date selected"}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setReturnDate(addDays(departDate, 7))
                                }
                              >
                                +7 days
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setReturnDate(addDays(departDate, 14))
                                }
                              >
                                +14 days
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full h-full justify-start rounded-none py-2 px-3 font-normal text-left opacity-50"
                    >
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500">Return</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-500">
                            Select date
                          </span>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Passengers & Search */}
          <div className="flex">
            {/* Passengers */}
            <div className="relative">
              <Popover open={passengersOpen} onOpenChange={setPassengersOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-full justify-start rounded-none py-2 px-3 font-normal text-left"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500">Travelers</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">
                          {passengers}{" "}
                          {passengers === 1 ? "Passenger" : "Passengers"}
                        </span>
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80 p-0"
                  align={isDesktop ? "start" : "center"}
                >
                  <div className="p-4 border-b">
                    <h4 className="font-medium">Passengers</h4>
                    <p className="text-sm text-muted-foreground">
                      Add passengers to your booking
                    </p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Adults</div>
                        <div className="text-sm text-muted-foreground">
                          Age 13+
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            setPassengers(Math.max(1, passengers - 1))
                          }
                          disabled={passengers <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengers}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            setPassengers(Math.min(9, passengers + 1))
                          }
                          disabled={passengers >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                      <div>
                        <div className="font-medium">Children</div>
                        <div className="text-sm text-muted-foreground">
                          Age 2-12
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          disabled
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">0</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          disabled
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Maximum 9 passengers per booking
                    </div>
                    <Button size="sm" onClick={() => setPassengersOpen(false)}>
                      Done
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Find Tickets */}
            <div>
              <Button asChild className="h-full rounded-none">
                <Link
                  href="/search-results"
                  className="flex items-center justify-center gap-1.5"
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges for popular routes */}
      <div className="hidden md:flex mt-3 gap-2 justify-center">
        <Badge
          variant="outline"
          className="bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer transition-all"
        >
          <span className="font-normal">Popular: </span>Bangkok → Phuket
        </Badge>
        <Badge
          variant="outline"
          className="bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer transition-all"
        >
          <span className="font-normal">Popular: </span>Bangkok → Chiang Mai
        </Badge>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: "New York",
      image: "/placeholder.svg?height=400&width=600",
      count: "120+ routes",
    },
    {
      id: 2,
      name: "Los Angeles",
      image: "/placeholder.svg?height=400&width=600",
      count: "85+ routes",
    },
    {
      id: 3,
      name: "Chicago",
      image: "/placeholder.svg?height=400&width=600",
      count: "64+ routes",
    },
    {
      id: 4,
      name: "Miami",
      image: "/placeholder.svg?height=400&width=600",
      count: "92+ routes",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Popular Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Link href="/search-results" key={destination.id}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{destination.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {destination.count}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

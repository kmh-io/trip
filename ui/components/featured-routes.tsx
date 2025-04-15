import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Train, Ship, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function FeaturedRoutes() {
  const routes = [
    {
      id: 1,
      from: "New York",
      to: "Boston",
      price: "$45",
      type: "bus",
      time: "4h 30m",
      date: "Daily",
      discount: "15% OFF",
    },
    {
      id: 2,
      from: "Chicago",
      to: "Detroit",
      price: "$38",
      type: "train",
      time: "5h 45m",
      date: "Mon, Wed, Fri",
    },
    {
      id: 3,
      from: "Seattle",
      to: "Vancouver",
      price: "$65",
      type: "ferry",
      time: "3h 15m",
      date: "Weekends",
    },
    {
      id: 4,
      from: "Los Angeles",
      to: "San Francisco",
      price: "$55",
      type: "bus",
      time: "7h 20m",
      date: "Daily",
      discount: "10% OFF",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "bus":
        return <Bus className="h-5 w-5" />;
      case "train":
        return <Train className="h-5 w-5" />;
      case "ferry":
        return <Ship className="h-5 w-5" />;
      default:
        return <Bus className="h-5 w-5" />;
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Routes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route) => (
          <Link href="/route-details" key={route.id}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    {getIcon(route.type)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {route.from} to {route.to}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {route.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {route.time}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {route.date}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg">{route.price}</p>
                  {route.discount && (
                    <Badge variant="secondary">{route.discount}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

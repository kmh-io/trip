import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      initials: "SJ",
      rating: 5,
      text: "The booking process was incredibly smooth. I found the perfect bus route for my trip and the e-ticket was sent instantly to my email.",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      initials: "MC",
      rating: 4,
      text: "Great service and competitive prices. The app made it easy to compare different travel options and find the best deal.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      initials: "ER",
      rating: 5,
      text: "I've been using this service for all my train bookings. The website is user-friendly and customer support is excellent.",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

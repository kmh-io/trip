import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TicketStatusBadgeProps = {
  status: string;
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "capitalize",
        status === "AVAILABLE" &&
          "bg-green-100 text-green-800 hover:bg-green-100",
        status === "RESERVED" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
        status === "SOLD" &&
          "bg-purple-100 text-purple-800 hover:bg-purple-100",
        status === "CANCELLED" && "bg-red-100 text-red-800 hover:bg-red-100",
        status === "EXPIRED" && "bg-gray-100 text-gray-800 hover:bg-gray-100"
      )}
    >
      {status.toLowerCase()}
    </Badge>
  );
}

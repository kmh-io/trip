import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

interface NotificationIconProps {
  count: number;
  className?: string;
  onClick?: () => void;
}

export default function NotificationIcon({
  count,
  className,
  onClick,
}: NotificationIconProps) {
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={cn("relative", className)}
      onClick={onClick}
    >
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
        >
          {count > 99 ? "99+" : count}
        </Badge>
      )}
    </Button>
  );
}

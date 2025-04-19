import { Icon } from "@/components/icon-factory";

interface NavDTO {
  id: string;
  name: string;
  endpoint: string;
  icon: Icon;
}

export default function getNavList(): NavDTO[] {
  return [
    {
      id: "1",
      name: "Dashboard",
      endpoint: "dashboard",
      icon: Icon.dashboard,
    },
    {
      id: "2",
      name: "Tickets",
      endpoint: "tickets",
      icon: Icon.ticket,
    },
    {
      id: "3",
      name: "Routes",
      endpoint: "routes",
      icon: Icon.route,
    },
    {
      id: "4",
      name: "Bookings",
      endpoint: "bookings",
      icon: Icon.booking,
    },
    {
      id: "5",
      name: "Cities",
      endpoint: "cities",
      icon: Icon.city,
    },
    {
      id: "6",
      name: "Setting",
      endpoint: "setting",
      icon: Icon.setting,
    },
  ];
}

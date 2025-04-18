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
      name: "Routes",
      endpoint: "routes",
      icon: Icon.route,
    },
    {
      id: "3",
      name: "Bookings",
      endpoint: "bookings",
      icon: Icon.booking,
    },
    {
      id: "4",
      name: "Setting",
      endpoint: "setting",
      icon: Icon.setting,
    },
  ];
}

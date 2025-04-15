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
      name: "Teams",
      endpoint: "teams",
      icon: Icon.team,
    },
    {
      id: "3",
      name: "Posts",
      endpoint: "posts",
      icon: Icon.post,
    },
    {
      id: "4",
      name: "Setting",
      endpoint: "setting",
      icon: Icon.setting,
    },
  ];
}

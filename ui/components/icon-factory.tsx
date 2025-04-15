import { LayoutDashboard, Newspaper, Settings2, Users } from "lucide-react";

export enum Icon {
  dashboard,
  post,
  notification,
  team,
  setting,
}

export interface IconFactoryProps {
  icon: Icon | string;
  muted?: boolean;
}

function NullIcon() {
  return <span />;
}

export default function IconFactory({ icon, muted }: IconFactoryProps) {
  const style = muted ? "w-4 h-4 text-muted-foreground" : "";

  switch (icon) {
    case Icon.dashboard:
      return <LayoutDashboard className={style} />;
    case Icon.post:
      return <Newspaper className={style} />;
    case Icon.team:
      return <Users className={style} />;
    case Icon.setting:
      return <Settings2 className={style} />;
    default:
      return <NullIcon />;
  }
}

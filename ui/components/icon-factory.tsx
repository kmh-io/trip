import {
  LayoutDashboard,
  Newspaper,
  Route,
  Settings2,
  ShoppingCart,
  Users,
} from "lucide-react";

export enum Icon {
  dashboard,
  notification,
  setting,
  route,
  booking,
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
    case Icon.setting:
      return <Settings2 className={style} />;
    case Icon.route:
      return <Route className={style} />;
    case Icon.booking:
      return <ShoppingCart className={style} />;
    default:
      return <NullIcon />;
  }
}

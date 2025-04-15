"use client";

import getNavList from "@/app/[account_id]/data/navigations";
import IconFactory from "@/components/icon-factory";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavList() {
  const data = getNavList();
  const url = usePathname().split("/");
  const accountId = url[1];

  return (
    <ScrollArea className={"h-full w-full"}>
      <SidebarGroup>
        <SidebarMenu>
          {data.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton tooltip={item.name} asChild>
                <Link
                  href={`/${accountId}${
                    item.endpoint == "dashboard" ? "" : `/${item.endpoint}`
                  }`}
                >
                  <IconFactory icon={item.icon} muted={false} />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </ScrollArea>
  );
}

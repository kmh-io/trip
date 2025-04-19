import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";
import { Toaster } from "sonner";
import NavPanel from "./components/nav-panel";
import NotificationIcon from "./components/notification-icon";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
  description: "Admin Dashboard",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <NavPanel />
      <SidebarInset className={"max-h-screen pr-1 pl-1"}>
        <header className="flex h-12 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="ml-1 mr-1" />
          <NotificationIcon count={20} />
        </header>
        {children}
        <Toaster position="top-right" richColors />
      </SidebarInset>
    </SidebarProvider>
  );
}

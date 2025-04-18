import SiteFooter from "@/app/travels/[vehicle]/routes/components/site-footer";
import SiteHeader from "@/app/travels/[vehicle]/routes/components/site-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Routes",
  description: "Routes of the vehicle",
};

export default function RouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

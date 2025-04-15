import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Sign In",
  description: "Admin Sign In",
};

export default function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen">{children}</div>;
}

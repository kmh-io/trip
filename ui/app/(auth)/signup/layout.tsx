import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Sign Up",
  description: "Admin Sign Up",
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen">{children}</div>;
}

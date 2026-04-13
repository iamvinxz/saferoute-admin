import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import { cn } from "@/lib/utils";
import LayoutProvider from "@/components/LayoutProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SafeRoute-Admin",
  description: "web-based app for saferoute admins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", poppins.variable)}>
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}

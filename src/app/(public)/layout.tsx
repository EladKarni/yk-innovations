import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavLinks from "@/components/NavLinks";
import "../globals.css";
import { cn } from "@/util/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YK Innovations",
  description: "YK Innovations is here to help you bring your ideas to life",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "YK Innovations",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="mytheme" className="scroll-smooth">
      <body className={cn(inter.className, "h-full")}>
        <Navbar>
          <NavLinks />
        </Navbar>
        {children}
        <Footer />
      </body>
    </html>
  );
}

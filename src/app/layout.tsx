import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavLinks from "@/components/NavLinks";
import "./globals.css";
import Head from "next/head";
import { cn } from "@/util/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YK Innovations",
  description: "YK Innovations is here to help you bring your ideas to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="mytheme" className="scroll-smooth">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="YK Innovations" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
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

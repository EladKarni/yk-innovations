import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";
import { draftMode } from "next/headers";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NavLinks from "@/components/NavLinks";
import "../globals.css";
import { cn } from "@/util/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "YK Innovations",
  description: "YK Innovations is here to help you bring your ideas to life",
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  appleWebApp: {
    title: "YK Innovations",
  },
};

// Enable ISR with on-demand revalidation for performance
export const revalidate = 3600; // Cache for 1 hour, revalidate on-demand via webhook

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch footer and company info globally
  let footerData: any;
  let companyInfo: any;

  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const fetchLayoutData = isDraftMode
      ? async () => {
          const payload = await getPayload({ config });
          return Promise.all([
            payload.findGlobal({ slug: "footer-section", draft: true }),
            payload.findGlobal({ slug: "company-info", draft: true }),
          ]);
        }
      : unstable_cache(
          async () => {
            const payload = await getPayload({ config });
            return Promise.all([
              payload.findGlobal({ slug: "footer-section" }),
              payload.findGlobal({ slug: "company-info" }),
            ]);
          },
          ["layout-cms-data"],
          { revalidate: 3600, tags: ["homepage"] }
        );
    [footerData, companyInfo] = await fetchLayoutData();
  } catch (error) {
    console.warn("Failed to fetch footer data from CMS:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://app.netlify.com" />
      </head>
      <body className={cn(inter.className, "h-full")}>
        <ThemeProvider>
          <Navbar>
            <NavLinks />
          </Navbar>
          <div className="h-[100px]" aria-hidden="true" />
          {children}
          <Footer footerData={footerData} companyInfo={companyInfo} />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getPayload } from "payload";
import config from "@/payload.config";
import { draftMode } from "next/headers";

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

// Disable all caching for real-time CMS updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    const payload = await getPayload({ config });
    [footerData, companyInfo] = await Promise.all([
      payload.findGlobal({ slug: "footer-section", draft: isDraftMode }),
      payload.findGlobal({ slug: "company-info", draft: isDraftMode }),
    ]);
  } catch (error) {
    console.warn("Failed to fetch footer data from CMS:", error);
  }

  return (
    <html lang="en" data-theme="mytheme" className="scroll-smooth">
      <body className={cn(inter.className, "h-full")}>
        <Navbar>
          <NavLinks />
        </Navbar>
        {children}
        <Footer footerData={footerData} companyInfo={companyInfo} />
      </body>
    </html>
  );
}

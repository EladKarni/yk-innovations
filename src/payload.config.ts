import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Import collections
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Services } from "./collections/Services";
import { Testimonials } from "./collections/Testimonials";

// Import globals
import { HeroSection } from "./globals/HeroSection";
import { ProjectsSection } from "./globals/ProjectsSection";
import { ContactSection } from "./globals/ContactSection";
import { AboutSection } from "./globals/AboutSection";
import { ProcessSection } from "./globals/ProcessSection";
import { FooterSection } from "./globals/FooterSection";
import { CompanyInfo } from "./globals/CompanyInfo";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    disable: false,
  },
  // CORS configuration - allows cookies from the correct domain
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    "https://*.netlify.app",
  ],
  // CSRF protection configuration - prevents CSRF token validation failures
  // Note: Wildcards don't work in CSRF validation (requires exact domain match)
  // Remove trailing slash to match browser Origin header format
  csrf: [
    (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000").replace(/\/$/, ""),
  ],
  collections: [Users, Media, Projects, Services, Testimonials],
  globals: [
    HeroSection,
    ProjectsSection,
    ContactSection,
    AboutSection,
    ProcessSection,
    FooterSection,
    CompanyInfo,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-key-change-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.NETLIFY_DATABASE_URL ||
        "postgresql://payload:payload@localhost:5432/nextjs_tailwind_daisyui",
    },
    push: false, // Disable automatic schema sync - use migrations instead
    migrationDir: path.resolve(dirname, './migrations'),
  }),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});

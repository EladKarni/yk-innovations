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
import { TeamSection } from "./globals/TeamSection";
import { NeighborhoodSection } from "./globals/NeighborhoodSection";
import { ContactSection } from "./globals/ContactSection";
import { TeamPage } from "./globals/TeamPage";
import { NeighborhoodPage } from "./globals/NeighborhoodPage";

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
  collections: [Users, Media, Projects, Services, Testimonials],
  globals: [
    HeroSection,
    ProjectsSection,
    TeamSection,
    NeighborhoodSection,
    ContactSection,
    TeamPage,
    NeighborhoodPage,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
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

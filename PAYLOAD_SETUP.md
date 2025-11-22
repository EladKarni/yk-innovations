# Payload CMS Setup Guide

This project now includes **Payload CMS 3.x** - a modern, headless CMS integrated with Next.js 15, Tailwind CSS, and DaisyUI.

## 🚀 Quick Start

### 1. Install Dependencies
Dependencies are already installed. If you need to reinstall:
```bash
yarn install
```

### 2. Start the PostgreSQL Database
```bash
yarn db:start
```

This will start a PostgreSQL 16 container using Docker Compose.

### 3. Update Environment Variables
Copy `.env.example` to `.env.local` and update the values:
```bash
cp .env.example .env.local
```

**Important**: Change `PAYLOAD_SECRET` to a strong random string in production!

### 4. Start the Development Server
```bash
yarn dev
```

### 5. Access the Admin Panel
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

On first visit to `/admin`, you'll be prompted to create your first admin user.

## 📁 Project Structure

```
src/
├── collections/           # Payload CMS collections
│   ├── Users.ts          # User authentication collection
│   ├── Media.ts          # Media/image uploads collection
│   └── Projects.ts       # Projects content collection
├── globals/              # Global content sections
│   ├── HeroSection.ts    # Homepage hero
│   ├── ProjectsSection.ts
│   ├── TeamSection.ts
│   ├── NeighborhoodSection.ts
│   ├── ContactSection.ts
│   ├── TeamPage.ts
│   └── NeighborhoodPage.ts
├── app/
│   ├── (payload)/        # Payload admin routes
│   │   ├── admin/
│   │   │   └── [[...segments]]/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   └── api/
│       └── preview/      # Draft preview API
│           └── route.ts
└── payload.config.ts     # Main Payload configuration
```

## 🗄️ Database

### Local Development (Docker Compose)
- **Database**: PostgreSQL 16
- **Container Name**: `nextjs-tailwind-daisyui-db`
- **Port**: 5432
- **Database Name**: `nextjs_tailwind_daisyui`
- **Username**: `payload`
- **Password**: `payload`

### Database Commands
```bash
# Start database
yarn db:start

# Stop database
yarn db:stop

# View logs
docker-compose logs -f

# Access database shell
docker exec -it nextjs-tailwind-daisyui-db psql -U payload -d nextjs_tailwind_daisyui
```

## 📦 Collections

### Users Collection
- **Purpose**: User authentication and authorization
- **Auth**: Enabled
- **Fields**: name, email, password (automatic)

### Media Collection
- **Purpose**: Image and file uploads
- **Features**:
  - Auto-generated alt text from filename
  - 3 image sizes: thumbnail (400x300), card (768x1024), tablet (1024xauto)
  - Public read access
  - Optional Vercel Blob storage integration

### Projects Collection
- **Purpose**: Project/portfolio content
- **Features**:
  - Auto-generated slug from title
  - Hero image and gallery (1-10 images)
  - Rich text description
  - Features and technologies arrays
  - Live preview support
  - Public read access

## 🌐 Global Sections

All globals are configurable through the admin panel:

1. **Hero Section** - Homepage hero with title, subtitle, and background image
2. **Projects Section** - Featured projects section title
3. **Team Section** - Team info with company logos
4. **Neighborhood Section** - Neighborhood features with images
5. **Contact Section** - Contact form labels and placeholders
6. **Team Page** - Full team page with partner companies
7. **Neighborhood Page** - Full neighborhood page with features

## 🔐 Environment Variables

### Required
```env
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URL=postgresql://payload:payload@localhost:5432/nextjs_tailwind_daisyui
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Optional
```env
# For Vercel Blob storage (production media hosting)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

## 🖼️ Media Storage

### Local Development
Media files are stored in `public/media/` (gitignored).

### Production (Optional)
For production, you can use Vercel Blob storage:
1. Get a token from [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
2. Add `BLOB_READ_WRITE_TOKEN` to your environment variables
3. Files will automatically be uploaded to Vercel Blob

## 🎨 Features

### Auto-Generated Slugs
Projects automatically generate URL-friendly slugs from titles.

### Auto-Generated Alt Text
Media uploads auto-generate alt text from filenames for accessibility.

### Live Preview
All globals and the Projects collection support live preview in the admin panel.

### Rich Text Editor
Lexical editor with formatting, headings, lists, and more.

### Image Processing
Sharp library processes images into multiple sizes automatically.

## 🔄 Fetching Data in Next.js

### Get Payload Instance
```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
```

### Fetch Collections
```typescript
// Get all projects
const projects = await payload.find({
  collection: 'projects',
})

// Get single project by slug
const project = await payload.find({
  collection: 'projects',
  where: {
    slug: {
      equals: 'my-project',
    },
  },
})
```

### Fetch Globals
```typescript
// Get hero section
const hero = await payload.findGlobal({
  slug: 'hero-section',
})

// Get contact section
const contact = await payload.findGlobal({
  slug: 'contact-section',
})
```

## 📝 TypeScript Types

Payload automatically generates TypeScript types for all collections and globals.

The types are generated at `payload-types.ts` (gitignored) and are regenerated on each build.

```typescript
import type { Project, Media, HeroSection } from '@/payload-types'
```

## 🚢 Deployment

### Environment Variables for Production
Make sure to set these in your hosting platform:
- `PAYLOAD_SECRET` (use a strong random string)
- `DATABASE_URL` (your production PostgreSQL connection string)
- `NEXT_PUBLIC_SERVER_URL` (your production domain)
- `BLOB_READ_WRITE_TOKEN` (optional, for Vercel Blob)

### Build
```bash
yarn build
```

The Next.js config is set to `output: 'standalone'` for optimized production builds.

## 🛠️ Customization

### Adding a New Collection
1. Create a new file in `src/collections/YourCollection.ts`
2. Define your collection schema
3. Import and add to `collections` array in `src/payload.config.ts`

### Adding a New Global
1. Create a new file in `src/globals/YourGlobal.ts`
2. Define your global schema
3. Import and add to `globals` array in `src/payload.config.ts`

### Modifying Existing Collections
Edit the collection files in `src/collections/` and restart the dev server.

## 📚 Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Payload CMS with Next.js](https://payloadcms.com/docs/getting-started/nextjs)
- [Lexical Editor](https://payloadcms.com/docs/rich-text/lexical)
- [PostgreSQL Adapter](https://payloadcms.com/docs/database/postgres)

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure Docker is running
- Check if PostgreSQL container is running: `docker ps`
- Verify DATABASE_URL in `.env.local`

### Admin Panel Not Loading
- Check if PAYLOAD_SECRET is set in `.env.local`
- Clear `.next` folder and rebuild: `rm -rf .next && yarn dev`

### Media Upload Issues
- Check `public/media` folder exists and has write permissions
- For Vercel Blob, verify BLOB_READ_WRITE_TOKEN is valid

### TypeScript Errors
- Ensure `@payload-config` path alias is in `tsconfig.json`
- Regenerate types by rebuilding the project

## 🎉 Next Steps

1. Create your first admin user at [http://localhost:3000/admin](http://localhost:3000/admin)
2. Upload some media in the Media collection
3. Create a project in the Projects collection
4. Configure the global sections for your homepage
5. Start building your frontend to display the CMS content!

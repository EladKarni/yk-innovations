# Setup Guide - YK Innovations Website

## Quick Start

This guide will help you get the redesigned YK Innovations website up and running.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or access to a hosted PostgreSQL instance)
- Git

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ykinnovations"

# Payload CMS
PAYLOAD_SECRET="your-secret-key-here"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

# Optional: Vercel Blob Storage (for production)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

### 3. Database Setup

Start your PostgreSQL database and run Payload migrations:

```bash
# Using Docker (included in the project)
docker-compose up -d

# Run Payload migrations
npm run payload migrate
```

### 4. Create Admin User

Start the development server and navigate to `/admin` to create your first admin user:

```bash
npm run dev
```

Visit `http://localhost:3000/admin` and follow the setup wizard.

## Adding Content

### 1. Add Project Images

Before adding projects, you'll need placeholder images. Add images to your `public/images/` directory:

```
public/images/
├── hero-bg.jpg          # Homepage hero background
├── about-hero.jpg       # About section image
├── project-1.jpg        # Project thumbnails
├── project-2.jpg
├── project-3.jpg
└── ...
```

**Note**: These are placeholder paths. You can either:
- Add actual images with these names
- Update the image paths in the components
- Upload images through Payload CMS and reference them

### 2. Add Projects via CMS

1. Navigate to `http://localhost:3000/admin`
2. Click on "Projects" in the sidebar
3. Click "Create New"
4. Fill in the project details:
   - Title: Your project name
   - Slug: Will auto-generate from title
   - Category: Choose appropriate category
   - Featured: Check for homepage display
   - Description: Short description for cards
   - Full Description: Detailed project information
   - Upload Hero Image
   - Add Technologies
   - Add Features
   - Optional: Client, Duration, Year
   - Optional: Challenge & Solution
   - Optional: Results metrics

### 3. Add Services via CMS

1. Go to "Services" in the admin panel
2. Create services that match your offerings:
   - Title: Service name
   - Description: What you offer
   - Icon: Choose appropriate icon type
   - Order: Display order (lower first)

### 4. Add Testimonials via CMS

1. Go to "Testimonials" in the admin panel
2. Add client testimonials:
   - Quote: The testimonial text
   - Author: Client name
   - Role: Their job title
   - Company: Company name
   - Featured: Check to show on homepage
   - Optional: Upload author avatar

## Customization

### Update Company Information

#### 1. Homepage Hero (`/src/app/page.tsx`)

```typescript
<Hero
  title="Your Custom Title"
  subtitle="Your Tagline"
  description="Your description"
  // ... other props
/>
```

#### 2. About Section (`/src/app/page.tsx`)

```typescript
<AboutSection
  title="Your About Title"
  description="Your company story"
  stats={[
    { value: "100+", label: "Projects" },
    { value: "50+", label: "Clients" },
    { value: "5+", label: "Years" },
  ]}
/>
```

#### 3. Footer (`/src/components/footer.tsx`)

Update company description, contact info, and social links:
- Line 22-23: Company description
- Line 84-90: Email address
- Line 95-101: Phone number
- Lines 107-139: Social media URLs

#### 4. Contact Section (`/src/views/ContactSection.tsx`)

Update contact information:
- Lines 135-137: Email
- Lines 147-149: Phone
- Lines 159-163: Physical address

### Update Navigation Links

Edit `/src/constants/navLinks.ts`:

```typescript
export const navLinkList = [
  { label: "Home", url: "/", style: "default" },
  { label: "About", url: "#about", style: "default" },
  { label: "Services", url: "#solutions", style: "default" },
  { label: "Contact", url: "#contact", style: "default" },
  // Add more links as needed
];
```

### Customize Colors

Edit `/tailwind.config.ts` to change theme colors:

```typescript
light: {
  primary: "#1f2937",        // Your primary color
  secondary: "#3b82f6",      // Your secondary color
  accent: "#0693e3",         // Your accent color
  // ... other colors
},
dark: {
  primary: "#0693e3",        // Your primary color
  // ... other colors
}
```

### Modify Sections

You can show/hide sections on the homepage by commenting them out in `/src/app/page.tsx`:

```typescript
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero {...} />
      <AboutSection {...} />
      <FeaturedProjectsSection />
      {/* <ServicesSection /> */}  // Hide services
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
```

## Image Guidelines

### Hero Images
- **Size**: 1920x1080px or larger
- **Format**: JPG or WebP
- **Optimization**: Compress for web (< 500KB)

### Project Images
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: JPG or WebP
- **Optimization**: Compress for web (< 300KB)

### Avatar Images
- **Size**: 200x200px (square)
- **Format**: JPG, PNG, or WebP
- **Optimization**: Compress for web (< 100KB)

## Development Workflow

### Running Locally

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

### Payload CMS Admin

Access at: `http://localhost:3000/admin`

### Type Generation

After making CMS changes, regenerate types:

```bash
npm run payload generate:types
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import repository to Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `PAYLOAD_SECRET`
   - `NEXT_PUBLIC_SERVER_URL`
   - `BLOB_READ_WRITE_TOKEN` (optional)

4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
PAYLOAD_SECRET="your-production-secret"
NEXT_PUBLIC_SERVER_URL="https://yourdomain.com"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

## Troubleshooting

### Database Connection Issues

If you see database errors:

1. Check PostgreSQL is running:
   ```bash
   docker-compose ps
   ```

2. Verify DATABASE_URL in `.env.local`

3. Run migrations:
   ```bash
   npm run payload migrate
   ```

### Missing Images

If images don't display:

1. Check the path in `public/images/`
2. Verify the image name matches the component reference
3. For production, upload images through Payload CMS

### Build Errors

If you get build errors:

1. Clear Next.js cache:
   ```bash
   rm -rf .next
   ```

2. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Regenerate Payload types:
   ```bash
   npm run payload generate:types
   ```

### Theme Not Persisting

If theme changes don't persist:

1. Check localStorage in browser DevTools
2. Clear browser cache
3. Verify JavaScript is enabled

## Performance Tips

### Image Optimization

1. Use WebP format for better compression
2. Provide multiple sizes with `srcset`
3. Implement lazy loading for below-fold images
4. Use Next.js Image component (already implemented)

### Loading Speed

1. Enable caching headers
2. Use CDN for static assets (Vercel provides this)
3. Minimize JavaScript bundles
4. Implement code splitting (already done)

### SEO

1. Update metadata in each page
2. Add sitemap.xml (see Next.js docs)
3. Add robots.txt
4. Implement structured data
5. Optimize page titles and descriptions

## Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Payload CMS Documentation**: https://payloadcms.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **DaisyUI**: https://daisyui.com/

## Support

For issues or questions:

1. Check the DESIGN.md file for design documentation
2. Review Next.js and Payload CMS documentation
3. Check component source code for inline comments
4. Review this setup guide

## Next Steps

1. ✅ Complete installation
2. ✅ Set up database
3. ✅ Create admin user
4. 📝 Add your first project
5. 📝 Customize company information
6. 📝 Add team testimonials
7. 📝 Replace placeholder images
8. 📝 Test on mobile devices
9. 📝 Deploy to production
10. 📝 Set up analytics

---

**Congratulations!** Your YK Innovations website is ready to use. Start by adding content through the Payload CMS admin panel and customizing the components to match your brand.

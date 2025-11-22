# Placeholder Images Reference

All images in the website are now using [Picsum Photos](https://picsum.photos/) for beautiful placeholder images. When you're ready to add your own images, simply replace these URLs with your actual image paths.

## Current Placeholder Image URLs

### Homepage

| Component | Size | URL | Random ID |
|-----------|------|-----|-----------|
| Hero Background | 1920x1080 | `https://picsum.photos/1920/1080?random=1` | 1 |
| About Section | 800x600 | `https://picsum.photos/800/600?random=2` | 2 |
| Featured Project 1 | 1200x800 | `https://picsum.photos/1200/800?random=3` | 3 |
| Featured Project 2 | 1200x800 | `https://picsum.photos/1200/800?random=4` | 4 |
| Featured Project 3 | 1200x800 | `https://picsum.photos/1200/800?random=5` | 5 |

### Projects Page (`/projects`)

| Project | Size | URL | Random ID |
|---------|------|-----|-----------|
| E-Commerce Platform | 1200x800 | `https://picsum.photos/1200/800?random=3` | 3 |
| Healthcare Dashboard | 1200x800 | `https://picsum.photos/1200/800?random=4` | 4 |
| Fitness Tracking App | 1200x800 | `https://picsum.photos/1200/800?random=5` | 5 |
| Real Estate Platform | 1200x800 | `https://picsum.photos/1200/800?random=6` | 6 |
| Learning Management System | 1200x800 | `https://picsum.photos/1200/800?random=7` | 7 |
| Food Delivery App | 1200x800 | `https://picsum.photos/1200/800?random=8` | 8 |

### Project Detail Page (`/projects/ecommerce-platform`)

| Image | Size | URL | Random ID |
|-------|------|-----|-----------|
| Hero Image | 1920x1080 | `https://picsum.photos/1920/1080?random=3` | 3 |
| Gallery Image 1 | 1200x800 | `https://picsum.photos/1200/800?random=9` | 9 |
| Gallery Image 2 | 1200x800 | `https://picsum.photos/1200/800?random=10` | 10 |
| Gallery Image 3 | 1200x800 | `https://picsum.photos/1200/800?random=11` | 11 |

## Replacing Placeholder Images

When you're ready to use your own images, you have two options:

### Option 1: Upload via Payload CMS (Recommended)

1. Navigate to `http://localhost:3000/admin`
2. Go to "Media" collection
3. Upload your images
4. Use the uploaded images in your Projects, Services, etc.

### Option 2: Replace URLs in Code

Find and replace the picsum URLs in these files:

**Homepage (`src/app/page.tsx`):**
```typescript
// Line 25
backgroundImage="https://picsum.photos/1920/1080?random=1"
// Replace with:
backgroundImage="/images/your-hero-image.jpg"
```

**About Section (`src/views/AboutSection.tsx`):**
```typescript
// Line 27
image = "https://picsum.photos/800/600?random=2"
// Replace with:
image = "/images/your-about-image.jpg"
```

**Featured Projects (`src/views/FeaturedProjectsSection.tsx`):**
```typescript
// Lines 27, 36, 45
image: "https://picsum.photos/1200/800?random=3"
// Replace with:
image: "/images/your-project-1.jpg"
```

**Projects Page (`src/app/projects/page.tsx`):**
```typescript
// Lines 9, 18, 26, 34, 42, 50
image: "https://picsum.photos/1200/800?random=X"
// Replace with:
image: "/images/your-project-X.jpg"
```

**Project Detail (`src/app/projects/[slug]/page.tsx`):**
```typescript
// Line 13
image: "https://picsum.photos/1920/1080?random=3"
// Replace with:
image: "/images/your-project-detail.jpg"

// Lines 35-37 (gallery)
gallery: [
  "https://picsum.photos/1200/800?random=9",
  // Replace with your gallery images
]
```

## Image Size Guidelines

### Recommended Image Sizes

- **Hero Backgrounds**: 1920x1080px (16:9 ratio)
- **Project Cards**: 1200x800px (3:2 ratio)
- **About/Feature Images**: 800x600px (4:3 ratio)
- **Gallery Images**: 1200x800px (3:2 ratio)

### Optimization Tips

1. **Format**: Use WebP for better compression (JPEG fallback)
2. **Size**: Keep images under 500KB for hero, 300KB for cards
3. **Tools**: Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
4. **Next.js**: The Image component automatically optimizes images

## About Picsum Photos

[Picsum Photos](https://picsum.photos/) provides beautiful, random stock photos from Unsplash. Each time you visit the page, you'll see different images (cached after first load).

### Features:
- ✅ Free to use
- ✅ No attribution required
- ✅ High-quality images
- ✅ Responsive sizing
- ✅ Cached for performance

### URL Format:
```
https://picsum.photos/WIDTH/HEIGHT?random=ID
```

- `WIDTH` and `HEIGHT`: Desired dimensions
- `random=ID`: Unique ID to get a specific random image

## Next Steps

1. **Test the Site**: Run `npm run dev` and see the placeholder images
2. **Gather Your Images**: Collect or create your project images
3. **Optimize**: Compress images before uploading
4. **Replace**: Either upload via CMS or replace URLs in code
5. **Verify**: Check all pages to ensure images load correctly

---

**Note**: The placeholder images are great for development and demo purposes. Remember to replace them with your actual project images before going live!

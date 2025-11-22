# YK Innovations Website Redesign

## Overview

This website has been completely redesigned with a modern, professional aesthetic that blends the clean minimalism of shay-development.netlify.app with design elements inspired by kii.am. The design prioritizes projects showcase while maintaining excellent user experience across both light and dark themes.

## Design Philosophy

- **Clean & Minimal**: Professional restraint with glass-morphism effects
- **Light Theme Default**: White and light gray backgrounds with excellent contrast
- **Projects-Focused**: Prominent project showcase throughout the site
- **Responsive First**: Mobile-optimized with progressive enhancement
- **Performance-Oriented**: Optimized animations and efficient loading

## Theme System

### Light Theme (Default)
- **Primary Color**: Gray-900 (#1f2937)
- **Background**: White (#ffffff)
- **Alternate Background**: Gray-50 (#f9fafb)
- **Accent**: Cyan-blue (#0693e3)
- **Text**: Gray-900 for high contrast

### Dark Theme
- **Primary Color**: Cyan-blue (#0693e3)
- **Background**: Deep black (#0a0a0a)
- **Alternate Background**: Charcoal (#1a1a1a)
- **Text**: White with excellent contrast

### Theme Toggle
Users can switch between light and dark themes using the toggle in the navigation bar. The preference is saved to localStorage and persists across sessions.

## Page Structure

### Homepage (`/`)
The homepage features a comprehensive layout with:

1. **Hero Section**
   - Full-screen background image with overlay
   - Large, bold headline
   - Dual CTAs (primary and ghost button)
   - Smooth animations with staggered delays

2. **About Section**
   - Image and text layout
   - Statistics showcase (projects, clients, years)
   - CTA button
   - Alternating background (base-200)

3. **Featured Projects Section**
   - 3-column grid of project cards
   - Glass-morphism card styling
   - Hover effects with image scaling
   - "View All Projects" CTA
   - Alternating background (base-200)

4. **Services Section**
   - 6 service cards in a 3-column grid
   - Icon-driven design
   - Glass-morphism effects
   - Hover animations

5. **Process Section**
   - 4-step process visualization
   - Numbered badges
   - Icon cards with connecting lines (desktop)
   - Alternating background (base-200)

6. **Testimonials Section**
   - 3 testimonial cards
   - Quote styling with avatars
   - Glass-morphism cards
   - Client attribution

7. **Contact Section**
   - Two-column layout (form + contact info)
   - Enhanced form with validation styles
   - Contact information with icons
   - Social media links

### Projects Page (`/projects`)
- Full project listing with filtering
- Category filter buttons
- 3-column responsive grid
- Consistent card styling with homepage

### Project Detail Page (`/projects/[slug]`)
- Hero image with overlay
- Comprehensive project information
- Key features list
- Challenge/Solution sections
- Results metrics
- Technology tags
- Related CTAs
- Optional image gallery

## Components

### Core Components

#### Hero (`/src/components/Hero.tsx`)
Full-screen hero section with:
- Background image or video support
- Customizable overlay opacity
- Dual CTA buttons
- Smooth fade-in animations
- Scroll indicator

#### ProjectCard (`/src/components/ProjectCard.tsx`)
Project showcase cards featuring:
- Glass-morphism styling
- Image hover effects (scale on hover)
- Technology tags
- Category badge
- Smooth transitions
- Link to project detail page

#### IconCard (`/src/components/IconCard.tsx`)
Versatile card component for services/features:
- Icon slot
- Title and description
- Optional link
- Three variants: default, glass, bordered
- Hover effects

#### ThemeToggle (`/src/components/ThemeToggle.tsx`)
Theme switching component:
- Light/dark mode toggle
- localStorage persistence
- Smooth transitions
- Accessible with ARIA labels

#### CTAButton (`/src/ui/CTAButton.tsx`)
Flexible button component:
- 3 variants: primary, ghost, secondary
- 3 sizes: sm, md, lg
- Loading state
- Icon support
- Link or button functionality

### Section Components

All section components are located in `/src/views/`:

- **AboutSection**: Company information with stats
- **ServicesSection**: Services grid display
- **ProcessSection**: Step-by-step process visualization
- **FeaturedProjectsSection**: Projects showcase
- **TestimonialsSection**: Client testimonials
- **ContactSection**: Contact form with info

### Layout Components

#### SectionContainer (`/src/ui/SectionContainer.tsx`)
Wrapper component for consistent sections:
- Background options: none, base, alt, gradient
- Consistent padding
- Max-width container
- Scroll margin for anchor links

#### Navbar (`/src/components/navbar.tsx`)
Sticky navigation with:
- Scroll shadow effect
- Theme toggle integration
- CTA button
- Responsive mobile menu

#### Footer (`/src/components/footer.tsx`)
Enhanced footer with:
- 4-column grid layout
- Quick links
- Services list
- Contact information
- Social media links
- Bottom bar with legal links

## Styling System

### Tailwind Classes

#### Glass-morphism Effect
```jsx
className="bg-white/60 dark:bg-base-200/60 backdrop-blur-sm border border-gray-300 dark:border-base-300"
```

#### Hover Card Effect
```jsx
className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
```

#### Image Hover Scale
```jsx
className="group-hover:scale-105 transition-transform duration-500"
```

### Custom Animations

Defined in `/src/app/globals.css`:

- `animate-fade-in`: Smooth fade in
- `animate-fade-in-up`: Fade in with upward motion
- `animation-delay-200/400/600/800`: Staggered animation delays

## Payload CMS Integration

### Collections

#### Projects Collection
Enhanced with new fields:
- `category`: Project categorization
- `featured`: Boolean flag for homepage display
- `order`: Display order
- `client`, `duration`, `year`: Project metadata
- `challenge`, `solution`: Project narrative
- `results`: Array of metrics

#### Services Collection (New)
Manage services displayed on homepage:
- `title`: Service name
- `description`: Service description
- `icon`: Icon type selector
- `order`: Display order
- `link`: Optional link configuration

#### Testimonials Collection (New)
Manage client testimonials:
- `quote`: Testimonial text
- `author`, `role`, `company`: Attribution
- `avatar`: Optional author image
- `featured`: Homepage display flag
- `rating`: Star rating (1-5)

### Accessing CMS Data

To integrate with Payload CMS in your pages:

```typescript
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const payload = await getPayloadHMR({ config: configPromise })

const projects = await payload.find({
  collection: 'projects',
  where: {
    featured: { equals: true }
  },
  limit: 3,
  sort: 'order'
})
```

## Responsive Design

### Breakpoints
Following Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile Optimizations
- Hamburger menu for navigation
- Single-column layouts on mobile
- Touch-optimized button sizes
- Optimized image loading
- Reduced animations on mobile

## Performance Considerations

### Image Optimization
- Next.js Image component for automatic optimization
- Proper sizing attributes
- Lazy loading for below-fold content
- WebP format support

### Code Splitting
- Dynamic imports where appropriate
- Client components marked with "use client"
- Optimized bundle sizes

### Animations
- Hardware-accelerated transforms
- Reduced motion support
- Efficient keyframe animations

## Accessibility

### Features
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- High contrast text
- Screen reader friendly

### Testing
Test with:
- Keyboard navigation (Tab, Enter, Escape)
- Screen readers (NVDA, JAWS, VoiceOver)
- Browser zoom (up to 200%)
- Color contrast checkers

## Browser Support

### Supported Browsers
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Progressive Enhancement
- Fallbacks for modern CSS features
- JavaScript optional for basic functionality
- Graceful degradation

## Future Enhancements

### Potential Additions
1. Blog section with articles
2. Case study deep-dives
3. Team member profiles
4. Interactive project filters
5. Search functionality
6. Newsletter signup
7. Live chat integration
8. Analytics dashboard
9. A/B testing setup
10. Multi-language support

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run Payload CMS migrations
npm run payload migrate

# Generate Payload types
npm run payload generate:types
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with themes
│   ├── page.tsx             # Homepage
│   ├── projects/
│   │   ├── page.tsx         # Projects listing
│   │   └── [slug]/
│   │       └── page.tsx     # Project detail
│   └── globals.css          # Global styles & animations
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── ProjectCard.tsx      # Project cards
│   ├── IconCard.tsx         # Icon-based cards
│   ├── ThemeToggle.tsx      # Theme switcher
│   ├── navbar.tsx           # Navigation bar
│   ├── footer.tsx           # Footer
│   ├── NavLinks.tsx         # Desktop nav links
│   └── MobileMenu.tsx       # Mobile menu
├── views/
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── ProcessSection.tsx
│   ├── FeaturedProjectsSection.tsx
│   ├── TestimonialsSection.tsx
│   └── ContactSection.tsx
├── ui/
│   ├── CTAButton.tsx        # Button component
│   └── SectionContainer.tsx # Section wrapper
├── collections/
│   ├── Projects.ts          # Enhanced projects
│   ├── Services.ts          # New services
│   └── Testimonials.ts      # New testimonials
└── payload.config.ts        # Payload configuration
```

## Design Credits

- Inspired by [kii.am](https://kii.am/) - Dark theme and component patterns
- Inspired by [shay-development.netlify.app](https://shay-development.netlify.app/) - Light theme and glass-morphism
- Built for [YK Innovations](https://ykinnovations.com/)

## Support

For questions or issues with the design system, please refer to:
- Next.js documentation: https://nextjs.org/docs
- Tailwind CSS documentation: https://tailwindcss.com/docs
- DaisyUI documentation: https://daisyui.com/
- Payload CMS documentation: https://payloadcms.com/docs

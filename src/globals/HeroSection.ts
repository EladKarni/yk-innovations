import type { GlobalConfig } from "payload";

export const HeroSection: GlobalConfig = {
  slug: "hero-section",
  label: "Hero",
  admin: {
    description: "Manage the main hero section on the homepage",
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/api/preview?global=hero-section`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      defaultValue: "Building Communities, Creating Value",
      admin: {
        description: "Main headline displayed in the hero section",
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      required: true,
      defaultValue: "Premier Real Estate Development & Investment Solutions",
      admin: {
        description: "Subheading text below the main title",
      },
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: "Background Image",
      relationTo: "media",
      required: true,
      admin: {
        description: "Background image for the hero section",
      },
    },
    {
      name: "backgroundPosition",
      type: "text",
      label: "Background Position",
      defaultValue: "65% center",
      admin: {
        description: 'CSS background position (e.g., "center", "65% center")',
      },
    },
  ],
};

import type { GlobalConfig } from "payload";

export const HeroSection: GlobalConfig = {
  slug: "hero-section",
  label: "Hero",
  admin: {
    description: "Manage the main hero section on the homepage",
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/api/preview?url=/&secret=${process.env.PAYLOAD_SECRET}`
      },
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      required: false,
      defaultValue: "Welcome to YK Innovations",
      admin: {
        description: "Small text above the main title",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      defaultValue: "Bringing Your Product Ideas to Life",
      admin: {
        description: "Main headline displayed in the hero section",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: false,
      defaultValue: "Expert mechanical engineering and rapid prototyping services that transform your concepts into functional prototypes.",
      admin: {
        description: "Hero description text",
      },
    },
    {
      name: "primaryCTA",
      type: "group",
      label: "Primary Call to Action",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Button Text",
          required: false,
          defaultValue: "Start Your Project",
        },
        {
          name: "href",
          type: "text",
          label: "Button Link",
          required: false,
          defaultValue: "#contact",
        },
      ],
    },
    {
      name: "secondaryCTA",
      type: "group",
      label: "Secondary Call to Action",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Button Text",
          required: false,
          defaultValue: "View Our Prototypes",
        },
        {
          name: "href",
          type: "text",
          label: "Button Link",
          required: false,
          defaultValue: "#projects",
        },
      ],
    },
    {
      name: "backgroundImage",
      type: "upload",
      label: "Background Image",
      relationTo: "media",
      required: false,
      admin: {
        description: "Background image for the hero section",
      },
    },
    {
      name: "backgroundVideo",
      type: "text",
      label: "Background Video URL",
      required: false,
      admin: {
        description: "URL to background video (optional, overrides image if provided)",
      },
    },
    {
      name: "overlay",
      type: "checkbox",
      label: "Show Overlay",
      defaultValue: true,
      admin: {
        description: "Add dark overlay over background",
      },
    },
    {
      name: "overlayOpacity",
      type: "number",
      label: "Overlay Opacity",
      defaultValue: 40,
      min: 0,
      max: 100,
      admin: {
        description: "Overlay opacity percentage (0-100)",
      },
    },
  ],
};

import type { GlobalConfig } from "payload";

export const FooterSection: GlobalConfig = {
  slug: "footer-section",
  label: "Footer Section",
  admin: {
    description: "Manage footer content, links, and services",
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
      name: "services",
      type: "array",
      label: "Service Links",
      required: false,
      maxRows: 10,
      fields: [
        {
          name: "label",
          type: "text",
          label: "Service Name",
          required: true,
        },
        {
          name: "href",
          type: "text",
          label: "Link URL",
          required: true,
          admin: {
            description: 'URL or anchor (e.g., "/#solutions", "/services")',
          },
        },
      ],
      defaultValue: [
        { label: "CAD Design & Engineering", href: "/#solutions" },
        { label: "Rapid Prototyping", href: "/#solutions" },
        { label: "Design for Manufacturing", href: "/#solutions" },
        { label: "Testing & Validation", href: "/#solutions" },
      ],
      admin: {
        description: "List of services to display in the footer",
      },
    },
    {
      name: "showQuickLinks",
      type: "checkbox",
      label: "Show Quick Links Section",
      defaultValue: true,
      admin: {
        description: "Toggle the quick links section in footer",
      },
    },
    {
      name: "legalLinks",
      type: "array",
      label: "Legal Links",
      required: false,
      maxRows: 5,
      fields: [
        {
          name: "label",
          type: "text",
          label: "Link Text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          label: "Link URL",
          required: true,
        },
      ],
      defaultValue: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
      admin: {
        description: "Legal links displayed at the bottom of the footer",
      },
    },
    {
      name: "copyrightText",
      type: "text",
      label: "Copyright Text",
      required: false,
      defaultValue: "YK Innovations. All rights reserved.",
      admin: {
        description: "Copyright text (year will be automatically added)",
      },
    },
  ],
};

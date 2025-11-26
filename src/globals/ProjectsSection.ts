import type { GlobalConfig } from "payload";

export const ProjectsSection: GlobalConfig = {
  slug: "projects-section",
  label: "Projects Section",
  admin: {
    description: "Manage the Projects section content on the homepage",
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
      name: "title",
      type: "text",
      label: "Section Title",
      required: true,
      defaultValue: "Featured Developments",
      admin: {
        description: "Main heading for the projects section",
      },
    },
  ],
};

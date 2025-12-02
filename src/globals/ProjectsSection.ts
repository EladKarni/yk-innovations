import type { GlobalConfig } from "payload";

export const ProjectsSection: GlobalConfig = {
  slug: "projects-section",
  label: "Projects Section",
  admin: {
    description: "Manage the Projects section content on the homepage",
    livePreview: {
      url: () => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        return `${baseUrl}/api/preview?url=/&secret=${process.env.PAYLOAD_SECRET}`;
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
        description: "Main heading for the projects section on the homepage",
      },
    },
    {
      name: "pageHeader",
      type: "group",
      label: "Projects Page Header",
      admin: {
        description: "Header content for the /projects page",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Label (Off-title)",
          defaultValue: "Portfolio",
          admin: {
            description: "Small text displayed above the main title",
          },
        },
        {
          name: "title",
          type: "text",
          label: "Page Title",
          defaultValue: "Our Projects",
          admin: {
            description: "Main heading for the projects page",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          defaultValue:
            "Explore our portfolio of prototyping and engineering projects across various industries. Each prototype demonstrates our expertise in bringing product concepts to reality.",
          admin: {
            description: "Introductory text displayed below the title",
          },
        },
      ],
    },
  ],
};

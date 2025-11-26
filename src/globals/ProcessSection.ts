import type { GlobalConfig } from "payload";

export const ProcessSection: GlobalConfig = {
  slug: "process-section",
  label: "Process Section",
  admin: {
    description: "Manage the process/workflow section on the homepage",
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
      required: true,
      defaultValue: "How We Work",
      admin: {
        description: "Small text above the main title",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      defaultValue: "Our Process",
      admin: {
        description: "Main heading for the process section",
      },
    },
    {
      name: "steps",
      type: "array",
      label: "Process Steps",
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: "number",
          type: "text",
          label: "Step Number",
          required: true,
          admin: {
            description: 'Step number to display (e.g., "01", "02")',
          },
        },
        {
          name: "icon",
          type: "select",
          label: "Icon",
          required: true,
          options: [
            { label: "Lightbulb (Concept)", value: "lightbulb" },
            { label: "Design Tools (Design)", value: "design" },
            { label: "Flask (Prototyping)", value: "flask" },
            { label: "Shield Check (Production)", value: "shield" },
            { label: "Cog (Settings)", value: "cog" },
            { label: "Rocket (Launch)", value: "rocket" },
          ],
          defaultValue: "lightbulb",
          admin: {
            description: "Icon to display for this step",
          },
        },
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
          admin: {
            description: "Title of the process step",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          required: true,
          admin: {
            description: "Description of what happens in this step",
          },
        },
      ],
      defaultValue: [
        {
          number: "01",
          icon: "lightbulb",
          title: "Concept Development",
          description:
            "We begin by understanding your product requirements, target market, and functional specifications. Together, we refine your concept and establish clear design criteria.",
        },
        {
          number: "02",
          icon: "design",
          title: "Design & Engineering",
          description:
            "Our engineers create detailed CAD models, perform structural analysis, and optimize the design for functionality, manufacturability, and cost-effectiveness.",
        },
        {
          number: "03",
          icon: "flask",
          title: "Prototyping & Testing",
          description:
            "We fabricate functional prototypes using 3D printing or CNC machining, then conduct thorough testing to validate design performance and identify improvements.",
        },
        {
          number: "04",
          icon: "shield",
          title: "Production Support",
          description:
            "We provide manufacturing documentation, vendor recommendations, and ongoing engineering support to ensure a smooth transition from prototype to full production.",
        },
      ],
      admin: {
        description: "List of steps in your process",
      },
    },
  ],
};

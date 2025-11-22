import type { GlobalConfig } from "payload";

export const ContactSection: GlobalConfig = {
  slug: "contact-section",
  label: "Contact",
  admin: {
    description: "Manage the Contact section form labels and content",
    livePreview: {
      url: () => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/api/preview?global=contact-section`
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
      defaultValue: "Get In Touch",
      admin: {
        description: "Section heading",
      },
    },
    {
      name: "nameLabel",
      type: "text",
      label: "Name Field Label",
      required: true,
      defaultValue: "Name",
      admin: {
        description: "Label for name field",
      },
    },
    {
      name: "namePlaceholder",
      type: "text",
      label: "Name Field Placeholder",
      required: true,
      defaultValue: "Your name",
      admin: {
        description: "Placeholder for name field",
      },
    },
    {
      name: "emailLabel",
      type: "text",
      label: "Email Field Label",
      required: true,
      defaultValue: "Email",
      admin: {
        description: "Label for email field",
      },
    },
    {
      name: "emailPlaceholder",
      type: "text",
      label: "Email Field Placeholder",
      required: true,
      defaultValue: "your@email.com",
      admin: {
        description: "Placeholder for email field",
      },
    },
    {
      name: "messageLabel",
      type: "text",
      label: "Message Field Label",
      required: true,
      defaultValue: "Message",
      admin: {
        description: "Label for message field",
      },
    },
    {
      name: "messagePlaceholder",
      type: "text",
      label: "Message Field Placeholder",
      required: true,
      defaultValue: "Your message",
      admin: {
        description: "Placeholder for message field",
      },
    },
    {
      name: "submitButtonText",
      type: "text",
      label: "Submit Button Text",
      required: true,
      defaultValue: "Send Message",
      admin: {
        description: "Text for submit button",
      },
    },
  ],
};

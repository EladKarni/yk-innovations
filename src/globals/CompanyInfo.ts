import type { GlobalConfig } from "payload";

export const CompanyInfo: GlobalConfig = {
  slug: "company-info",
  label: "Company Info",
  admin: {
    description: "Manage company contact information and social media links (used in footer, contact section, etc.)",
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
      name: "companyName",
      type: "text",
      label: "Company Name",
      required: true,
      defaultValue: "YK Innovations",
      admin: {
        description: "Official company name",
      },
    },
    {
      name: "tagline",
      type: "text",
      label: "Tagline",
      required: false,
      defaultValue: "Expert mechanical engineering and rapid prototyping services. We transform product concepts into functional prototypes.",
      admin: {
        description: "Short company description/tagline",
      },
    },
    {
      name: "logo",
      type: "upload",
      label: "Company Logo",
      relationTo: "media",
      required: false,
      admin: {
        description: "Company logo (used in footer, navbar, etc.)",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      defaultValue: "contact@ykinnovations.com",
      admin: {
        description: "Primary contact email",
      },
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
      required: true,
      defaultValue: "+1 (234) 567-890",
      admin: {
        description: "Primary contact phone number",
      },
    },
    {
      name: "phoneHref",
      type: "text",
      label: "Phone Number (tel: format)",
      required: false,
      defaultValue: "+1234567890",
      admin: {
        description: 'Phone number for tel: links (digits only, e.g., "+1234567890")',
      },
    },
    {
      name: "address",
      type: "group",
      label: "Address",
      fields: [
        {
          name: "street",
          type: "text",
          label: "Street Address",
          required: false,
        },
        {
          name: "city",
          type: "text",
          label: "City",
          required: false,
        },
        {
          name: "state",
          type: "text",
          label: "State/Province",
          required: false,
        },
        {
          name: "zip",
          type: "text",
          label: "Zip/Postal Code",
          required: false,
        },
        {
          name: "country",
          type: "text",
          label: "Country",
          required: false,
        },
      ],
      admin: {
        description: "Physical address (optional)",
      },
    },
    {
      name: "socialMedia",
      type: "group",
      label: "Social Media Links",
      fields: [
        {
          name: "github",
          type: "text",
          label: "GitHub URL",
          required: false,
          defaultValue: "https://github.com",
          admin: {
            description: "Full URL to GitHub profile/organization",
          },
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
          required: false,
          defaultValue: "https://linkedin.com",
          admin: {
            description: "Full URL to LinkedIn profile/company page",
          },
        },
        {
          name: "twitter",
          type: "text",
          label: "Twitter/X URL",
          required: false,
          defaultValue: "https://twitter.com",
          admin: {
            description: "Full URL to Twitter/X profile",
          },
        },
        {
          name: "facebook",
          type: "text",
          label: "Facebook URL",
          required: false,
          admin: {
            description: "Full URL to Facebook page",
          },
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram URL",
          required: false,
          admin: {
            description: "Full URL to Instagram profile",
          },
        },
      ],
      admin: {
        description: "Social media profile links",
      },
    },
    {
      name: "businessHours",
      type: "textarea",
      label: "Business Hours",
      required: false,
      admin: {
        description: "Business operating hours (optional)",
      },
    },
  ],
};

import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/api/preview?collection=projects&slug=${data.slug}`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.title && !value) {
              return data.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Web Development', value: 'web-development' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Enterprise', value: 'enterprise' },
        { label: 'EdTech', value: 'edtech' },
        { label: 'E-Commerce', value: 'ecommerce' },
        { label: 'Healthcare', value: 'healthcare' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured projects appear prominently on the homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description for project cards',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed project description for project detail page',
      },
    },
    {
      name: 'client',
      type: 'text',
      admin: {
        description: 'Client name (optional)',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'Project duration (e.g., "6 months")',
      },
    },
    {
      name: 'year',
      type: 'text',
      admin: {
        description: 'Year completed',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Image Gallery',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies Used',
      minRows: 1,
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'challenge',
      type: 'textarea',
      label: 'Project Challenge',
      admin: {
        description: 'What was the main challenge of this project?',
      },
    },
    {
      name: 'solution',
      type: 'textarea',
      label: 'Our Solution',
      admin: {
        description: 'How did we solve the challenge?',
      },
    },
    {
      name: 'results',
      type: 'array',
      label: 'Project Results',
      minRows: 0,
      maxRows: 5,
      fields: [
        {
          name: 'metric',
          type: 'text',
          required: true,
          label: 'Result Metric',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
      ],
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'Call to Action Link',
      admin: {
        description: 'Optional link for live project or case study',
      },
    },
  ],
}

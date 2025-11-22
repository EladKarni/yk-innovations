import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
      admin: {
        description: 'The testimonial text from the client',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Job Title/Role',
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Author Avatar',
      admin: {
        description: 'Optional avatar image for the author',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Testimonial',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured testimonials appear on the homepage',
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
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Rating out of 5 stars',
      },
    },
  ],
}

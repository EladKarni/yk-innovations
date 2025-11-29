import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Service Description',
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Lightning Bolt - CAD Modeling', value: 'lightning-bolt' },
        { label: 'Chip - Engineering Consulting', value: 'chip' },
        { label: 'Ruler - Product Development', value: 'ruler' },
        { label: 'Triangle Ruler - Rapid Prototyping', value: 'triangle-ruler' },
        { label: 'PCB Circuit Board - PCB Development', value: 'pcb' },
        { label: 'Code Brackets', value: 'code-brackets' },
        { label: 'Cube - Electronics Integration', value: 'cube' },
        { label: 'Printer - 3D Printing', value: 'printer' },
        { label: 'Cog - Manufacturing', value: 'cog' },
        { label: 'Beaker - Testing & Validation', value: 'beaker' },
        { label: 'Lightbulb - Innovation', value: 'lightbulb' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Icon type for the service',
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
      name: 'link',
      type: 'group',
      label: 'Optional Link',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Link Text',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link URL',
        },
      ],
    },
  ],
}

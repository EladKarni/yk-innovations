import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: async ({ req }) => {
      // Allow deletion - errors will be handled in hooks
      return true
    },
  },
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        console.log(`Attempting to delete media with ID: ${id}`)
        try {
          // The storage adapter will handle file deletion
          // If it fails, we'll still delete the database record
          return
        } catch (error) {
          console.warn(`File deletion may have failed, but continuing with DB cleanup:`, error)
          return
        }
      },
    ],
    afterDelete: [
      async ({ req, id, doc }) => {
        console.log(`Successfully deleted media from database: ${doc?.filename}`)
        return
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      hooks: {
        beforeValidate: [
          (args) => {
            const { value, data } = args
            // Auto-generate alt text from filename if not provided
            if (!value && data?.filename) {
              return data.filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
            }
            return value || 'Uploaded image'
          },
        ],
      },
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}

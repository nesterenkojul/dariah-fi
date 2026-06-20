import type { CollectionConfig } from 'payload'

export const LocalOffices: CollectionConfig = {
  slug: 'local-offices',
  versions: false,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: {
        description: 'Shown on the /local-offices listing and as fallback on the detail page',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'Link to the university or node homepage',
      },
    },
    {
      name: 'contacts',
      type: 'array',
      labels: { singular: 'Contact', plural: 'Contacts' },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'note',
          type: 'text',
          admin: {
            description: 'e.g. "(on leave)"',
          },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
}
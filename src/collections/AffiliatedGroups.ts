import type { CollectionConfig } from 'payload'

export const AffiliatedGroups: CollectionConfig = {
  slug: 'affiliated-groups',
  versions: false,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'dariahNode', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      // e.g. "Helsinki Computational History Group (COMHIS)"
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'externalUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Link to the research group homepage',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'expertise',
      type: 'array',
      admin: {
        description: 'Expertise tags shown as a list, e.g. "text reuse", "network analysis"',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contactName',
      type: 'text',
    },
    {
      name: 'contactUrl',
      type: 'text',
      admin: {
        description: 'Link to the contact person profile page',
      },
    },
    {
      name: 'dariahNode',
      type: 'relationship',
      relationTo: 'local-offices',
      admin: {
        description: 'Which DARIAH-FI local office this group belongs to',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Controls display order on the resources page',
      },
    },
  ],
}
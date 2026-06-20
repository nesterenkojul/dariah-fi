import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'developedBy', 'updatedAt'],
  },
  versions: false,
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
      name: 'description',
      type: 'richText',
    },
    {
      name: 'accessLinks',
      type: 'array',
      admin: {
        description: 'Direct links to the tool, dataset, or repository',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          // e.g. "Toxicity classifier", "Sampo UI", "CRAN webpage"
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tutorialUrl',
      type: 'text',
      admin: {
        description: 'YouTube demo or tutorial link',
      },
    },
    {
      name: 'contacts',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      name: 'developedBy',
      type: 'relationship',
      relationTo: 'local-offices',
      hasMany: true,
      admin: {
        description: 'Primary developing institution(s)',
      },
    },
    {
      name: 'collaborators',
      type: 'relationship',
      relationTo: 'local-offices',
      hasMany: true,
      admin: {
        description: 'Partner institutions',
      },
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
}
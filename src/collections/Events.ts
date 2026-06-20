import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  versions: false,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'location', 'updatedAt'],
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
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'e.g. "University of Oulu, Pentti Kaiteran katu 1, Oulu"',
      },
    },
    {
      name: 'isOnline',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'registrationUrl',
      type: 'text',
      admin: {
        description: 'Link to registration form if applicable',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedNode',
      type: 'relationship',
      relationTo: 'local-offices',
      admin: {
        description: 'Which local office is organising this event, if any',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
  ],
}
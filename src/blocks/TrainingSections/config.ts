import type { Block } from 'payload'

export const TrainingSections: Block = {
  slug: 'trainingSections',
  interfaceName: 'TrainingSectionsBlock',
  labels: {
    singular: 'Training Section',
    plural: 'Training Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'groups',
      type: 'array',
      labels: { singular: 'Level Group', plural: 'Level Groups' },
      fields: [
        {
          name: 'levelLabel',
          type: 'text',
          admin: {
            description: 'e.g. "Doctoral level", "Master\'s level" — leave empty if not applicable',
          },
        },
        {
          name: 'courses',
          type: 'array',
          labels: { singular: 'Course', plural: 'Courses' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                description: 'External link to the course/programme page',
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'levelTags',
              type: 'text',
              admin: {
                description: 'Comma-separated, e.g. "Master\'s level, Bachelor\'s level"',
              },
            },
          ],
        },
      ],
    },
  ],
}
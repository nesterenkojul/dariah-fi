import type { Block } from 'payload'

export const TabsBlock: Block = {
  slug: 'tabsBlock',
  interfaceName: 'TabsBlock',
  labels: {
    singular: 'Tabs Block',
    plural: 'Tabs Blocks',
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      minRows: 2,
      labels: {
        singular: 'Tab',
        plural: 'Tabs',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'listType',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None (rich text only)', value: 'none' },
            { label: 'Affiliated Groups', value: 'affiliatedGroups' },
            { label: 'Tools', value: 'tools' },
          ],
          admin: {
            description: 'If set, renders a live listing from this collection below the rich text',
          },
        },
        {
          name: 'content',
          type: 'richText',
          admin: {
            description: 'Optional intro text shown above the listing (or full content if listType is None)',
          },
        },
      ],
    },
  ],
}
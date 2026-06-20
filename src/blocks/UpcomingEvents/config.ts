import type { Block } from 'payload'

export const UpcomingEvents: Block = {
  slug: 'upcomingEvents',
  interfaceName: 'UpcomingEventsBlock',
  labels: {
    singular: 'Upcoming Events',
    plural: 'Upcoming Events Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      admin: {
        description: 'Maximum number of upcoming events to display',
      },
    },
    {
      name: 'viewAllLink',
      type: 'text',
      defaultValue: '/events',
      admin: {
        description: 'Link for the "View all events" button',
      },
    },
  ],
}
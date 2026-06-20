import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { UpcomingEventsBlock as UpcomingEventsBlockProps } from '@/payload-types'
import { formatDateTime } from '@/utilities/formatDateTime'

export const UpcomingEventsBlockComponent: React.FC<UpcomingEventsBlockProps> = async ({
  heading,
  limit,
  viewAllLink,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: events } = await payload.find({
    collection: 'events',
    where: { status: { equals: 'upcoming' } },
    sort: 'startDate',
    limit: limit ?? 3,
  })

  if (!events.length) return null

  return (
    <div className="container my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{heading}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm underline">
            View all events
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="block border rounded-lg p-4 hover:bg-muted transition-colors"
          >
            <p className="text-sm text-muted-foreground mb-1">
              {formatDateTime(event.startDate)}
            </p>
            <p className="font-semibold">{event.title}</p>
            {event.location && (
              <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
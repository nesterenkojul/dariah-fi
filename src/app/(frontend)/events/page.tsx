import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { EventCard } from '@/components/EventCard'
import { EventsViewToggle } from '@/components/EventsViewToggle'
import { Pagination } from '@/components/Pagination'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Events – DARIAH-FI',
}

type Args = {
  searchParams: Promise<{ view?: string; page?: string }>
}

export default async function EventsPage({ searchParams }: Args) {
  const { view, page } = await searchParams
  const isPast = view === 'past'
  const pageNumber = Math.max(1, parseInt(page || '1', 10) || 1)

  const payload = await getPayload({ config: configPromise })

  const { docs: events, totalPages } = await payload.find({
    collection: 'events',
    where: { status: { equals: isPast ? 'past' : 'upcoming' } },
    sort: isPast ? '-startDate' : 'startDate',
    limit: 12,
    page: pageNumber,
  })

  return (
    <main className="container my-16">
      <h1 className="mb-6">Events</h1>

      <EventsViewToggle active={isPast ? 'past' : 'upcoming'} />

      {events.length === 0 ? (
        <p className="text-muted-foreground">
          {isPast ? 'No past events.' : 'No upcoming events at the moment.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination page={pageNumber} totalPages={totalPages} />
        </div>
      )}
    </main>
  )
}
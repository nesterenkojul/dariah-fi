import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { LocalOffice } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

function formatEventDateTime(start: string, end?: string | null): string {
  const startDate = new Date(start)
  const dateFmt = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timeFmt = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  let result = dateFmt.format(startDate)

  if (end) {
    const endDate = new Date(end)
    const sameDay = startDate.toDateString() === endDate.toDateString()

    if (sameDay) {
      result += `, ${timeFmt.format(startDate)}–${timeFmt.format(endDate)}`
    } else {
      result += ` – ${dateFmt.format(endDate)}`
    }
  } else {
    result += `, ${timeFmt.format(startDate)}`
  }

  return result
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const event = docs[0]

  return {
    title: event ? `${event.title} – DARIAH-FI` : 'Event – DARIAH-FI',
  }
}

export default async function EventPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const event = docs[0]
  if (!event) notFound()

  const relatedNode =
    event.relatedNode && typeof event.relatedNode === 'object'
      ? (event.relatedNode as LocalOffice)
      : null

  return (
    <main className="container my-16 max-w-3xl">
      <Link href="/events" className="text-sm underline text-muted-foreground">
        ← Events
      </Link>

      {event.featuredImage && typeof event.featuredImage === 'object' && (
        <div className="mt-4 mb-6 rounded-md overflow-hidden">
          <Media resource={event.featuredImage} />
        </div>
      )}

      <h1 className="mb-6">{event.title}</h1>

      <p className="text-muted-foreground mb-1">
        {formatEventDateTime(event.startDate, event.endDate)}
      </p>

      {event.location && <p className="text-muted-foreground mb-1">{event.location}</p>}
      {event.isOnline && <p className="text-muted-foreground mb-1">Online event</p>}

      {event.status === 'past' && (
        <span className="inline-block mt-2 mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground border border-border rounded-full px-3 py-1">
          Past event
        </span>
      )}

      {event.registrationUrl && event.status === 'upcoming' && (
        <div className="mt-4 mb-6">
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block bg-primary text-primary-foreground rounded px-5 py-2 text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Register
          </a>
        </div>
      )}

      {event.description && (
        <div className="mt-6">
          <RichText data={event.description} />
        </div>
      )}

      {relatedNode && (
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Organised by{' '}
            <Link href={`/local-offices/${relatedNode.slug}`} className="underline">
              {relatedNode.name}
            </Link>
          </p>
        </div>
      )}
    </main>
  )
}
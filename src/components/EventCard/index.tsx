import React from 'react'
import Link from 'next/link'
import type { Event } from '@/payload-types'

function formatEventDate(start: string, end?: string | null): string {
  const startDate = new Date(start)
  const dateFmt = new Intl.DateTimeFormat('en-GB', {
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
      result += ` · ${timeFmt.format(startDate)}–${timeFmt.format(endDate)}`
    } else {
      result += ` – ${dateFmt.format(endDate)}`
    }
  } else {
    result += ` · ${timeFmt.format(startDate)}`
  }

  return result
}

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="block border border-border rounded-md p-4 bg-card hover:bg-muted transition-colors"
    >
      <p className="text-sm text-muted-foreground mb-1">
        {formatEventDate(event.startDate, event.endDate)}
      </p>
      <p className="font-semibold text-headings">{event.title}</p>
      {event.location && (
        <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
      )}
      {event.isOnline && (
        <p className="text-sm text-muted-foreground mt-1">Online</p>
      )}
    </Link>
  )
}
'use client'

import React from 'react'
import Link from 'next/link'

export const EventsViewToggle: React.FC<{ active: 'upcoming' | 'past' }> = ({ active }) => {
  return (
    <div className="flex border-b border-border mb-8 gap-1">
      <Link
        href="/events"
        className={[
          'px-4 py-2 text-sm font-medium transition-colors rounded-t-md',
          active === 'upcoming'
            ? 'border border-b-background border-border bg-background text-foreground -mb-px'
            : 'text-muted-foreground hover:text-foreground',
        ].join(' ')}
      >
        Upcoming
      </Link>
      <Link
        href="/events?view=past"
        className={[
          'px-4 py-2 text-sm font-medium transition-colors rounded-t-md',
          active === 'past'
            ? 'border border-b-background border-border bg-background text-foreground -mb-px'
            : 'text-muted-foreground hover:text-foreground',
        ].join(' ')}
      >
        Past Events
      </Link>
    </div>
  )
}
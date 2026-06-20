import React from 'react'
import { Media } from '@/components/Media'
import type { LocalOffice } from '@/payload-types'

const PersonPlaceholder: React.FC = () => (
  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-6 h-6 text-muted-foreground"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" />
    </svg>
  </div>
)

export const OfficeContactCard: React.FC<{ office: LocalOffice; compact?: boolean }> = ({
  office,
  compact = false,
}) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-muted">
      {!compact && office.logo && typeof office.logo === 'object' && (
        <div className="w-20 flex-shrink-0 flex items-center">
          <Media resource={office.logo} />
        </div>
      )}

      <div className="flex-1">
        {!compact && <p className="font-semibold mb-2">{office.name}</p>}

        <div className="space-y-2">
          {office.contacts?.map((contact, i) => (
            <div key={i} className="flex items-center gap-2">
              {contact.photo && typeof contact.photo === 'object' ? (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Media resource={contact.photo} />
                </div>
              ) : (
                <PersonPlaceholder />
              )}
              <div className="text-sm">
                {contact.url ? (
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline"
                  >
                    {contact.name}
                  </a>
                ) : (
                  <span>{contact.name}</span>
                )}
                {contact.note && <span className="text-muted-foreground"> {contact.note}</span>}
                {contact.email && (
                  <div className="text-xs text-muted-foreground">
                    <a href={`mailto:${contact.email}`} className="underline">
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
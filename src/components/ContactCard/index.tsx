import React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type ContactCardProps = {
  logo?: MediaType | number | null
  institutionName?: string
  photo?: MediaType | number | null
  name: string
  url?: string | null
  email?: string | null
  note?: string | null
}

export const ContactCard: React.FC<ContactCardProps> = ({
  logo,
  institutionName,
  photo,
  name,
  url,
  email,
  note,
}) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-card">
      {logo && typeof logo === 'object' && (
        <div className="w-20 flex-shrink-0 flex items-center">
          <Media resource={logo} />
        </div>
      )}

      <div className="flex-1">
        {institutionName && <p className="font-semibold mb-2">{institutionName}</p>}

        <div className="flex items-center gap-2">
          {photo && typeof photo === 'object' && (
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Media resource={photo} />
            </div>
          )}
          <div className="text-sm">
            {url ? (
              <a href={url} target="_blank" rel="noreferrer noopener" className="underline">
                {name}
              </a>
            ) : (
              <span>{name}</span>
            )}
            {note && <span className="text-muted-foreground"> {note}</span>}
            {email && (
              <div className="text-xs text-muted-foreground">
                <a href={`mailto:${email}`} className="underline">
                  {email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
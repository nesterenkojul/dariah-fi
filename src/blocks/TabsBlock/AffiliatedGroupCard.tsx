import React from 'react'
import { Media } from '@/components/Media'
import type { AffiliatedGroup } from '@/payload-types'
/* import { RichText } from 'node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToJSX/Component' */
import RichText from '@/components/RichText'

export const AffiliatedGroupCard: React.FC<{ group: AffiliatedGroup }> = ({ group }) => {
  return (
    <div className="border rounded-lg p-4 flex gap-4">
      {group.logo && typeof group.logo === 'object' && (
        <div className="w-16 h-16 flex-shrink-0">
          <Media resource={group.logo} />
        </div>
      )}
      <div className="flex-1">
        <a
          href={group.externalUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold underline"
        >
          {group.name}
        </a>

        {group.expertise?.length ? (
          <div className="flex flex-wrap gap-1 mt-2 mb-2">
            {group.expertise.map((e, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {e.tag}
              </span>
            ))}
          </div>
        ) : null}

        {group.description && (
          <div className="text-sm text-muted-foreground mt-1 mb-2">
            <RichText data={group.description} enableProse={false} enableGutter={false} />
          </div>
    )}

        {group.contactName && (
          <p className="text-sm mt-2">
            Contact:{' '}
            {group.contactUrl ? (
              <a href={group.contactUrl} target="_blank" rel="noreferrer noopener" className="underline">
                {group.contactName}
              </a>
            ) : (
              group.contactName
            )}
          </p>
        )}
      </div>
    </div>
  )
}
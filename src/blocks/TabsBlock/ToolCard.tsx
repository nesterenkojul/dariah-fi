import React from 'react'
import type { Tool, LocalOffice } from '@/payload-types'
/* import { RichText } from 'node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToJSX/Component' */
import RichText from '@/components/RichText'

export const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  const developedBy = (tool.developedBy as LocalOffice[] | undefined)?.filter(
    (o): o is LocalOffice => typeof o === 'object',
  )
  const collaborators = (tool.collaborators as LocalOffice[] | undefined)?.filter(
    (o): o is LocalOffice => typeof o === 'object',
  )

  return (
    <div className="border rounded-lg p-4">
      <p className="font-semibold mb-2">{tool.name}</p>

      {tool.accessLinks?.length ? (
        <div className="flex flex-wrap gap-2 mb-2">
          {tool.accessLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm underline"
            >
              {link.label || link.url}
            </a>
          ))}
        </div>
      ) : null}

      {tool.tutorialUrl && (
        <p className="text-sm mb-2">
          <a href={tool.tutorialUrl} target="_blank" rel="noreferrer noopener" className="underline">
            Tutorial / Demo
          </a>
        </p>
      )}

      {tool.description && (
        <div className="text-sm text-muted-foreground mb-2">
          <RichText data={tool.description} enableProse={false} enableGutter={false} />
        </div>
      )}

      {tool.contacts?.length ? (
        <p className="text-sm text-muted-foreground mb-2">
          Contact:{' '}
          {tool.contacts.map((c, i) => (
            <React.Fragment key={i}>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer noopener" className="underline">
                  {c.name}
                </a>
              ) : (
                c.name
              )}
              {i < tool.contacts!.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </p>
      ) : null}

      {developedBy?.length ? (
        <p className="text-xs text-muted-foreground">
          Developed by: {developedBy.map((o) => o.name).join(', ')}
          {collaborators?.length ? ` · with ${collaborators.map((o) => o.name).join(', ')}` : ''}
        </p>
      ) : null}
    </div>
  )
}
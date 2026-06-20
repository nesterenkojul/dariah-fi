import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { AffiliatedGroupCard } from '@/blocks/TabsBlock/AffiliatedGroupCard'
import { ToolCard } from '@/blocks/TabsBlock/ToolCard'
import { OfficeContactCard } from '@/components/ContactCard/OfficeContactCard'
import type { AffiliatedGroup, Tool } from '@/payload-types'

type Args = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'local-offices',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const office = docs[0]

  return {
    title: office ? `${office.name} – DARIAH-FI` : 'Local Office – DARIAH-FI',
  }
}

export default async function OfficePage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'local-offices',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const office = docs[0]
  if (!office) notFound()

  const [{ docs: groups }, { docs: developedTools }, { docs: collaboratedTools }] =
    await Promise.all([
      payload.find({
        collection: 'affiliated-groups',
        where: { dariahNode: { equals: office.id } },
        sort: 'order',
        limit: 100,
      }),
      payload.find({
        collection: 'tools',
        where: { developedBy: { contains: office.id } },
        limit: 100,
      }),
      payload.find({
        collection: 'tools',
        where: { collaborators: { contains: office.id } },
        limit: 100,
      }),
    ])

  // Merge developed + collaborated tools, deduplicated by id
  const toolsMap = new Map<number, Tool>()
  for (const t of [...developedTools, ...collaboratedTools] as Tool[]) {
    toolsMap.set(t.id, t)
  }
  const tools = Array.from(toolsMap.values())

  return (
    <main className="container my-16">
      <Link href="/local-offices" className="text-sm underline text-muted-foreground">
        ← Local Offices
      </Link>

      <div className="flex items-center gap-6 mt-4 mb-8">
        {office.logo && typeof office.logo === 'object' && (
          <div className="w-24 flex-shrink-0">
            <Media resource={office.logo} />
          </div>
        )}
        <div>
          <h1 className="mt-12">{office.name}</h1>
        </div>
      </div>

      {office.externalUrl && (
            <a
              href={office.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline inline-block mb-4 font-bold"
            >
              Visit website
            </a>
          )}

      {office.shortDescription && (
        <p className="text-muted-foreground mb-8">{office.shortDescription}</p>
      )}

      
      {office.contacts?.length ? (
        <div className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Contact
          </h2>
          <OfficeContactCard office={office} compact />
        </div>
      ) : null}

      {groups.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Affiliated Groups</h2>
          <div className="space-y-4">
            {(groups as AffiliatedGroup[]).map((group) => (
              <AffiliatedGroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {tools.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Tools</h2>
          <div className="space-y-4">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import eventsContent from './events-content.json'

type ContentNode = any

const contentBySlug = eventsContent as Record<string, ContentNode[]>

function buildRichText(children: ContentNode[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  console.log(`🌱 Updating descriptions for ${Object.keys(contentBySlug).length} events...`)

  let updated = 0
  let skipped = 0

  for (const [slug, nodes] of Object.entries(contentBySlug)) {
    const { docs } = await payload.find({
      collection: 'events',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const event = docs[0]
    if (!event) {
      console.warn(`⚠️  Event not found for slug "${slug}" — skipping`)
      skipped++
      continue
    }

    await payload.update({
      collection: 'events',
      id: event.id,
      context: { disableRevalidate: true },
      data: {
        description: buildRichText(nodes),
      },
    })

    updated++
  }

  console.log(`✅ Updated ${updated} events (${skipped} skipped)`)
  process.exit(0)
}

run()

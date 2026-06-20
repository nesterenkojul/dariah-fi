import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding Resources page...')

  const emptyRichText = {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
  
  const tabsBlock = {
    blockType: 'tabsBlock' as const,
    tabs: [
      { label: 'Affiliated Groups', listType: 'affiliatedGroups' as const, content: emptyRichText },
      { label: 'Tools', listType: 'tools' as const, content: emptyRichText },
    ],
  }

  const { docs: existing } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'resources' } },
    limit: 1,
  })

  if (existing.length > 0) {
    console.log(`📝 Updating existing Resources page (id ${existing[0].id})`)
    await payload.update({
      collection: 'pages',
      id: existing[0].id,
      context: { disableRevalidate: true },
      data: { layout: [tabsBlock] },
    })
  } else {
    console.log('📝 Creating Resources page')
    await payload.create({
      collection: 'pages',
      draft: false,
      context: { disableRevalidate: true },
      data: {
        title: 'Resources',
        slug: 'resources',
        _status: 'published',
        hero: {type: 'none'},
        layout: [tabsBlock],
      },
    })
  }

  console.log('✅ Done seeding Resources page')
  process.exit(0)
}

seed()
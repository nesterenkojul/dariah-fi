import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { toRichTextBlocks } from './utils'

async function findMediaId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
): Promise<number | undefined> {
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (docs.length === 0) {
    console.warn(`⚠️  Media not found for filename "${filename}"`)
    return undefined
  }
  return docs[0].id
}

async function findCategoryId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  title: string,
): Promise<number | undefined> {
  const { docs } = await payload.find({
    collection: 'categories',
    where: { title: { equals: title } },
    limit: 1,
  })
  if (docs.length === 0) {
    console.warn(`⚠️  Category not found: "${title}"`)
    return undefined
  }
  return docs[0].id
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding Home page...')

  const mapImage = await findMediaId(payload, 'local-offices-map2-1.png')
  const wordcloudImage = await findMediaId(payload, 'expertise-wordcloud3-1024x555.png')
  const newsCategoryId = await findCategoryId(payload, 'News and Blogs')

  const layout: any[] = []

  // --- Upcoming Events ---
  layout.push({
    blockType: 'upcomingEvents' as const,
    heading: 'Upcoming Events',
    limit: 3,
    viewAllLink: '/events',
  })

  // --- Meet the network ---
  const meetNetworkColumns: any[] = [
    {
      size: 'half' as const,
      richText: toRichTextBlocks([
        { type: 'h2', text: 'Meet the network' },
        {
          type: 'p',
          text: 'DARIAH-FI is a research infrastructure that builds on expertise in data-intensive SSH research across Finland. Our "offices" are local nodes that offer easy access to the national infrastructure. By contacting your local office, you can meet local DARIAH-FI representatives, plan collaborations for future projects, or simply ask for guidance from a real human being.',
        },
        { type: 'linkParagraph', text: 'Read more', url: '/local-offices' },
      ]),
    },
  ]
  if (mapImage) {
    meetNetworkColumns.push({
      size: 'half' as const,
      richText: toRichTextBlocks([{ type: 'image', mediaId: mapImage }]),
    })
  }

  layout.push({
    blockType: 'content' as const,
    columns: meetNetworkColumns,
  })

  // --- Find expertise and tools ---
  const expertiseColumns: any[] = []
  if (wordcloudImage) {
    expertiseColumns.push({
      size: 'half' as const,
      richText: toRichTextBlocks([{ type: 'image', mediaId: wordcloudImage }]),
    })
  }
  expertiseColumns.push({
    size: 'half' as const,
    richText: toRichTextBlocks([
      { type: 'h2', text: 'Find expertise and tools' },
      {
        type: 'p',
        text: 'As a competence network, we represent affiliated groups with interdisciplinary expertise in the humanities, social sciences and data science. As infrastructure developers, we develop tools and functionalities that help researchers bring materials into environments for data-intensive research and big-data processing.',
      },
      { type: 'linkParagraph', text: 'Discover resources', url: '/resources' },
    ]),
  })

  layout.push({
    blockType: 'content' as const,
    columns: expertiseColumns,
  })

  // --- News and Blogs (ArchiveBlock) ---
  layout.push({
    blockType: 'archive' as const,
    introContent: toRichTextBlocks([{ type: 'h2', text: 'News and Blogs' }]),
    populateBy: 'collection' as const,
    relationTo: 'posts' as const,
    categories: newsCategoryId ? [newsCategoryId] : [],
    limit: 3,
  })

  // --- Page-level Hero ---
  const hero = {
    type: 'lowImpact' as const,
    richText: toRichTextBlocks([
      { type: 'h2', text: 'Infrastructure for Data-Intensive Social Science and Humanities Research' },
      {
        type: 'p',
        text: 'DARIAH-FI builds and shares tools, datasets, events and training materials...',
      },
    ]),
  }

  const { docs: existing } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (existing.length > 0) {
    console.log(`📝 Updating existing Home page (id ${existing[0].id})`)
    await payload.update({
      collection: 'pages',
      id: existing[0].id,
      context: { disableRevalidate: true },
      data: {
        hero,
        layout,
      },
    })
  } else {
    console.log('📝 Creating Home page')
    await payload.create({
      collection: 'pages',
      draft: false,
      context: { disableRevalidate: true },
      data: {
        title: 'Home',
        slug: 'home',
        _status: 'published',
        hero,
        layout,
      },
    })
  }

  console.log('✅ Done seeding Home page')
  process.exit(0)
}

seed()
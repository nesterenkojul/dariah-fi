import { getPayload } from 'payload'
import configPromise from '../payload.config'
import postsData from './posts-content.json'

// ---------------------------------------------------------------------------
// Types matching posts-content.json
// ---------------------------------------------------------------------------

type TextNode = {
  type: 'text'
  version: number
  text: string
  format: number
  mode: string
  style: string
  detail: number
}

type LinkNode = {
  type: 'link'
  version: number
  fields: { url: string; newTab: boolean; linkType: string }
  children: TextNode[]
  direction: string
  format: string
  indent: number
}

type ContentNode =
  | {
      type: 'paragraph' | 'quote'
      version: number
      children: (TextNode | LinkNode)[]
      direction: string
      format: string
      indent: number
    }
  | {
      type: 'heading'
      tag: string
      version: number
      children: (TextNode | LinkNode)[]
      direction: string
      format: string
      indent: number
    }
  | {
      type: 'list'
      version: number
      tag: string
      listType: string
      start: number
      children: {
        type: 'listitem'
        version: number
        value: number
        children: (TextNode | LinkNode)[]
        direction: string
        format: string
        indent: number
      }[]
      direction: string
      format: string
      indent: number
    }
  | { type: 'image_placeholder'; url: string }

type PostData = {
  title: string
  slug: string
  publishedAt: string
  categories: string[]
  featuredImageUrl: string
  metaDescription: string
  contentNodes: ContentNode[]
}

const posts = postsData as PostData[]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Extract the filename portion of a WordPress media URL, e.g.
// https://dariah-fi.2.rahtiapp.fi/wp-content/uploads/2025/04/foo-1024x576.jpg -> foo-1024x576.jpg
function filenameFromUrl(url: string): string {
  const parts = url.split('/')
  return decodeURIComponent(parts[parts.length - 1])
}

// Cache media lookups so we don't repeat queries for the same file
const mediaCache = new Map<string, number | undefined>()

async function findMediaIdByUrl(
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
): Promise<number | undefined> {
  const filename = filenameFromUrl(url)

  if (mediaCache.has(filename)) {
    return mediaCache.get(filename)
  }

  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })

  const id = docs.length > 0 ? docs[0].id : undefined
  if (!id) {
    console.warn(`⚠️  Media not found for filename "${filename}"`)
  }

  mediaCache.set(filename, id)
  return id
}

async function findCategoryId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  catName: string,
): Promise<number> {
  const existing = await payload.find({
    collection: 'categories',
    where: { title: { equals: catName } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }

  const created = await payload.create({
    collection: 'categories',
    data: {
      title: catName,
      slug: catName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    },
  })

  return created.id
}

// Recursively walk content nodes, resolving image_placeholder nodes into
// real Payload upload nodes by looking up media by filename.
async function resolveContentNodes(
  payload: Awaited<ReturnType<typeof getPayload>>,
  nodes: ContentNode[],
): Promise<any[]> {
  const resolved: any[] = []

  for (const node of nodes) {
    if (node.type === 'image_placeholder') {
      const mediaId = await findMediaIdByUrl(payload, node.url)
      if (mediaId) {
        resolved.push({
          type: 'upload',
          version: 1,
          relationTo: 'media',
          value: mediaId,
          fields: {},
          format: '',
        })
      }
      // If media not found, skip the image rather than inserting a broken node
      continue
    }

    resolved.push(node)
  }

  return resolved
}

function buildRichText(children: any[]) {
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

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log(`🌱 Seeding ${posts.length} posts...`)

  for (const post of posts) {
    try {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Skipping "${post.title}" — already exists`)
        continue
      }

      // Categories
      const categoryIds: number[] = []
      for (const catName of post.categories) {
        if (!catName) continue
        categoryIds.push(await findCategoryId(payload, catName))
      }

      // Featured image
      const featuredImageId = post.featuredImageUrl
        ? await findMediaIdByUrl(payload, post.featuredImageUrl)
        : undefined

      // Body content (with in-text images resolved)
      const resolvedNodes = await resolveContentNodes(payload, post.contentNodes)
      const content = buildRichText(resolvedNodes)

      await payload.create({
        collection: 'posts',
        draft: false,
        context: { disableRevalidate: true },
        data: {
          title: post.title,
          slug: post.slug,
          publishedAt: post.publishedAt,
          _status: 'published',
          content,
          categories: categoryIds,
          heroImage: featuredImageId,
          meta: {
            title: `${post.title} – DARIAH-FI`,
            description: post.metaDescription,
            image: featuredImageId,
          },
        },
      })

      console.log(`✅ Created "${post.title}"`)
    } catch (err) {
      console.error(`❌ Failed "${post.title}":`, err)
    }
  }

  console.log('✅ Done seeding posts')
  process.exit(0)
}

seed()
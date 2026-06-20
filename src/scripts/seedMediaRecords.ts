import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const MEDIA_DIR = path.join(process.cwd(), 'media-source')

async function seed() {
  const payload = await getPayload({ config: configPromise })

  const files = fs.readdirSync(MEDIA_DIR).filter((f) => !f.startsWith('.'))

  console.log(`🌱 Found ${files.length} local media files`)

  for (const filename of files) {
    try {
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Skipping "${filename}" — already exists in DB`)
        continue
      }

      const filePath = path.join(MEDIA_DIR, filename)
      const fileBuffer = fs.readFileSync(filePath)
      const stat = fs.statSync(filePath)

      await payload.create({
        collection: 'media',
        file: {
          data: fileBuffer,
          mimetype: getMimeType(filename),
          name: filename,
          size: stat.size,
        },
        data: {
          alt: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        },
      })

      console.log(`✅ Created media record for "${filename}"`)
    } catch (err) {
      console.error(`❌ Failed "${filename}":`, err)
    }
  }

  console.log('✅ Done')
  process.exit(0)
}

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  }
  return map[ext || ''] || 'application/octet-stream'
}

seed()
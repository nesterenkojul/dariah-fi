import { getPayload } from 'payload'
import configPromise from '../payload.config'

const slug = process.argv[2] || 'about'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  console.log(JSON.stringify(docs[0]?.layout, null, 2))
  process.exit(0)
}

run()
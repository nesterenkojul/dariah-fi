import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding Header...')

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        { link: { type: 'custom', url: '/about', label: 'About' } },
        { link: { type: 'custom', url: '/local-offices', label: 'Local Offices' } },
        { link: { type: 'custom', url: '/training-and-teaching', label: 'Training and Teaching' } },
        { link: { type: 'custom', url: '/resources', label: 'Resources' } },
        { link: { type: 'custom', url: '/events', label: 'Events' } },
        { link: { type: 'custom', url: '/posts', label: 'News and Blogs' } },
      ],
    },
  })

  console.log('✅ Header done')

  console.log('🌱 Seeding Footer...')

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        { link: { type: 'custom', url: '/contacts', label: 'Contacts' } },
        { link: { type: 'custom', url: '/accessibility-statement', label: 'Accessibility Statement' } },
        { link: { type: 'custom', url: 'https://bsky.app/profile/dariah-fi.bsky.social', label: 'Bluesky', newTab: true } },
        { link: { type: 'custom', url: 'https://www.youtube.com/@DARIAHFI', label: 'YouTube', newTab: true } },
        { link: { type: 'custom', url: 'mailto:info@dariah.fi', label: 'info@dariah.fi' } },
      ],
    },
  })

  console.log('✅ Footer done')
  process.exit(0)
}

seed()
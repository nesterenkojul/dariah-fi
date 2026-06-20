import { getPayload } from 'payload'
import configPromise from '../payload.config'

const extras: {
  [slug: string]: {
    logoFile: string
    contacts: { photoFile?: string; name: string; url?: string; email?: string; note?: string }[]
  }
} = {
  aalto: {
    logoFile: 'logo_aalto.png',
    contacts: [
      { photoFile: 'EeroHyvonen_thumbnail.png', name: 'Eero Hyvönen', url: 'https://seco.cs.aalto.fi/u/eahyvone/' },
    ],
  },
  'eastern-finland': {
    logoFile: 'logo_uoef.png',
    contacts: [
      { photoFile: 'PaulaRautionaho_thumbnail.png', name: 'Paula Rautionaho', url: 'https://uefconnect.uef.fi/paula.rautionaho/' },
    ],
  },
  helsinki: {
    logoFile: 'logo_HY_s.png',
    contacts: [
      { photoFile: 'InesMatres_thumbnail.png', name: 'Inés Matres', url: 'https://researchportal.helsinki.fi/en/persons/in%C3%A9s-matres' },
    ],
  },
  jyvaskyla: {
    logoFile: 'logo_jyvaskyla_s.png',
    contacts: [
      { photoFile: 'VenlaPoso_thumbnail.png', name: 'Venla Poso', url: 'https://www.jyu.fi/fi/henkilot/venla-poso', note: '(on leave)' },
      { name: 'Ida Toivanen', url: 'https://www.jyu.fi/fi/henkilot/ida-toivanen' },
    ],
  },
  oulu: {
    logoFile: 'logo_oulu.png',
    contacts: [
      { photoFile: 'Jouni-MattiKuukkanen_thumbnail.png', name: 'Jouni-Matti Kuukkanen', url: 'https://www.oulu.fi/en/researchers/jouni-matti-kuukkanen' },
    ],
  },
  tampere: {
    logoFile: 'logo_tampere.png',
    contacts: [
      { photoFile: 'SannaKumpulainen_thumbnail.png', name: 'Sanna Kumpulainen', url: 'https://www.tuni.fi/fi/ihmiset/sanna-kumpulainen' },
    ],
  },
  turku: {
    logoFile: 'logo_turku.png',
    contacts: [
      { photoFile: 'VeronikaLaippala_thumbnail.png', name: 'Veronika Laippala', url: 'https://www.utu.fi/fi/ihmiset/veronika-laippala' },
    ],
  },
  'national-library': {
    logoFile: 'logo_KK.png',
    contacts: [
      { photoFile: 'PaiviPihlaja_thumbnail.png', name: 'Päivi Pihlaja', url: 'https://www.kansalliskirjasto.fi/en/persons/paivi-pihlaja-2207' },
    ],
  },
  'national-archives': {
    logoFile: 'logo_KA.png',
    contacts: [
      { photoFile: 'Tanja-Valisalo-215x300-1-e1749714461930.jpg', name: 'Tanja Välisalo', url: 'https://kansallisarkisto.fi/en/research-collaboration' },
    ],
  },
  csc: {
    logoFile: 'logo_csc.png',
    contacts: [
      { photoFile: 'Katri-Tegel-717x1024-1-e1749714484834.jpeg', name: 'Katri Tegel', email: 'firstname.lastname@csc.fi' },
    ],
  },
}

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

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding Local Offices extras (logo + contact)...')

  const { docs: offices } = await payload.find({
    collection: 'local-offices',
    limit: 100,
  })

  for (const office of offices) {
    const extra = extras[office.slug]
    if (!extra) {
      console.warn(`⚠️  No extras defined for slug "${office.slug}" — skipping`)
      continue
    }

    const logo = await findMediaId(payload, extra.logoFile)

    const contacts = []
    for (const c of extra.contacts) {
      const photo = c.photoFile ? await findMediaId(payload, c.photoFile) : undefined
      contacts.push({
        photo,
        name: c.name,
        url: c.url ?? '',
        email: c.email ?? '',
        note: c.note ?? '',
      })
    }

    await payload.update({
      collection: 'local-offices',
      id: office.id,
      context: { disableRevalidate: true },
      data: {
        ...(logo ? { logo } : {}),
        contacts,
      },
    })

    console.log(`✅ Updated ${office.name}`)
}

  console.log('✅ Done')
  process.exit(0)
}

seed()
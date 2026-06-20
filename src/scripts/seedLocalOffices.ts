import { getPayload } from 'payload'
import configPromise from '../payload.config'


const localOffices = [
  {
    name: 'Aalto University',
    slug: 'aalto',
    shortDescription:
      'The local node in the Aalto University is situated at the Department of Computer Science, Semantic Computing Research Group (SeCo), that has affiliated members also at the Helsinki Centre for Digital Humanities (HELDIG) and Helsinki Institute for Social Sciences and Humanities (HSSH). Our focus is on developing and maintaining a national Linked Open Data (LOD) infrastructure and applications for Digital Humanities.',
    externalUrl: 'https://seco.cs.aalto.fi',
    order: 1,
  },
  {
    name: 'University of Eastern Finland',
    slug: 'eastern-finland',
    shortDescription:
      'The local node at the University of Eastern Finland highlights interdisciplinary research and the use of digital methods in SSH research. Our profile area is societal big data. We have collected large-scale benchmark corpora of social media and developed methods for data-intensive analysis of digital social networks.',
    externalUrl: 'https://www.uef.fi',
    order: 2,
  },
  {
    name: 'University of Helsinki',
    slug: 'helsinki',
    shortDescription:
      'The University of Helsinki DARIAH node is distributed in diverse units in the city centre campus, with ample methodological expertise and curriculum development in digital humanities and social data science.',
    externalUrl: 'https://www.helsinki.fi',
    order: 3,
  },
  {
    name: 'University of Jyväskylä',
    slug: 'jyvaskyla',
    shortDescription:
      "The University of Jyväskylä's DARIAH node supports multidisciplinary research at the intersection of the humanities, social sciences, and digital technologies. It brings particular strengths on the use and analysis of multimodal data.",
    externalUrl: 'https://www.jyu.fi',
    order: 4,
  },
  {
    name: 'University of Oulu',
    slug: 'oulu',
    shortDescription:
      "The University of Oulu's DARIAH node supports language-focused research across the social sciences and humanities, with strengths in corpus creation, language models, and digital tools.",
    externalUrl: 'https://www.oulu.fi',
    order: 5,
  },
  {
    name: 'Tampere University',
    slug: 'tampere',
    shortDescription:
      'At Tampere University, the DARIAH local node is situated in the Faculty of Information Technology and Communication Sciences, where technology and the humanities come together in a unique way.',
    externalUrl: 'https://www.tuni.fi',
    order: 6,
  },
  {
    name: 'University of Turku',
    slug: 'turku',
    shortDescription:
      'The University of Turku has a long tradition in developing digital language resources and language technology tools, in particular for Finnish. This DARIAH node is led by two research groups TurkuNLP and Turku Data Science group.',
    externalUrl: 'https://www.utu.fi',
    order: 7,
  },
  {
    name: 'CSC',
    slug: 'csc',
    shortDescription:
      'CSC – IT Center for Science is a national centre for IT expertise owned by the Finnish state and higher education institutions. CSC enables world-class data management and high-performance computing.',
    externalUrl: 'https://www.csc.fi',
    order: 8,
  },
  {
    name: 'National Archives of Finland',
    slug: 'national-archives',
    shortDescription:
      'The National Archives of Finland (NAF) preserves official documents from the central and regional government, various organizations, and private individuals, and makes them available for research.',
    externalUrl: 'https://www.arkisto.fi',
    order: 9,
  },
  {
    name: 'National Library of Finland',
    slug: 'national-library',
    shortDescription:
      'The NLF is a cultural heritage organisation providing nationwide services to citizens, scientific communities and other operators, with a particular mission to preserve and ensure access to Finland\'s published heritage.',
    externalUrl: 'https://www.kansalliskirjasto.fi',
    order: 10,
  },
]


async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding local offices...')

  for (const office of localOffices) {
    try {
      // Check if it already exists to make the script re-runnable
      const existing = await payload.find({
        collection: 'local-offices',
        where: { slug: { equals: office.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Skipping "${office.name}" — already exists`)
        continue
      }

      await payload.create({
        collection: 'local-offices',
        data: office,
        draft: false,
      })

      console.log(`✅ Created "${office.name}"`)
    } catch (err) {
      console.error(`❌ Failed "${office.name}":`, err)
    }
  }

  console.log('✅ Done')
  process.exit(0)
}

seed()
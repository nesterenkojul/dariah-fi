import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { toRichText } from './utils'

const groups = [
  {
    name: 'Borders, Mobilities and Cultural Encounters BOMOCULT',
    externalUrl: 'https://www.uef.fi/en/research-community/borders-mobilities-and-cultural-encounters-bomocult',
    description: 'BOMOCULT research community stems from the strategic objective of the University of Eastern Finland to provide answers to global challenges through research. We bring together research teams and scholars especially from the Karelian Institute, the Department of Social Sciences and the School of Historical and Geographical Studies.',
    expertise: [
      { tag: 'border studies' },
      { tag: 'cultural encounters' },
      { tag: 'Karelian' },
      { tag: 'language contact and change' },
      { tag: 'digital SSH' },
    ],
    contactName: 'Jopi Nyman',
    contactUrl: 'https://uefconnect.uef.fi/jopi.nyman/',
    dariahNodeSlug: 'eastern-finland',
    order: 1,
  },
  {
    name: 'COMET: Weak-tie hypothesis in complex digital networks',
    externalUrl: 'https://uefconnect.uef.fi/en/comet-weak-tie-hypothesis/',
    description: 'The COMET project, funded by the Research Council of Finland for 2024-28, focuses on studying how innovations spread in social networks. This cross-disciplinary project tests the validity of the weak-tie theory by examining how linguistic innovations spread in extremely large social media networks.',
    expertise: [
      { tag: 'social media' },
      { tag: 'social networks' },
      { tag: 'societal big data' },
      { tag: 'language contact and change' },
      { tag: 'human-centered AI' },
    ],
    contactName: 'Mikko Laitinen',
    contactUrl: 'https://uefconnect.uef.fi/en/mikko.laitinen/',
    dariahNodeSlug: 'eastern-finland',
    order: 2,
  },
  {
    name: 'Helsinki Computational History Group (COMHIS)',
    externalUrl: 'https://www.helsinki.fi/en/researchgroups/computational-history',
    description: 'Helsinki Computational History Group (COMHIS) is an interdisciplinary team that studies intellectual history. The work in the group is guided by methods from various different backgrounds ranging from modern data science and machine learning to history and linguistics.',
    expertise: [
      { tag: 'book history' },
      { tag: 'text reuse' },
      { tag: 'network analysis' },
      { tag: 'image processing' },
    ],
    contactName: 'Mikko Tolonen',
    contactUrl: 'https://researchportal.helsinki.fi/fi/persons/mikko-tolonen',
    dariahNodeSlug: 'helsinki',
    order: 3,
  },
  {
    name: 'Centre for Social Data Science (CSDS)',
    externalUrl: 'https://www.helsinki.fi/en/networks/centre-social-data-science',
    description: 'The Centre for Social Data Science (CSDS) cultivates data-intensive quantitative methods for a social-science-anchored response to the datafication and digitalisation of society.',
    expertise: [
      { tag: 'social data science' },
      { tag: 'digital societies' },
      { tag: 'social media analysis' },
      { tag: 'political science' },
      { tag: 'surveys' },
      { tag: 'human-computer interaction' },
    ],
    contactName: 'Maria Valaste',
    contactUrl: 'https://researchportal.helsinki.fi/fi/persons/maria-valaste',
    dariahNodeSlug: 'helsinki',
    order: 4,
  },
  {
    name: 'Game Research Network',
    externalUrl: 'https://www.jyu.fi/en/humsoc/research/game-research-network',
    description: 'Game Research Network is an interdisciplinary network uniting researchers and students who are interested in game studies. The network organizes seminars and informs its members of new research opportunities, relevant events and news in the field.',
    expertise: [
      { tag: 'multidisciplinary research' },
      { tag: 'multimodal data' },
      { tag: 'livestream analysis' },
      { tag: 'digital cultures' },
      { tag: 'machine learning' },
      { tag: 'LLMs' },
    ],
    contactName: 'Maria Ruotsalainen',
    contactUrl: 'https://www.jyu.fi/fi/henkilot/maria-ruotsalainen',
    dariahNodeSlug: 'jyvaskyla',
    order: 5,
  },
  {
    name: 'The Human Sciences – Computing Interaction (HSCI)',
    externalUrl: 'https://www.helsinki.fi/human-sciences-computing-interaction',
    description: 'The research group seeks to figure out the technological, processual and theoretical underpinnings of successful computational research in the humanities and social sciences.',
    expertise: [
      { tag: 'research design' },
      { tag: 'image processing' },
      { tag: 'machine learning' },
    ],
    contactName: 'Eetu Mäkelä',
    contactUrl: 'https://researchportal.helsinki.fi/fi/persons/jarkko-ilkka-eetu-m%C3%A4kel%C3%A4',
    dariahNodeSlug: 'helsinki',
    order: 6,
  },
  {
    name: 'Helsinki Institute for Social Sciences and Humanities (HSSH)',
    externalUrl: 'https://www.helsinki.fi/en/helsinki-institute-social-sciences-and-humanities',
    description: 'The institute is building a research culture that creates new multidisciplinary and inspiring research collaboration on the City Centre Campus and with partners outside the university.',
    expertise: [
      { tag: 'computational social science' },
      { tag: 'digital politics' },
      { tag: 'computer vision' },
    ],
    contactName: 'Jouni Tuominen',
    contactUrl: 'https://researchportal.helsinki.fi/fi/persons/jouni-tuominen',
    dariahNodeSlug: 'helsinki',
    order: 7,
  },
  {
    name: 'InfUSE',
    externalUrl: 'https://www.tuni.fi/en/research/infuse',
    description: 'InfUSE (Information interaction and use) is a group of multidisciplinary researchers in information interaction and use. The group studies all aspects of information searching, information use in various contexts, interactive information retrieval and information interaction.',
    expertise: [
      { tag: 'evidence-based infrastructure development' },
      { tag: 'information interaction' },
      { tag: 'information use' },
      { tag: 'information searching' },
      { tag: 'information retrieval' },
    ],
    contactName: 'Sanna Kumpulainen',
    contactUrl: 'https://www.tuni.fi/fi/ihmiset/sanna-kumpulainen',
    dariahNodeSlug: 'tampere',
    order: 8,
  },
  {
    name: 'JYUDIG',
    externalUrl: 'https://www.jyu.fi/en/jyudig',
    description: 'The JYUDIG network aims to bring together researchers whose work includes a digital dimension, either in terms of material or methodology. The network supports this by organizing events, workshops, and courses to facilitate digital humanities research.',
    expertise: [
      { tag: 'digital humanities' },
      { tag: 'digital social sciences and humanities' },
    ],
    contactName: 'Marko Hakanen',
    contactUrl: 'https://www.jyu.fi/fi/henkilot/marko-hakanen',
    dariahNodeSlug: 'jyvaskyla',
    order: 9,
  },
  {
    name: 'Machine Learning Group',
    externalUrl: 'https://cs.uef.fi/ml/',
    description: 'The main research areas are clustering methods, location-based services, data and web mining, and optimizing health care applications.',
    expertise: [
      { tag: 'clustering methods' },
      { tag: 'location-based services' },
      { tag: 'data and web mining' },
      { tag: 'optimizing health care applications' },
    ],
    contactName: 'Pasi Fränti',
    contactUrl: 'https://uefconnect.uef.fi/pasi.franti/',
    dariahNodeSlug: 'eastern-finland',
    order: 10,
  },
  {
    name: 'Political Representation: Tensions between Parliament and the People',
    externalUrl: 'https://www.jyu.fi/en/projects/political-representation-tensions-between-parliament-and-the-people-from-the-age-of-revolutions-to',
    description: 'This project answers whether democracy in its representative form is in crisis by exploring the contested nature of concepts used to construct democracy — analysing how parliamentarians\' understandings of representation and democracy have changed over time.',
    expertise: [
      { tag: 'political representation' },
      { tag: 'digitised parliamentary records' },
      { tag: 'conceptual history' },
      { tag: 'big data' },
    ],
    contactName: 'Pasi Ihalainen',
    contactUrl: 'https://www.jyu.fi/fi/henkilot/pasi-ihalainen',
    dariahNodeSlug: 'jyvaskyla',
    order: 11,
  },
  {
    name: 'Sign Language Centre',
    externalUrl: 'https://www.jyu.fi/fi/hytk/kivi/viittomakielen-keskus/suomalaisen-ja-suomenruotsalaisen-viittomakielen-korpustyo',
    description: 'Finnish and Finnish-Swedish sign language corpus work: During the Finnish Sign Language Corpus project, a total of 103 sign language native speakers living in different parts of Finland were videotaped.',
    expertise: [
      { tag: 'sign-language corpus' },
      { tag: 'linguistic research data' },
      { tag: 'multimodal data' },
    ],
    contactName: 'Juhana Salonen',
    contactUrl: 'https://www.jyu.fi/fi/henkilot/juhana-salonen',
    dariahNodeSlug: 'jyvaskyla',
    order: 12,
  },
  {
    name: 'Semantic Computing Research Group (SeCo)',
    externalUrl: 'https://seco.cs.aalto.fi/projects/fin-clariah/',
    description: 'The local node in the Aalto University is situated at the Department of Computer Science, Semantic Computing Research Group (SeCo). Our focus is on developing and maintaining a national Linked Open Data (LOD) infrastructure and applications for Digital Humanities.',
    expertise: [
      { tag: 'Semantic Web' },
      { tag: 'knowledge graphs' },
      { tag: 'data analysis' },
      { tag: 'data visualization' },
      { tag: 'network analysis' },
      { tag: 'Large Language Models (LLMs)' },
      { tag: 'generative AI' },
    ],
    contactName: 'Eero Hyvönen',
    contactUrl: 'https://seco.cs.aalto.fi/u/eahyvone/',
    dariahNodeSlug: 'aalto',
    order: 13,
  },
  {
    name: 'TurkuNLP',
    externalUrl: 'http://turkunlp.org',
    description: 'TurkuNLP is a leading Finnish research group in natural language processing (NLP) and digital language studies. Known for its strong interdisciplinary focus ranging from digital humanities to BioNLP and large language models.',
    expertise: [
      { tag: 'language technology' },
      { tag: 'digital language studies' },
      { tag: 'NLP' },
      { tag: 'Large Language Models (LLMs)' },
      { tag: 'digital humanities' },
      { tag: 'web registers' },
    ],
    contactName: 'Veronika Laippala',
    contactUrl: 'https://www.utu.fi/en/people/veronika-laippala',
    dariahNodeSlug: 'turku',
    order: 14,
  },
  {
    name: 'Turku Data Science Group',
    externalUrl: 'https://datascience.utu.fi',
    description: 'Turku Data Science group is a leading Finnish research group in computational humanities. The main research focus is in the analysis of complex natural and social systems using state-of-the-art approaches in scientific data analysis.',
    expertise: [
      { tag: 'computational humanities' },
      { tag: 'complex systems' },
      { tag: 'data science' },
      { tag: 'applied statistics' },
      { tag: 'probabilistic models' },
      { tag: 'open science' },
    ],
    contactName: 'Leo Lahti',
    contactUrl: 'https://datascience.utu.fi/team/',
    dariahNodeSlug: 'turku',
    order: 15,
  },
]

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding affiliated-groups...')

  for (const group of groups) {
    try {
      // Look up the local office by slug to get its ID
      const { docs: nodes } = await payload.find({
        collection: 'local-offices',
        where: { slug: { equals: group.dariahNodeSlug } },
        limit: 1,
      })

      if (nodes.length === 0) {
        console.warn(`⚠️  Local office not found for slug "${group.dariahNodeSlug}" — skipping "${group.name}"`)
        continue
      }

      const dariahNode = nodes[0].id

      // Check if already exists
      const existing = await payload.find({
        collection: 'affiliated-groups',
        where: { name: { equals: group.name } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Skipping "${group.name}" — already exists`)
        continue
      }

      const { dariahNodeSlug, ...data } = group

      await payload.create({
        collection: 'affiliated-groups',
        data: {
          ...data,
          description: toRichText(data.description),
          dariahNode,
        },
      })

      console.log(`✅ Created "${group.name}"`)
    } catch (err) {
      console.error(`❌ Failed "${group.name}":`, err)
    }
  }

  console.log('✅ Done seeding affiliated-groups')
  process.exit(0)
}

seed()
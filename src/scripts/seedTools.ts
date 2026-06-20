import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { toRichText } from './utils'

const tools = [
  {
    name: 'Tools to make sense of web data',
    description: toRichText(
      'This resource consists of two tools: one to classify toxic data in Finnish (e.g., insults, obscene language) from datasets retrieved from social media platforms; and another to identify registers (genres, e.g., reviews, interviews, news reports) from web content in diverse languages. Resource developed by TurkuNLP / University of Turku in partnership with the CSC.',
    ),
    accessLinks: [
      { label: 'Toxicity classifier', url: 'https://github.com/TurkuNLP/toxicity-classifier' },
      { label: 'Multilingual modeling of web registers', url: 'https://github.com/TurkuNLP/multilingual-register-labeling' },
    ],
    tutorialUrl: 'https://youtu.be/q8kOJB6nA2M?feature=shared',
    contacts: [
      { name: 'Veronika Laippala', url: 'https://www.utu.fi/fi/ihmiset/veronika-laippala' },
    ],
    developedBySlugs: ['turku'],
    collaboratorSlugs: ['csc'],
    order: 1,
  },
  {
    name: 'Twitch Chat Collector & Analysis Tool',
    description: toRichText(
      'This resource collects chat data from the live stream service Twitch and YouTube. The tools sidebar contains multiple ways to collect data, but also sections for chat content classification based on machine learning and video clip analysis based on Multimodal Large Language Models. Resource developed by the University of Jyväskylä with collaboration from Tampere University.',
    ),
    accessLinks: [
      { label: 'Tool', url: 'https://collector-twitcher.2.rahtiapp.fi/' },
    ],
    tutorialUrl: 'https://youtu.be/BN6ikEOy54U',
    contacts: [
      { name: 'Raine Koskimaa', url: 'https://www.jyu.fi/fi/henkilot/raine-koskimaa' },
      { name: 'Jari Lindroos', url: 'https://www.jyu.fi/fi/henkilot/jari-lindroos' },
    ],
    developedBySlugs: ['jyvaskyla'],
    collaboratorSlugs: ['tampere'],
    order: 2,
  },
  {
    name: 'Document Understanding Tools',
    description: toRichText(
      'Tools for document understanding including named entity recognition and document type classification. Most of the tool development has been conducted in collaboration with the National Archives of Finland.',
    ),
    accessLinks: [
      { label: 'Named entity recognition (UI)', url: 'https://arkkiivi.fi/' },
      { label: 'Named entity recognition (Huggingface)', url: 'https://huggingface.co/Kansallisarkisto/finbert-ner' },
      { label: 'Document type classification', url: 'https://huggingface.co/jyu-digihum/findoctype' },
    ],
    tutorialUrl: 'https://github.com/JYU-digihum',
    contacts: [
      { name: 'Venla Poso', url: 'https://www.jyu.fi/fi/henkilot/venla-poso' },
      { name: 'Ida Toivanen', url: 'https://www.jyu.fi/fi/henkilot/ida-toivanen' },
    ],
    developedBySlugs: ['jyvaskyla'],
    collaboratorSlugs: ['national-archives'],
    order: 3,
  },
  {
    name: 'L2 Finnish model',
    description: toRichText(
      'A classification model trained with CEFR annotated data containing fictional and non-fictional texts written by Finnish as a second language (L2) speakers. With the model you can classify texts into the following CEFR classes: A1, A2, B1, B2, and C.',
    ),
    accessLinks: [
      { label: 'Huggingface', url: 'https://huggingface.co/jyu-digihum/l2finnishmodel' },
    ],
    tutorialUrl: '',
    contacts: [
      { name: 'Jenny Tarvainen', url: 'https://www.jyu.fi/en/people/jenny-tarvainen' },
      { name: 'Ida Toivanen', url: 'https://www.jyu.fi/fi/henkilot/ida-toivanen' },
      { name: 'Ari Huhta', url: 'https://www.jyu.fi/en/people/ari-huhta' },
    ],
    developedBySlugs: ['jyvaskyla'],
    collaboratorSlugs: [],
    order: 4,
  },
  {
    name: 'NTS: Nordic Tweet Stream',
    description: toRichText(
      'This resource makes Twitter/X data available for researchers. Altogether, it contains nearly 74 million messages from hundreds of thousands of user accounts from the five Nordic countries. The NTS data cover the period between January 2013 and May 2023. Resource developed by the University of Eastern Finland, in collaboration with Linnaeus University.',
    ),
    accessLinks: [
      { label: 'Access resource', url: 'https://nordictweetstream.fi/' },
    ],
    tutorialUrl: 'https://youtu.be/XvJhfp8pWM4',
    contacts: [],
    developedBySlugs: ['eastern-finland'],
    collaboratorSlugs: [],
    order: 5,
  },
  {
    name: 'Sampo UI builder',
    description: toRichText(
      'This resource provides a framework for building customizable and responsive user interfaces for semantic portals without the necessity of having broad coding skill. Resource developed by Aalto University in partnership with the University of Turku and the University of Helsinki.',
    ),
    accessLinks: [
      { label: 'Sampo UI', url: 'https://seco.cs.aalto.fi/tools/sampo-ui/' },
      { label: 'Tutorial PDF', url: 'https://seco.cs.aalto.fi/tools/sampo-ui/Sampo-UI-tutorial.pdf' },
      { label: 'ParliamentSampo example', url: 'https://parlamenttisampo.fi/' },
    ],
    tutorialUrl: 'https://youtu.be/VV7Hw_uEtHM?feature=shared',
    contacts: [
      { name: 'Eero Hyvönen', url: 'https://seco.cs.aalto.fi/u/eahyvone/' },
    ],
    developedBySlugs: ['aalto'],
    collaboratorSlugs: ['turku', 'helsinki'],
    order: 6,
  },
  {
    name: 'Text Network Tools for Parliamentary Data',
    description: toRichText(
      'This resource provides tools based on network analysis for the analysis of political text. With these tools, researchers will be able to analyze keyword embeddings of the FinParl corpus and identify how phrases or longer text passages are re-used over time in MPs plenary debates of the Finnish parliament. Resource developed by the University of Turku in partnership with Aalto University.',
    ),
    accessLinks: [
      { label: 'KWIC keyword tool for FinParl', url: 'http://finparl-01.utu.fi/apps/KWIC/' },
      { label: 'TNA tool for Finnish MPs speeches', url: 'http://finparl-01.utu.fi/apps/TNA' },
    ],
    tutorialUrl: 'https://youtu.be/_5CCKOnOSfg?feature=shared',
    contacts: [
      { name: 'Kimmo Elo', url: 'https://www.utu.fi/fi/ihmiset/kimmo-elo' },
    ],
    developedBySlugs: ['turku'],
    collaboratorSlugs: ['aalto', 'jyvaskyla'],
    order: 7,
  },
  {
    name: 'Finnsurveytext',
    description: toRichText(
      'This resource provides a set of easy-to-use tools for conducting qualitative analysis on survey responses in Finnish. Thanks to this resource, researchers will be able to better understand data retrieved from open-ended questions.',
    ),
    accessLinks: [
      { label: 'CRAN webpage', url: 'https://CRAN.R-project.org/package=finnsurveytext' },
    ],
    tutorialUrl: 'https://youtu.be/UN7viKRzQvI',
    contacts: [
      { name: 'Krista Lagus', url: 'https://researchportal.helsinki.fi/fi/persons/krista-lagus' },
    ],
    developedBySlugs: ['helsinki'],
    collaboratorSlugs: [],
    order: 8,
  },
  {
    name: 'Finnish Forum Scrapers',
    description: toRichText(
      'An application for scraping comment-data from Finnish resources with high user traffic.',
    ),
    accessLinks: [
      { label: 'GitHub', url: 'https://github.com/uh-dcm/finnish-forum-scrapers' },
    ],
    tutorialUrl: 'https://youtu.be/yawd9zSb_xY',
    contacts: [
      { name: 'Matti Nelimarkka', url: 'https://researchportal.helsinki.fi/fi/persons/matti-nelimarkka/' },
    ],
    developedBySlugs: ['helsinki'],
    collaboratorSlugs: [],
    order: 9,
  },
  {
    name: 'Historical Newspapers in the CSC Supercomputing Environment',
    description: toRichText(
      'This resource allows downloading copyright-free materials from the National Library of Finland through the CSC. Resource developed by the National Library of Finland in partnership with the CSC, University of Helsinki and University of Turku.',
    ),
    accessLinks: [
      { label: 'GitHub', url: 'https://github.com/CSCfi/kielipankki-nlf-harvester' },
      { label: 'Technical documentation', url: 'https://urn.fi/urn:nbn:fi:lb-202311261' },
    ],
    tutorialUrl: '',
    contacts: [
      { name: 'kk-tutkijapalvelut@helsinki.fi', url: '' },
    ],
    developedBySlugs: ['national-library'],
    collaboratorSlugs: ['csc', 'helsinki', 'turku', 'national-archives', 'jyvaskyla'],
    order: 10,
  },
  {
    name: 'Harmonized Finnish National Bibliography',
    description: toRichText(
      'This resource provides a harmonized version of the Finnish national bibliography (Fennica) dataset as well as the code used for cleaning, enriching and automatically generating reports on the data. Developed by the University of Turku in partnership with the University of Helsinki.',
    ),
    accessLinks: [
      { label: 'Access resource', url: 'https://fennica-fennica.2.rahtiapp.fi/' },
      { label: 'Harmonization code', url: 'https://github.com/fennicahub/fennica' },
    ],
    tutorialUrl: 'https://youtu.be/9QYKQ1IYIjQ?feature=shared',
    contacts: [
      { name: 'Leo Lahti', url: 'https://www.utu.fi/fi/ihmiset/leo-lahti' },
    ],
    developedBySlugs: ['turku'],
    collaboratorSlugs: ['helsinki', 'national-library', 'jyvaskyla'],
    order: 11,
  },
  {
    name: 'Tool to evaluate biases and errors',
    description: toRichText(
      'This resource provides tools for subsetting and evaluating datasets that have not originally been created for research. Researchers will be able to robustly explore large datasets, examine their representativeness, and extract the subset they are interested in. Resource developed by the University of Helsinki (ARTS) in partnership with the CSC.',
    ),
    accessLinks: [
      { label: 'End-user interface', url: 'https://github.com/hsci-r/elasticsearch-openshift/blob/main/documentation/exported_query.md' },
      { label: 'Technical documentation', url: 'https://github.com/hsci-r/elasticsearch-openshift' },
    ],
    tutorialUrl: 'https://youtu.be/EVe5ZUo8tOM?feature=shared',
    contacts: [
      { name: 'Eetu Mäkelä', url: 'https://researchportal.helsinki.fi/fi/persons/jarkko-ilkka-eetu-m%C3%A4kel%C3%A4' },
    ],
    developedBySlugs: ['helsinki'],
    collaboratorSlugs: ['csc'],
    order: 12,
  },
  {
    name: 'Forensic Linguistics Corpus and Search Interface C.R.I.M.E.',
    description: toRichText(
      'A structured, searchable corpus comprising audio and ASR-generated transcripts from investigative interviews, courtroom interactions, and related media.',
    ),
    accessLinks: [
      { label: 'Access database', url: 'https://forensic.corpora.li' },
      { label: 'Static dataset', url: 'https://doi.org/10.7910/DVN/MLMB6E' },
    ],
    tutorialUrl: '',
    contacts: [
      { name: 'Steven Coats', url: 'https://cc.oulu.fi/~scoats/' },
    ],
    developedBySlugs: ['oulu'],
    collaboratorSlugs: [],
    order: 13,
  },
  {
    name: 'Automated Harmonisation and Enrichment of Metadata',
    description: toRichText(
      'R packages for collecting and enriching Finnish cultural heritage metadata. Includes finna R package for collecting cultural metadata using the Finna API, finto R package for enriching metadata using the Finto API, and geofi R package for geospatial analysis and visualization of metadata.',
    ),
    accessLinks: [
      { label: 'Finna R package', url: 'https://github.com/fennicahub/finna' },
      { label: 'Finto R package', url: 'https://github.com/fennicahub/finto' },
      { label: 'Geofi R package', url: 'https://github.com/rOpenGov/geofi' },
    ],
    tutorialUrl: '',
    contacts: [
      { name: 'Leo Lahti', url: 'https://www.utu.fi/fi/ihmiset/leo-lahti' },
    ],
    developedBySlugs: ['turku'],
    collaboratorSlugs: ['national-library'],
    order: 14,
  },
  {
    name: 'Research Data Management handbooks',
    description: toRichText(
      'A collection of open access digital handbooks for research data management for SSH fields edited by the Helsinki Institute for Social Sciences and Humanities in Spring/Autumn 2024. The five guides cover: Texts, register data, surveys, social media, as well as audiovisual recordings.',
    ),
    accessLinks: [
      { label: 'Access handbooks', url: 'https://www.helsinki.fi/en/helsinki-institute-social-sciences-and-humanities/research-support/research-data-management-handbooks' },
    ],
    tutorialUrl: '',
    contacts: [
      { name: 'Jouni Tuominen', url: 'https://researchportal.helsinki.fi/en/persons/jouni-tuominen/' },
    ],
    developedBySlugs: ['helsinki'],
    collaboratorSlugs: [],
    order: 15,
  },
  {
    name: 'DARIAH-FI Zotero library',
    description: toRichText(
      'A public directory of publications (research articles, conference proceedings, data publications) that point at, explain or introduce use cases for the infrastructures developed by the DARIAH-FI partners for the FIN-CLARIAH project.',
    ),
    accessLinks: [
      { label: 'Zotero library', url: 'https://www.zotero.org/groups/6332635/dariah-fi/library' },
    ],
    tutorialUrl: '',
    contacts: [
      { name: 'Inés Matres', url: 'https://researchportal.helsinki.fi/en/persons/in%C3%A9s-matres/' },
    ],
    developedBySlugs: ['helsinki'],
    collaboratorSlugs: [],
    order: 16,
  },
  {
    name: 'User Experience Questionnaire',
    description: toRichText(
      'UX questionnaire developed within DARIAH-FI to test and evaluate tools, datasets or workflows developed for the project. Created and updated in several phases between 2022-2023 from a literature review, semi-structured interviews, and tests with end-users.',
    ),
    accessLinks: [
      { label: 'Zenodo', url: 'https://zenodo.org/doi/10.5281/zenodo.10533140' },
    ],
    tutorialUrl: '',
    contacts: [],
    developedBySlugs: ['tampere'],
    collaboratorSlugs: [],
    order: 17,
  },
  {
    name: 'Guideline for collecting user experiences from workshops and training sessions',
    description: toRichText(
      'A guide for collecting user experience data from workshops and training sessions related to the resources developed by the FIN-CLARIAH consortium.',
    ),
    accessLinks: [
      { label: 'Zenodo', url: 'https://zenodo.org/records/10217404' },
    ],
    tutorialUrl: '',
    contacts: [],
    developedBySlugs: ['tampere'],
    collaboratorSlugs: [],
    order: 18,
  },
  {
    name: 'Educational material',
    description: toRichText(
      'Information regarding educational materials relevant to the DARIAH-FI research infrastructure and guidance on which courses might be relevant to use its resources more efficiently. Also includes an overview of digital humanities and computational social sciences education in Finland.',
    ),
    accessLinks: [
      { label: 'Zenodo', url: 'https://zenodo.org/records/10478885' },
    ],
    tutorialUrl: '',
    contacts: [],
    developedBySlugs: ['tampere'],
    collaboratorSlugs: [],
    order: 19,
  },
  {
    name: 'Educational resource development',
    description: toRichText(
      'An updated report on the educational resource development in DARIAH-FI for the 2024–2025 funding period.',
    ),
    accessLinks: [
      { label: 'Zenodo', url: 'https://zenodo.org/records/17696184' },
    ],
    tutorialUrl: '',
    contacts: [],
    developedBySlugs: ['tampere'],
    collaboratorSlugs: [],
    order: 20,
  },
  {
    name: 'Digital Humanities and Social Sciences video library',
    description: toRichText(
      'A collection of educational videos created for the course "Introduction to Digital Humanities and Social Sciences" at University of Helsinki. Ongoing since 2022, the video library is fit for wider public use, published with CC BY license on the University of Helsinki Unitube platform.',
    ),
    accessLinks: [
      { label: 'Unitube', url: 'https://www.helsinki.fi/fi/ajankohtaista/unitube?search=81c70b78-bdce-469b-87de-01c754ead51f' },
    ],
    tutorialUrl: '',
    contacts: [],
    developedBySlugs: ['helsinki'],
    collaboratorSlugs: [],
    order: 21,
  },
  {
    name: 'Recommender system for NLF data',
    description: toRichText(
      'Code for developing recommender systems to assist information retrieval in digital libraries based on log data gathered from their use. Developed by Tampere University in partnership with CSC and the University of Helsinki.',
    ),
    accessLinks: [
      { label: 'GitHub', url: 'https://github.com/mrgransky/DARIAH-FI' },
      { label: 'Demo', url: 'https://drive.google.com/file/d/1rYT_xqot9FKourz0DUoK5mD5urzeNVDE/view' },
    ],
    tutorialUrl: '',
    contacts: [],
    developedBySlugs: ['tampere'],
    collaboratorSlugs: ['csc', 'helsinki', 'national-library', 'turku'],
    order: 22,
  },
]

async function resolveNodeIds(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slugs: string[],
) {
  const ids: number[] = []
  for (const slug of slugs) {
    const { docs } = await payload.find({
      collection: 'local-offices',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (docs.length > 0) {
      ids.push(docs[0].id)
    } else {
      console.warn(`⚠️  Local office not found for slug "${slug}"`)
    }
  }
  return ids
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding tools...')

  for (const tool of tools) {
    try {
      const existing = await payload.find({
        collection: 'tools',
        where: { name: { equals: tool.name } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`⏭️  Skipping "${tool.name}" — already exists`)
        continue
      }

      const developedBy = await resolveNodeIds(payload, tool.developedBySlugs)
      const collaborators = await resolveNodeIds(payload, tool.collaboratorSlugs)

      const { developedBySlugs, collaboratorSlugs, ...data } = tool

      await payload.create({
        collection: 'tools',
        data: {
          ...data,
          developedBy,
          collaborators,
        },
      })

      console.log(`✅ Created "${tool.name}"`)
    } catch (err) {
      console.error(`❌ Failed "${tool.name}":`, err)
    }
  }

  console.log('✅ Done seeding tools')
  process.exit(0)
}

seed()
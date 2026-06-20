import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { toRichText } from './utils'

const aboutTab = `The mission of DARIAH-FI

DARIAH-FI is a national research infrastructure for the needs of data-intensive social sciences and humanities (SSH) in Finland. DARIAH-FI was created to mitigate and scale the scattering of best practices across individual research groups and universities. Our national network lessens overlapping work and encourages synergies inside the Finnish SSH community. As a research infrastructure, we build and share digital tools, datasets, and functionalities that help researchers bring materials into environments for data-intensive research and big-data processing. Our services are provided centrally through CSC's environment to make them as easily accessible as possible.

DARIAH-FI aims to become the national consortium affiliated to DARIAH-EU — The pan-European Digital Research Infrastructure for the Arts and Humanities. This provides Finnish universities and research institutes access to key European resources to spread digital competences and support digital humanities and computational social sciences. This affiliation facilitates international collaboration and gives visibility to Finnish resources internationally.

Why do we need DARIAH-FI?

There are at least three good reasons for national co-operation through DARIAH-FI:

EFFICIENCY — Coordination on a national level helps to avoid duplication of work in individual research teams — more efficient use of limited resources in data-intensive SSH research.

SUSTAINABILITY — Individual research teams do not have sufficient resources for long-term infrastructure building — our network builds sustainable solutions for data-intensive SSH research.

FUNDING — We facilitate the spread of digital competences in every Finnish university — increased chances for winning funding at the highest international level in data-intensive SSH research.

Organization

DARIAH-FI has operated since 2022 as a researcher-driven ecosystem of services with representatives from seven universities in Finland, the National Library of Finland, and the CSC. The main decision-making body of DARIAH-FI is the Steering Group. Its members are senior-level experts in the fields of digital humanities, computational social sciences, history, cultural studies, and related fields such as information science and data science, reflecting DARIAH-FI's interdisciplinary commitment.

The director of DARIAH-FI is Mikko Tolonen, with Eetu Mäkelä acting as the technical lead for the infrastructure. Day-to-day operations are coordinated by a team from the University of Helsinki and the National Library of Finland (info@dariah.fi) in close collaboration with the local offices.`

const finClariahTab = `DARIAH-FI + FIN-CLARIN → FIN-CLARIAH

Together with its sister infrastructure FIN-CLARIN, DARIAH-FI comprises FIN-CLARIAH. FIN-CLARIN is a mature infrastructure with a high-quality service model through its online service centre The Language Bank of Finland. This part of the infrastructure keeps integrating common tools and resources for processing language and language-related data.

FIN-CLARIN's focus on centrally provided resources for language-based research is complemented by DARIAH-FI's bottom-up approach to data and service creation and the gathering of evidence among a wider discipline base that claims the need for infrastructure that supports other types of data and questions.

Beyond collaborating at the boundaries where their missions overlap, both components share facilities for the management and negotiation of material rights, for technical access, as well as for hosting documentation, tools and services.`

const developmentTab = `Development of the infrastructure

Development of DARIAH-FI is being funded through research infrastructure funding from the Research Council of Finland. For the 2024–2025 funding period, DARIAH-FI is responsible for developing infrastructures in three areas: 1) Upgrading tools for processing unstructured text, 2) facilitating research in audio-visual culture, and 3) supporting uptake of transformer technology in SSH.

Work packages

WP Data Management

The foreseen impact is a significant upgrade of the data management, versioning and workflow automation capabilities that underlie the whole infrastructure. While the infrastructure already has multiple distinct processes for data ingestion and versioning, there is a need to further integrate and develop these, both to improve efficiency, as well as to cater to the new types of material to be managed in this project.

Leader: Martin Matthiesen, CSC – IT Center for Science. Partners: UHEL/ARTS; Collaborators: UHEL/NLF, NAF, JYU.

WP Data Ingestion

The foreseen impact of the WP is to improve the infrastructure by connecting it to accruing data sources. The overall goal of this work package is to strengthen and improve the RI by enhancing access to open data, improving technical features, and creating workflow automation for data update and maintenance.

Leader: Päivi Maria Pihlaja, University of Helsinki / National Library of Finland. Partners: Aalto, UOULU, JYU, UHEL/ARTS, UHEL/SOC; Collaborator: CSC.

WP Analytical Support

The foreseen impact of this WP is that it enables researchers to utilise large born-digital data effectively and to focus on analysis rather than dealing with technical details in often high volume and high velocity.

Leader: Mikko Laitinen, University of Eastern Finland. Participants: JYU, UOULU, UHEL/SOC; Collaborator: UHEL/NLF.

WP Evidence-Based Development

Information Interaction means to collect information on how researchers interact with the RI in order to design and develop tools and services accordingly. The foreseen impact is a close dialogue with the user community to ensure the best possible development of the RI.

Leader: Sanna Kumpulainen, Tampere University. Participants: UHEL/ARTS; Collaborators: UHEL/NLF, UHEL/SOC, UTU, JYU, UEF, UOULU, CSC.`

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Seeding About page...')

  const tabsBlock = {
    blockType: 'tabsBlock' as const,
    tabs: [
      { label: 'About', content: toRichText(aboutTab) },
      { label: 'FIN-CLARIAH', content: toRichText(finClariahTab) },
      { label: 'Development', content: toRichText(developmentTab) },
    ],
  }

  const { docs: existing } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })

  if (existing.length > 0) {
    console.log(`📝 Updating existing About page (id ${existing[0].id})`)
    await payload.update({
      collection: 'pages',
      id: existing[0].id,
      context: { disableRevalidate: true },
      data: {
        layout: [tabsBlock],
      },
    })
  } else {
    console.log('📝 Creating About page')
    await payload.create({
      collection: 'pages',
      draft: false,
      context: { disableRevalidate: true },
      data: {
        title: 'About',
        slug: 'about',
        _status: 'published',
        hero: { type: 'none' },
        layout: [tabsBlock],
      },
    })
  }

  console.log('✅ Done seeding About page')
  process.exit(0)
}

seed()
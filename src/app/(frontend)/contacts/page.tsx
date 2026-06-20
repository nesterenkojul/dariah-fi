import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { OfficeContactCard } from '@/components/ContactCard/OfficeContactCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contacts – DARIAH-FI',
}

export default async function ContactsPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: offices } = await payload.find({
    collection: 'local-offices',
    sort: 'order',
    limit: 100,
  })

  return (
    <main className="container my-16">
      <h1 className="mb-6">Contacts</h1>
      <p className="text-muted-foreground mb-8">
        Contact your local DARIAH-FI representative:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offices.map((office) => (
          <OfficeContactCard key={office.id} office={office} />
        ))}
      </div>
    </main>
  )
}
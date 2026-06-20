import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Local Offices — DARIAH-FI',
}

export default async function OfficesPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: offices } = await payload.find({
    collection: 'local-offices',
    sort: 'order',
    limit: 100,
  })

  return (
    <main className="container my-16">
      <h1 className="mb-6">Local Offices</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offices.map((office) => (
          <Link
            key={office.id}
            href={`/local-offices/${office.slug}`}
            className="flex gap-4 p-4 border border-border rounded-md bg-card hover:bg-muted transition-colors"
          >
            {office.logo && typeof office.logo === 'object' && (
              <div className="w-20 flex-shrink-0 flex items-center">
                <Media resource={office.logo} />
              </div>
            )}
            <div>
              <p className="font-semibold text-headings mb-1">{office.name}</p>
              {office.shortDescription && (
                <p className="text-sm text-muted-foreground">{office.shortDescription}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
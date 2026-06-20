import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { TabsBlock as TabsBlockProps, AffiliatedGroup, Tool } from '@/payload-types'
import { TabsClient } from './Component.client'
import { AffiliatedGroupCard } from './AffiliatedGroupCard'
import { ToolCard } from './ToolCard'

export const TabsBlockComponent: React.FC<TabsBlockProps> = async ({ tabs }) => {
  if (!tabs?.length) return null

  const payload = await getPayload({ config: configPromise })

  const renderedTabs = await Promise.all(
    tabs.map(async (tab) => {
      let listing: React.ReactNode = null

      if (tab.listType === 'affiliatedGroups') {
        const { docs } = await payload.find({
          collection: 'affiliated-groups',
          sort: 'order',
          limit: 100,
        })
        listing = (
          <div className="space-y-4 mt-4">
            {(docs as AffiliatedGroup[]).map((group) => (
              <AffiliatedGroupCard key={group.id} group={group} />
            ))}
          </div>
        )
      } else if (tab.listType === 'tools') {
        const { docs } = await payload.find({
          collection: 'tools',
          sort: 'order',
          limit: 100,
        })
        listing = (
          <div className="space-y-4 mt-4">
            {(docs as Tool[]).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )
      }

      return {
        label: tab.label,
        content: tab.content,
        listing,
      }
    }),
  )

  return <TabsClient tabs={renderedTabs} />
}
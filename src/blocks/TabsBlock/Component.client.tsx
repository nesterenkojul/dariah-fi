'use client'

import React, { useState, useEffect } from 'react'
import RichText from '@/components/RichText'

type RenderedTab = {
  label: string
  content?: any
  listing?: React.ReactNode
}

function slugify(label: string): string {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export const TabsClient: React.FC<{ tabs: RenderedTab[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)

  // On mount, check the URL hash and switch to the matching tab
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    const index = tabs.findIndex((t) => slugify(t.label) === hash)
    if (index >= 0) {
      setActiveTab(index)
    }
  }, [tabs])

  const handleTabClick = (i: number) => {
    setActiveTab(i)
    const slug = slugify(tabs[i].label)
    // Update the URL hash without triggering navigation/scroll
    window.history.replaceState(null, '', `#${slug}`)
  }

  return (
    <div className="container my-8">
      <div className="flex border-b border-border mb-6 gap-1">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => handleTabClick(i)}
            className={[
              'px-4 py-2 text-sm font-medium transition-colors rounded-t-md',
              activeTab === i
                ? 'border border-b-background border-border bg-background text-foreground -mb-px'
                : 'text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div key={i} className={activeTab === i ? 'block' : 'hidden'}>
          {tab.content && <RichText data={tab.content} />}
          {tab.listing}
        </div>
      ))}
    </div>
  )
}
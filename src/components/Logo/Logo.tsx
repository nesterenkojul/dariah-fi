import clsx from 'clsx'
import React from 'react'
import path from 'path'

const dirname = path.dirname(import.meta.url)
const logoPath = path.join(dirname, 'dariah_logo.svg')


interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Dariah Logo"
      width={160}
      height={40}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className="h-auto w-28 md:w-40"
      src="/dariah_logo.svg"
    />
  )
}

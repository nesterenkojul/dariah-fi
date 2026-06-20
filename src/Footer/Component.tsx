import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

const BlueSkyIcon = () => (
  <svg viewBox="0 0 24 20" fill="currentColor" width="20" height="20" aria-label="Bluesky" role="img">
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C3.045 1.193 1.218 1.53.964 3.478c-.276 2.1-.23 4.306 1.395 5.373 1.744 1.14 3.474 1.38 3.474 1.38s-3.35.52-4.297 3.2c-1.022 2.864 1.716 5.57 5.463 3.95C9.483 15.842 11.038 13.62 12 10.8Zm0 0c1.087-2.114 4.046-6.053 6.798-7.995 2.157-1.612 3.984-1.274 4.238.674.276 2.1.23 4.306-1.395 5.373-1.744 1.14-3.474 1.38-3.474 1.38s3.35.52 4.297 3.2c1.022 2.864-1.716 5.57-5.463 3.95C14.517 15.842 12.962 13.62 12 10.8Z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-label="YouTube" role="img">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const socialIcons: Record<string, React.FC> = {
  'bsky.app': BlueSkyIcon,
  'youtube.com': YouTubeIcon,
}

function getSocialIcon(url: string): React.FC | null {
  if (!url) return null
  for (const [domain, Icon] of Object.entries(socialIcons)) {
    if (url.includes(domain)) return Icon
  }
  return null
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  const textLinks = navItems.filter(({ link }) => !getSocialIcon(link?.url || ''))
  const socialLinks = navItems.filter(({ link }) => getSocialIcon(link?.url || ''))

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Logo */}
        <Link className="flex items-center flex-shrink-0" href="/">
          <Logo />
        </Link>

        {/* Text nav links — wrap on narrow screens */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center text-sm">
          <p>Copyright © 2026 DARIAH-FI</p>
          {textLinks.map(({ link }, i) => (
            <u>
            <CMSLink
              key={i}
              className="hover:text-muted transition-colors whitespace-nowrap"
              {...link}
            />
            </u>
          ))}
        </nav>

        {/* Social icons — always together, never wrap */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4 flex-shrink-0">
            {socialLinks.map(({ link }, i) => {
              const url = link?.url || ''
              const SocialIcon = getSocialIcon(url)!
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-white hover:text-muted transition-colors"
                  aria-label={link?.label || url}
                >
                  <SocialIcon />
                </a>
              )
            })}
          </div>
        )}

      </div>
    </footer>
  )
}
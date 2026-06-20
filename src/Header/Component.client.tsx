'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MenuIcon, XIcon, SearchIcon } from 'lucide-react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navItems = data?.navItems || []

  return (
    <header
      className="border-b border-border bg-background z-50"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 min-w-0">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        {/* Desktop nav — show from lg (1024px) up */}
        <nav className="hidden lg:flex items-center gap-4 overflow-hidden">  {/* gap-6 → gap-4 to save space */}
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={
                pathname === (link?.url || '')
                  ? 'text-primary font-medium text-sm'
                  : 'text-foreground hover:text-primary transition-colors text-sm'
              }
            />
          ))}
          <Link href="/search" className="text-foreground hover:text-primary transition-colors flex-shrink-0" aria-label="Search">
            <SearchIcon className="w-5 h-5" />
          </Link>
        </nav>
        
        {/* Mobile/tablet hamburger — show below lg */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/search" aria-label="Search">
            <SearchIcon className="w-5 h-5 text-foreground" />
          </Link>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="p-1 text-foreground"
          >
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
        
        {/* Mobile dropdown — show below lg */}
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className={[
                    'py-2 text-base border-b border-border last:border-0',
                    pathname === (link?.url || '')
                      ? 'text-primary font-medium'
                      : 'text-foreground hover:text-primary transition-colors',
                  ].join(' ')}
                />
              ))}
            </nav>
          </div>
        )}
    </header>
  )
}
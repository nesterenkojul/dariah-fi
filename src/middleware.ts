import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. WordPress dated post URLs: /YYYY/MM/DD/post-slug/ -> /posts/post-slug
  const postMatch = pathname.match(/^\/\d{4}\/\d{2}\/\d{2}\/([^/]+)\/?$/)
  if (postMatch) {
    return NextResponse.redirect(
      new URL(`/posts/${postMatch[1]}`, request.url),
      301,
    )
  }

  // 2. Event detail pages: /event/slug/ -> /events/slug
  const eventMatch = pathname.match(/^\/event\/([^/]+)\/?$/)
  if (eventMatch) {
    return NextResponse.redirect(
      new URL(`/events/${eventMatch[1]}`, request.url),
      301,
    )
  }

  // 3. Local office detail pages: /local-offices/local-office-detail-XXX/ -> /local-offices/XXX
  const officeMatch = pathname.match(/^\/local-offices\/local-office-detail-([^/]+)\/?$/)
  if (officeMatch) {
    return NextResponse.redirect(
      new URL(`/local-offices/${officeMatch[1]}`, request.url),
      301,
    )
  }

  // 4. Category archive -> Posts listing
  if (pathname === '/category/news-and-blogs' || pathname === '/category/news-and-blogs/') {
    return NextResponse.redirect(new URL('/posts', request.url), 301)
  }

  // 5. Old About sub-pages -> About (with tab anchors, if TabsClient supports hash routing)
  if (pathname === '/about-fin-clariah' || pathname === '/about-fin-clariah/') {
    return NextResponse.redirect(new URL('/about#fin-clariah', request.url), 301)
  }
  if (pathname === '/about-development' || pathname === '/about-development/') {
    return NextResponse.redirect(new URL('/about#development', request.url), 301)
  }

  // 6. Resources Tools tab -> Resources page
  if (pathname === '/resources-2' || pathname === '/resources-2/') {
    return NextResponse.redirect(new URL('/resources#tools', request.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/:year(\\d{4})/:month/:day/:slug',
    '/event/:slug',
    '/local-offices/local-office-detail-:slug',
    '/category/news-and-blogs',
    '/about-fin-clariah',
    '/about-development',
    '/resources-2',
  ],
}
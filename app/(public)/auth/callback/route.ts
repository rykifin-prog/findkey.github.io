import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/get-site-url';

function getSafeNext(next: string | null) {
  if (!next || !next.startsWith('/')) {
    return '/';
  }

  return next;
}

export async function GET(request: NextRequest) {
  const requestHeaders = headers();
  const siteUrl = getSiteUrl(requestHeaders);
  const next = getSafeNext(request.nextUrl.searchParams.get('next'));
  const error =
    request.nextUrl.searchParams.get('error_description') || request.nextUrl.searchParams.get('error');

  if (error) {
    const errorUrl = new URL('/auth/sign-in', siteUrl);
    errorUrl.searchParams.set('error', error);
    return NextResponse.redirect(errorUrl);
  }

  const redirectUrl = new URL('/auth/sign-in', siteUrl);
  redirectUrl.searchParams.set('next', next);
  redirectUrl.searchParams.set('message', 'Your email is confirmed. Please sign in to continue.');

  return NextResponse.redirect(redirectUrl);
}

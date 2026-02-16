import { NextRequest, NextResponse } from 'next/server';
import {
  applySessionCookiesToResponse,
  clearSessionCookiesFromResponse,
  getUserFromAccessToken,
  isPaidSubscriber,
  readSessionTokens,
  refreshSession
} from '@/lib/supabase/auth';

const studioPathPrefix = '/studio';
const fullBriefRoute = /^\/briefs\/[^/]+\/full$/;

function buildRedirect(request: NextRequest, pathname: string, params?: Record<string, string>) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isStudioRoute = pathname.startsWith(studioPathPrefix);
  const isPaidBriefRoute = fullBriefRoute.test(pathname);

  if (!isStudioRoute && !isPaidBriefRoute) {
    return NextResponse.next();
  }

  const { accessToken, refreshToken } = readSessionTokens(request);
  let user = accessToken ? await getUserFromAccessToken(accessToken) : null;
  const response = NextResponse.next();

  if (!user && refreshToken) {
    const refreshed = await refreshSession(refreshToken);

    if (refreshed.ok) {
      const refreshedBody = (await refreshed.json()) as {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        user: { id: string };
      };

      applySessionCookiesToResponse(response, refreshedBody);
      user = refreshedBody.user;
    } else {
      clearSessionCookiesFromResponse(response);
    }
  }

  if (!user) {
    if (isStudioRoute || isPaidBriefRoute) {
      return buildRedirect(request, '/auth/sign-in', { next: pathname });
    }

    return response;
  }

  if (isPaidBriefRoute) {
    const paid = await isPaidSubscriber(user.id);

    if (!paid) {
      return buildRedirect(request, '/pricing', { paywall: pathname });
    }
  }

  return response;
}

export const config = {
  matcher: ['/studio/:path*', '/briefs/:path*/full']
};

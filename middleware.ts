import { NextRequest, NextResponse } from 'next/server';
import {
  applySessionCookiesToResponse,
  clearSessionCookiesFromResponse,
  getUserFromAccessToken,
  isAdminUser,
  isPaidSubscriber,
  readSessionTokens,
  refreshSession
} from '@/lib/supabase/auth';

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
  const isPaidBriefRoute = fullBriefRoute.test(pathname);
  const isEditorRoute = pathname.startsWith('/editor') || pathname.startsWith('/api/editor');

  if (!isPaidBriefRoute && !isEditorRoute) {
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
    if (isPaidBriefRoute || isEditorRoute) {
      return buildRedirect(request, '/auth/sign-in', { next: pathname });
    }

    return response;
  }

  if (isPaidBriefRoute) {
    const paid = await isPaidSubscriber(user.id);

    if (!paid) {
      return buildRedirect(request, '/briefs', { paywall: pathname });
    }
  }

  if (isEditorRoute) {
    const admin = await isAdminUser(user.id);

    if (!admin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/briefs/:path*/full', '/editor/:path*', '/api/editor/:path*']
};

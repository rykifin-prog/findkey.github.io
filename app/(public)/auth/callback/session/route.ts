import { NextRequest, NextResponse } from 'next/server';
import { applySessionCookiesToResponse } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };

  if (!body.access_token || !body.refresh_token || !body.expires_in) {
    return NextResponse.json({ error: 'Missing session tokens.' }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  applySessionCookiesToResponse(response, {
    access_token: body.access_token,
    refresh_token: body.refresh_token,
    expires_in: body.expires_in
  });

  return response;
}

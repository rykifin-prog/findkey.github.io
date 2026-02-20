import { NextResponse } from 'next/server';

import { assertAdminFromCookie, restSelect } from '@/lib/editor/db';

export async function GET(request: Request) {
  try {
    await assertAdminFromCookie();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const rows = await restSelect<Array<Record<string, unknown>>>(
      `ai_generations?select=id,status,output,citations,error,created_at&id=eq.${id}&limit=1`
    );

    if (!rows.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

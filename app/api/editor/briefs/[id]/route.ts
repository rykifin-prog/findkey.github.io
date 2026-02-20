import { NextResponse } from 'next/server';

import { assertAdminFromCookie, restSelect } from '@/lib/editor/db';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await assertAdminFromCookie();
    const rows = await restSelect<Array<Record<string, unknown>>>(
      `briefs?select=*&id=eq.${params.id}&limit=1`
    );

    if (!rows.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

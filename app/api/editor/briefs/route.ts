import { NextResponse } from 'next/server';

import { assertAdminFromCookie, restInsert, restSelect, restUpdate } from '@/lib/editor/db';

export async function GET() {
  try {
    await assertAdminFromCookie();
    const rows = await restSelect<Array<Record<string, unknown>>>(
      'briefs?select=*&order=updated_at.desc'
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await assertAdminFromCookie();
    const body = (await request.json()) as Record<string, unknown>;

    const isPublishing = body.status === 'published';
    const payload: Record<string, unknown> = {
      ...body,
      needs_review: isPublishing ? false : true,
      reviewed_at: isPublishing ? new Date().toISOString() : null,
      reviewed_by: isPublishing ? user.id : null
    };

    const [created] = await restInsert<Array<Record<string, unknown>>>('briefs', payload);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await assertAdminFromCookie();
    const body = (await request.json()) as Record<string, unknown>;
    const id = body.id as string | undefined;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const isPublishing = body.status === 'published';
    const payload: Record<string, unknown> = { ...body };

    if (isPublishing) {
      if (!body.reviewed) {
        return NextResponse.json({ error: 'Cannot publish before reviewed checkbox is checked.' }, { status: 422 });
      }

      payload.needs_review = false;
      payload.reviewed_at = new Date().toISOString();
      payload.reviewed_by = user.id;
    }

    delete payload.id;
    delete payload.reviewed;

    const rows = await restUpdate<Array<Record<string, unknown>>>(`briefs?id=eq.${id}`, payload);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

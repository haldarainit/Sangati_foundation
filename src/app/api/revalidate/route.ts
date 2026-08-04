import { NextResponse, type NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity calls this URL whenever the client publishes something, so the change
 * appears on the live site within a second or two instead of waiting for the
 * 60-second cache to expire.
 *
 * Set up in Sanity: Manage → API → Webhooks → Create webhook
 *   URL:     https://<your-domain>/api/revalidate
 *   Trigger: Create, Update, Delete
 *   Secret:  the same value as SANITY_REVALIDATE_SECRET
 *
 * The site works fine without this — it just updates a little slower.
 */

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request: missing _type' }, { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[revalidate] failed:', message);
    return NextResponse.json({ message }, { status: 500 });
  }
}

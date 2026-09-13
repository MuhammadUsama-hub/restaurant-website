import { NextResponse } from 'next/server';

// Frontend-only demo. No database connection or order-submission API.
export async function GET(request, { params }) {
  const { path = [] } = await params;
  if (path.length === 0 || (path.length === 1 && path[0] === 'health')) {
    return NextResponse.json({ status: 'ok', mode: 'frontend-demo', ordering: 'local-preview', database: 'not-connected' });
  }
  return NextResponse.json({ error: 'No backend is enabled for this demo.' }, { status: 404 });
}
import { NextRequest, NextResponse } from 'next/server';
import { cakes } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cake = cakes.find(c => c.id === parseInt(params.id));
  if (!cake) {
    return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
  }
  return NextResponse.json(cake);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const index = cakes.findIndex(c => c.id === parseInt(params.id));

  if (index === -1) {
    return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
  }

  cakes[index] = { ...cakes[index], ...data };
  return NextResponse.json(cakes[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = cakes.findIndex(c => c.id === parseInt(params.id));

  if (index === -1) {
    return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
  }

  const deleted = cakes.splice(index, 1);
  return NextResponse.json(deleted[0]);
}

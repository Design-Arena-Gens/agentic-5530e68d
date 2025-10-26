import { NextRequest, NextResponse } from 'next/server';
import { cakes } from '@/lib/data';

export async function GET() {
  return NextResponse.json(cakes);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newCake = {
    id: cakes.length > 0 ? Math.max(...cakes.map(c => c.id)) + 1 : 1,
    ...data,
  };
  cakes.push(newCake);
  return NextResponse.json(newCake);
}

import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/lib/data';

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const newOrder = {
    id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
    ...data,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return NextResponse.json(newOrder);
}

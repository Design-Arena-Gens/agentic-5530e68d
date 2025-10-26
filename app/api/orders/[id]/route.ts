import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = orders.find(o => o.id === parseInt(params.id));
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const index = orders.findIndex(o => o.id === parseInt(params.id));

  if (index === -1) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  orders[index] = { ...orders[index], ...data };
  return NextResponse.json(orders[index]);
}

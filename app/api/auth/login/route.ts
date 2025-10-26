import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/lib/data';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const { password: _, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
}

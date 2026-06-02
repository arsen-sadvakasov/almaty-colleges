import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const newsList = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(newsList);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

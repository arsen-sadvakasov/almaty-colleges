import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    const colleges = await prisma.college.findMany({
      where: search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
        ]
      } : undefined,
      include: {
        specialties: true
      },
      orderBy: {
        rating: 'desc'
      }
    });
    
    // Преобразуем данные в формат, который ожидает Frontend (по аналогии с MOCK_COLLEGES)
    const formattedColleges = colleges.map(c => ({
      ...c,
      specialties: c.specialties.map(s => s.name)
    }));

    return NextResponse.json(formattedColleges);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

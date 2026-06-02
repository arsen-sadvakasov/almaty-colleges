import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    const specialties = await prisma.specialty.findMany({
      where: search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
        ]
      } : undefined,
      include: {
        colleges: {
          select: { id: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    const formattedSpecialties = specialties.map(s => ({
      ...s,
      careerProspects: JSON.parse(s.careerProspects),
      skills: JSON.parse(s.skills),
      profileSubjects: JSON.parse(s.profileSubjects),
      colleges: s.colleges.map(c => c.id)
    }));

    return NextResponse.json(formattedSpecialties);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

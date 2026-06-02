import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: Prisma.SpecialtyWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [specialties, total] = await Promise.all([
      prisma.specialty.findMany({
        where,
        include: {
          colleges: {
            select: { id: true }
          }
        },
        orderBy: {
          name: 'asc'
        },
        skip,
        take: limit,
      }),
      prisma.specialty.count({ where })
    ]);
    
    const formattedSpecialties = specialties.map(s => ({
      ...s,
      careerProspects: JSON.parse(s.careerProspects),
      skills: JSON.parse(s.skills),
      profileSubjects: JSON.parse(s.profileSubjects),
      colleges: s.colleges.map(c => c.id)
    }));

    return NextResponse.json({
      data: formattedSpecialties,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

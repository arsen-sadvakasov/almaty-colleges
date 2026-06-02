import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const hasGrants = searchParams.get('hasGrants');
    const isState = searchParams.get('isState');
    const hasDormitory = searchParams.get('hasDormitory');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: Prisma.CollegeWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (city) where.city = city;
    if (hasGrants !== null) where.hasGrants = hasGrants === 'true';
    if (isState !== null) where.isState = isState === 'true';
    if (hasDormitory !== null) where.hasDormitory = hasDormitory === 'true';

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        include: {
          specialties: true
        },
        orderBy: {
          rating: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.college.count({ where })
    ]);
    
    // Преобразуем данные в формат, который ожидает Frontend
    const formattedColleges = colleges.map(c => ({
      ...c,
      specialties: c.specialties.map(s => s.name)
    }));

    return NextResponse.json({
      data: formattedColleges,
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

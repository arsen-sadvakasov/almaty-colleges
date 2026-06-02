import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        specialties: true
      }
    });

    if (!college) {
      return NextResponse.json({ error: 'Колледж не найден' }, { status: 404 });
    }

    const formattedCollege = {
      ...college,
      contacts: {
        phone: college.phone || '',
        email: college.email || '',
        address: college.address || '',
        website: college.website || undefined,
        instagram: college.instagram || undefined
      },
      specialties: college.specialties.map(s => s.name)
    };

    return NextResponse.json(formattedCollege);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

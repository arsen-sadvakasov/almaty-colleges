import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://almaty-colleges.kz';

  // Получаем динамические маршруты
  const colleges = await prisma.college.findMany({ select: { id: true, updatedAt: true } });
  const specialties = await prisma.specialty.findMany({ select: { id: true, updatedAt: true } });
  const news = await prisma.news.findMany({ select: { id: true, updatedAt: true } });

  const collegeUrls = colleges.map((college) => ({
    url: `${baseUrl}/colleges/${college.id}`,
    lastModified: college.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const specialtyUrls = specialties.map((specialty) => ({
    url: `${baseUrl}/specialties/${specialty.id}`,
    lastModified: specialty.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const newsUrls = news.map((item) => ({
    url: `${baseUrl}/news/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/specialties`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/applicant`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  return [...routes, ...collegeUrls, ...specialtyUrls, ...newsUrls];
}

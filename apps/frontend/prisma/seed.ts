import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { MOCK_COLLEGES, MOCK_SPECIALTIES, MOCK_NEWS } from '../src/lib/mock-data';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Начало сидирования базы данных...');

  // 1. Очистка базы данных (для предотвращения дубликатов при повторном запуске)
  await prisma.user.deleteMany();
  await prisma.college.deleteMany();
  await prisma.specialty.deleteMany();
  await prisma.news.deleteMany();

  // 2. Сидирование Специальностей
  const createdSpecialties = await Promise.all(
    MOCK_SPECIALTIES.map((spec) =>
      prisma.specialty.create({
        data: {
          id: spec.id,
          code: spec.code,
          name: spec.name,
          description: spec.description,
          studyDuration: spec.studyDuration,
          qualification: spec.qualification,
          careerProspects: JSON.stringify(spec.careerProspects),
          skills: JSON.stringify(spec.skills),
          profileSubjects: JSON.stringify(spec.profileSubjects),
        },
      })
    )
  );

  console.log(`Создано специальностей: ${createdSpecialties.length}`);

  // 3. Сидирование Колледжей
  for (const college of MOCK_COLLEGES) {
    await prisma.college.create({
      data: {
        id: college.id,
        name: college.name,
        city: college.city,
        isState: college.isState,
        hasDormitory: college.hasDormitory,
        hasGrants: college.hasGrants,
        studentsCount: college.studentsCount,
        rating: college.rating,
        imageUrl: college.imageUrl,
        history: college.history,
        description: college.description,
        dormitoryInfo: college.dormitoryInfo,
        tuitionFee: college.tuitionFee,
        admissionRules: college.admissionRules,
        phone: college.contacts?.phone,
        email: college.contacts?.email,
        address: college.contacts?.address,
        website: college.contacts?.website,
        instagram: college.contacts?.instagram,
        // Связываем колледжи со специальностями, которые есть в MOCK_SPECIALTIES
        specialties: {
          connect: college.specialties
            .map((specName) => {
              const spec = MOCK_SPECIALTIES.find((s) => s.name === specName);
              return spec ? { id: spec.id } : undefined;
            })
            .filter(Boolean) as { id: string }[],
        },
      },
    });
  }

  console.log(`Создано колледжей: ${MOCK_COLLEGES.length}`);

  // 4. Сидирование Новостей
  const createdNews = await Promise.all(
    MOCK_NEWS.map((news) =>
      prisma.news.create({
        data: {
          id: news.id.toString(),
          title: news.title,
          date: news.date,
          category: news.category,
          content: news.content,
        },
      })
    )
  );

  console.log(`Создано новостей: ${createdNews.length}`);

  console.log('Сидирование успешно завершено!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

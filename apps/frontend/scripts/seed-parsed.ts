import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const dataPath = path.join(__dirname, '../../parser/data/parsed_colleges.json');
  if (!fs.existsSync(dataPath)) {
    console.error(`Error: Data file not found at ${dataPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const colleges = JSON.parse(fileContent);

  console.log(`Loaded ${colleges.length} colleges from parsed data. Starting database import...`);

  let addedCount = 0;
  let errorCount = 0;

  // We will wipe existing colleges to prevent duplicates for this seed, 
  // or we can just check by name. Let's check by name.
  
  for (const college of colleges) {
    try {
      const existing = await prisma.college.findFirst({
        where: { name: college.name }
      });

      if (existing) {
        console.log(`Skipping existing college: ${college.name}`);
        continue;
      }

      console.log(`Adding college: ${college.name}`);
      
      const specialtiesData = college.specialties.map((spec: string) => {
        let code = 'Не указан';
        let name = spec;
        
        // Extract code if format is "09120100 - Лечебное дело"
        const match = spec.match(/^(\d+)\s*[-–—]\s*(.*)$/);
        if (match) {
          code = match[1];
          name = match[2];
        }

        return {
          code,
          name,
          description: name,
          studyDuration: 'По запросу',
          qualification: name,
          careerProspects: '[]',
          skills: '[]',
          profileSubjects: '[]'
        };
      });

      await prisma.college.create({
        data: {
          name: college.name,
          city: college.city,
          address: college.city,
          description: college.description,
          website: college.website,
          specialties: {
            create: specialtiesData
          }
        }
      });
      
      addedCount++;
    } catch (err) {
      console.error(`Failed to add college ${college.name}:`, err);
      errorCount++;
    }
  }

  console.log('=== IMPORT COMPLETE ===');
  console.log(`Successfully added: ${addedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total processed: ${colleges.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

interface ParsedCollege {
  name: string;
  city: string;
  description: string;
  website: string;
  specialties: string[];
}

const BASE_URL = 'https://www.vipusknik.kz';
// Both region URL and specific city URL (Almaty) to get all colleges
const TARGET_URLS = [
  'https://www.vipusknik.kz/institutions/colleges?region=almatinskaya-oblast',
  'https://www.vipusknik.kz/institutions/college?city_name=3'
];

async function getCollegeLinks(url: string): Promise<string[]> {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const links = new Set<string>();
    
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('/institutions/college/') && !href.includes('/institutions/colleges')) {
        links.add(href);
      }
    });
    
    return Array.from(links);
  } catch (err) {
    console.error(`Error fetching list from ${url}:`, err);
    return [];
  }
}

async function parseCollege(url: string): Promise<ParsedCollege | null> {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    
    const name = $('h1').first().text().trim() || $('title').text().trim();
    if (!name) return null;

    // A lot of fields are just inside paragraphs or divs. 
    // We try to grab the whole description block.
    // .institution-description is common, but let's grab general text if missing.
    let description = $('.institution-description').text().trim();
    if (!description) {
      // Fallback: take all text from the main article/body excluding script/style
      const content = $('.content-block, article, main').first().text().trim() || $('body').text().trim();
      description = content.substring(0, 1000).replace(/\s+/g, ' ').trim();
    }
    
    // Fallback logic for city
    let city = $('.institution-city').text().trim();
    if (!city) {
      if (url.includes('almaty')) city = 'Алматы';
      else city = 'Алматинская область';
    }

    const specialties: string[] = [];
    $('.specialty-item, .specialty-name, td:first-child').each((i, el) => {
      const spec = $(el).text().trim();
      if (spec && spec.length > 3 && !specialties.includes(spec)) {
        specialties.push(spec);
      }
    });

    return {
      name,
      city,
      description: description || 'Описание отсутствует.',
      website: url,
      specialties: specialties.slice(0, 15) // Limit to 15 specialties max
    };
  } catch (err) {
    console.error(`Error parsing college ${url}:`, err);
    return null;
  }
}

async function runParser() {
  console.log("=== STARTING COLLEGE PARSER ===");
  
  const allLinks = new Set<string>();
  
  for (const url of TARGET_URLS) {
    console.log(`Fetching list from: ${url}`);
    const links = await getCollegeLinks(url);
    links.forEach(link => {
      if (link.startsWith('http')) {
        allLinks.add(link);
      } else {
        allLinks.add(`${BASE_URL}${link}`);
      }
    });
  }
  
  console.log(`Found ${allLinks.size} unique college links. Beginning extraction...`);
  
  const results: ParsedCollege[] = [];
  let count = 0;
  
  for (const link of allLinks) {
    count++;
    console.log(`[${count}/${allLinks.size}] Parsing: ${link}`);
    const college = await parseCollege(link);
    if (college) {
      results.push(college);
    }
    // Rate limiting to prevent IP block
    await new Promise(r => setTimeout(r, 1000));
  }

  const outputPath = path.join(__dirname, 'data', 'parsed_colleges.json');
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n=== PARSING COMPLETE ===`);
  console.log(`Successfully parsed ${results.length} colleges.`);
  console.log(`Data saved to: ${outputPath}`);
}

runParser();

import axios from 'axios';
import * as cheerio from 'cheerio';

async function test() {
  try {
    const res = await axios.get('https://www.vipusknik.kz/institutions/college/esikskiy-medicinskiy-kolledzh-g-esik');
    const $ = cheerio.load(res.data);
    
    // Get title
    const name = $('h1').first().text().trim() || $('title').text().trim();
    
    // Check specific class or element for description
    const rawText = $('body').text();
    
    console.log("=== OUTPUT ===");
    console.log("Name:", name);
    console.log("Text length:", rawText.length);
    console.log("==============");

  } catch (err) {
    console.error(err);
  }
}

test();

import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function verify() {
  try {
    const count = await prisma.college.count();
    console.log(`✅ Connected. Found ${count} colleges.`);
  } catch (err) {
    console.error("❌ Connection failed:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();

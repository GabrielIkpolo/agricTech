import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to database...");
    const userCount = await prisma.user.count();
    console.log(`Successfully connected! Total users: ${userCount}`);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

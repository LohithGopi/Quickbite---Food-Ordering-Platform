import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updatePrices() {
  const foods = await prisma.food.findMany();
  for (const food of foods) {
    // If the price is under 50, it means it's still in USD format, so we multiply by 80.
    if (food.price < 50) {
      await prisma.food.update({
        where: { id: food.id },
        data: { price: Math.round(food.price * 80) }
      });
    }
  }
  console.log('Finished updating existing database foods to INR equivalent!');
}

updatePrices()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

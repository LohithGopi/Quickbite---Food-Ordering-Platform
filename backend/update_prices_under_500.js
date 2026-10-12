import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updatePrices() {
  const foods = await prisma.food.findMany();
  for (const food of foods) {
    // If the price is over 500, scale it down.
    if (food.price >= 500) {
      const newPrice = Math.round(food.price * 0.35);
      await prisma.food.update({
        where: { id: food.id },
        data: { price: newPrice }
      });
    }
  }
  console.log('Finished updating existing database foods to be under 500 INR!');
}

updatePrices()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const foods = [
    {
      name: 'Greek Salad',
      description: 'Fresh romaine lettuce, cucumbers, tomatoes, feta cheese, and kalamata olives.',
      price: 360,
      category: 'Salad',
      image: 'salad1.jpg'
    },
    {
      name: 'Spicy Veggie Roll',
      description: 'A spicy and flavorful vegetable roll with special sauce.',
      price: 240,
      category: 'Rolls',
      image: 'roll1.jpg'
    },
    {
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a gooey molten center.',
      price: 200,
      category: 'Deserts',
      image: 'desert1.jpg'
    },
    {
      name: 'Grilled Cheese Sandwich',
      description: 'Classic grilled cheese with a blend of cheddar and mozzarella.',
      price: 170,
      category: 'Sandwich',
      image: 'sandwich1.jpg'
    },
    {
      name: 'Red Velvet Cake',
      description: 'Moist red velvet cake layers with cream cheese frosting.',
      price: 220,
      category: 'Cake',
      image: 'cake1.jpg'
    },
    {
      name: 'Paneer Tikka Masala',
      description: 'Indian cottage cheese cooked in a spiced tomato gravy.',
      price: 420,
      category: 'Pure Veg',
      image: 'veg1.jpg'
    },
    {
      name: 'Penne Alfredo',
      description: 'Penne pasta tossed in a rich and creamy alfredo sauce.',
      price: 390,
      category: 'Pasta',
      image: 'pasta1.jpg'
    },
    {
      name: 'Hakka Noodles',
      description: 'Stir-fried noodles with crisp vegetables and savory soy sauce.',
      price: 340,
      category: 'Noodles',
      image: 'noodles1.jpg'
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine with croutons, parmesan, and Caesar dressing.',
      price: 310,
      category: 'Salad',
      image: 'salad2.jpg'
    },
    {
      name: 'Egg Roll',
      description: 'Crispy fried rolls filled with cabbage and carrots.',
      price: 140,
      category: 'Rolls',
      image: 'roll2.jpg'
    },
    {
      name: 'Cheesecake',
      description: 'New York style cheesecake with a graham cracker crust.',
      price: 180,
      category: 'Cake',
      image: 'cake2.jpg'
    },
    {
      name: 'Margarita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil.',
      price: 450,
      category: 'Pure Veg',
      image: 'veg2.jpg'
    }
  ];

  for (const food of foods) {
    await prisma.food.create({
      data: food,
    });
  }
  console.log('Seeded 12 food items!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

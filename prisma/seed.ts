import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
   
    const existingRedSea = await prisma.destination.findFirst({
        where: {
            name: 'Red Sea'
        }
    });

    if (existingRedSea) {
        // Create restaurants for Red Sea destination
        await prisma.restaurant.createMany({
            data: [
                {
                    name: 'Corallo Restaurant',
                    location: 'Red Sea',
                    destinationId: existingRedSea.id
                    
                },
                {
                    name: 'Beach Restaurant',
                    location: 'Red Sea',
                    destinationId: existingRedSea.id
                   
                },
                {
                    name: 'Aqua Restaurant',
                    location: 'Red Sea',
                    destinationId: existingRedSea.id
                    
                },
                {
                    name: 'El Sayadin Restaurant',
                    location: 'Red Sea',
                    destinationId: existingRedSea.id
                    
                },
                {
                    name: 'Felucca Seafood Restaurant & Bar',
                    location: 'Red Sea',
                    destinationId: existingRedSea.id
                   
                }
            ]
        });
    }



  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
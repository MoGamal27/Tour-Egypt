import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
   
    const existingAswan = await prisma.destination.findFirst({
        where: {
            name: 'Aswan'
        }
    });

    if (existingAswan) {
        // Create restaurants for Red Sea destination
        await prisma.tourGuide.createMany({
            data: [
                {
                    name: 'Ahmed Tarik',
                    email: 'ahmed.tarik@tourguide.com',
                    phoneNumber: '+201234567895',
                    password: 'hashedPassword123',
                    language: 'French English Arabic',
                    Experience: '10 years',
                    destinationId: existingAswan.id,
                    expertise: 'Nile Cruise & Temple Tours',
                    rating: 4.7
                },
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
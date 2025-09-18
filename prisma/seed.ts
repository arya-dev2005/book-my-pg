import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bookmypg.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@bookmypg.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Create sample college
  const college = await prisma.college.create({
    data: {
      name: 'Sample University',
      address: '123 University Street, City, State',
    },
  })

  // Create sample PG
  const pg = await prisma.pG.create({
    data: {
      name: 'Comfort PG',
      address: '456 PG Lane, City, State',
      price: 8000,
      facilities: ['WiFi', 'Laundry', 'Food', 'AC'],
      collegeId: college.id,
    },
  })

  console.log('Seeding completed', { admin, college, pg })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
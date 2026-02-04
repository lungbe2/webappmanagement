import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Create an admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  
  console.log('Created admin user:', admin.email)
  
  // Create some categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'UI/UX' },
      update: {},
      create: { name: 'UI/UX', description: 'User interface and experience improvements', color: '#FF6B6B' },
    }),
    prisma.category.upsert({
      where: { name: 'Functionality' },
      update: {},
      create: { name: 'Functionality', description: 'New features and functionality', color: '#4ECDC4' },
    }),
    prisma.category.upsert({
      where: { name: 'Performance' },
      update: {},
      create: { name: 'Performance', description: 'Performance optimizations', color: '#45B7D1' },
    }),
    prisma.category.upsert({
      where: { name: 'Security' },
      update: {},
      create: { name: 'Security', description: 'Security enhancements', color: '#96CEB4' },
    }),
  ])
  
  console.log(`Created ${categories.length} categories`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

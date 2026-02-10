import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  try {
    // Create admin user - use Admin@123 as password
    const adminPassword = await bcrypt.hash('Admin@123', 10)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: { password: adminPassword }, // Update password if exists
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    })
    console.log('✅ Admin user:', admin.email)

    // Create regular user - use johndoe123 as password
    const userPassword = await bcrypt.hash('johndoe123', 10)
    const user = await prisma.user.upsert({
      where: { email: 'john@doe.com' },
      update: { password: userPassword }, // Update password if exists
      create: {
        email: 'john@doe.com',
        name: 'John Doe',
        password: userPassword,
        role: 'USER',
      },
    })
    console.log('✅ Regular user:', user.email)

    // Create categories
    const categories = [
      { name: 'UI/UX', description: 'User interface and experience improvements', color: '#FF6B6B' },
      { name: 'Functionality', description: 'New features and functionality', color: '#4ECDC4' },
      { name: 'Performance', description: 'Performance optimizations', color: '#45B7D1' },
      { name: 'Security', description: 'Security enhancements', color: '#96CEB4' },
    ]

    for (const category of categories) {
      const cat = await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      })
      console.log(`✅ Category: ${cat.name}`)
    }

    console.log('🎉 Seeding completed successfully!')

  } catch (error: any) {
    console.error('❌ Error seeding database:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

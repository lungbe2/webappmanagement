const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
  try {
    console.log('Testing database connection...')
    
    // Try to count users
    const userCount = await prisma.user.count()
    console.log(`Found ${userCount} users in database`)
    
    // List all users
    const users = await prisma.user.findMany()
    console.log('Users:', users)
    
  } catch (error) {
    console.error('Database error:', error.message)
    
    // If table doesn't exist, we need to push schema
    if (error.code === 'P2021' || error.message.includes('does not exist')) {
      console.log('\nDatabase tables not found. You need to run:')
      console.log('npx prisma db push')
      console.log('npx prisma db seed')
    }
  } finally {
    await prisma.$disconnect()
  }
}

test()

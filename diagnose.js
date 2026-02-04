const fs = require('fs')
const path = require('path')

console.log('=== Prisma Diagnosis ===')

// Check .prisma/client
const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma', 'client')
console.log('1. Checking .prisma/client directory:')
if (fs.existsSync(prismaClientPath)) {
  const files = fs.readdirSync(prismaClientPath)
  console.log(`   Found ${files.length} files:`, files)
  
  // Check for query engine
  const hasQueryEngine = files.some(f => f.includes('query-engine'))
  console.log(`   Has query engine: ${hasQueryEngine}`)
  
  // Check schema.prisma
  const hasSchema = files.some(f => f === 'schema.prisma')
  console.log(`   Has schema.prisma: ${hasSchema}`)
} else {
  console.log('   ERROR: .prisma/client directory not found!')
}

// Check @prisma/client
const prismaPackagePath = path.join(__dirname, 'node_modules', '@prisma', 'client')
console.log('\n2. Checking @prisma/client package:')
if (fs.existsSync(prismaPackagePath)) {
  const files = fs.readdirSync(prismaPackagePath)
  console.log(`   Found ${files.length} files`)
  
  // Check index.js
  const indexPath = path.join(prismaPackagePath, 'index.js')
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8')
    console.log(`   index.js exists, first 200 chars:`)
    console.log('   ' + content.substring(0, 200).replace(/\n/g, '\n   '))
  }
}

console.log('\n=== End Diagnosis ===')

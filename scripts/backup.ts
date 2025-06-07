import { PrismaClient } from '../src/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function backupData() {
  try {
    console.log('Starting database backup...')
    
    // Fetch all data from each table
    const backup = {
      destinations: await prisma.destination.findMany({
        include: {
          attractions: true,
          restaurants: true,
          hotels: true,
          tourGuides: true,
          activities: true
        }
      }),
      tourists: await prisma.tourist.findMany(),
      categories: await prisma.category.findMany({
        include: {
          souvenirs: true
        }
      }),
      bookings: await prisma.booking.findMany(),
      reviews: await prisma.review.findMany(),
      timestamp: new Date().toISOString()
    }

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir)
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `tour-egypt-backup-${timestamp}.json`
    const filepath = path.join(backupDir, filename)

    // Write backup to file
    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2))
    
    console.log(`✅ Backup completed successfully!`)
    console.log(`📁 File saved to: ${filepath}`)
    console.log(`📊 Backup contains:`)
    console.log(`   - ${backup.destinations.length} destinations`)
    console.log(`   - ${backup.tourists.length} tourists`)
    console.log(`   - ${backup.categories.length} categories`)
    console.log(`   - ${backup.bookings.length} bookings`)
    console.log(`   - ${backup.reviews.length} reviews`)
    
  } catch (error) {
    console.error('❌ Backup failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

backupData()
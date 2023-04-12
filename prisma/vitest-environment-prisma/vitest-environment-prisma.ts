import 'dotenv/config'

import { randomUUID } from 'crypto'
import { PrismaClient } from '@prisma/client'
import { Environment } from 'vitest'
import { execSync } from 'child_process'

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please specify a DATABASE_URL')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const dbUrl = generateDataBaseUrl(schema)

    process.env.DATABASE_URL = dbUrl

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { FetchSnacksService } from '../fetch-snacks'

export function makeCreateSnackService() {
  const snacksRepository = new PrismaSnacksRepository()
  const service = new FetchSnacksService(snacksRepository)

  return service
}

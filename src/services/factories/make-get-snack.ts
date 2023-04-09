import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { GetSnackService } from '../get-snack'

export function makeGetSnackService() {
  const snacksRepository = new PrismaSnacksRepository()
  const service = new GetSnackService(snacksRepository)

  return service
}

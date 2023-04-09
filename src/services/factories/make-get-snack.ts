import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { GetSnackService } from '../get-snack'

export function makeCreateSnackService() {
  const snacksRepository = new PrismaSnacksRepository()
  const service = new GetSnackService(snacksRepository)

  return service
}

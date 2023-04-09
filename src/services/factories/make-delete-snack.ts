import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { DeleteSnackService } from '../delete-snack'

export function makeDeleteSnackService() {
  const snacksRepository = new PrismaSnacksRepository()
  const service = new DeleteSnackService(snacksRepository)

  return service
}

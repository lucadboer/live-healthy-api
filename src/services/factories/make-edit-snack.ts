import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { EditSnackService } from '../edit-snack'

export function makeCreateSnackService() {
  const snacksRepository = new PrismaSnacksRepository()
  const service = new EditSnackService(snacksRepository)

  return service
}

import { PrismaSnacksRepository } from '@/repositories/prisma/prisma-snacks-repository'
import { GetMetricsService } from '../get-metrics'

export function makeCreateSnackService() {
  const snacksRepository = new PrismaSnacksRepository()
  const service = new GetMetricsService(snacksRepository)

  return service
}

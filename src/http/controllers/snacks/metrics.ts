import { makeCreateSnackService } from '@/services/factories/make-create-snack'
import { makeFetchSnacksService } from '@/services/factories/make-fetch-snacks'
import { makeGetMetricsService } from '@/services/factories/make-get-metrics'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {

  const fetchSnacksParamsSchema = z.object({
    user_id: z.string().uuid(),
  })

  const { user_id } = fetchSnacksParamsSchema.parse(req.params)

try {
  const service = makeGetMetricsService()
  const { metrics } = await service.execute({userId: user_id})

  return reply.status(200).send({
    metrics: metrics
  })
} catch (error) {
  return reply.status(500).send({
    message: error
  })
}
}

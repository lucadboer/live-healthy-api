import { makeGetMetricsService } from '@/services/factories/make-get-metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const userId = req.user.sub

  try {
    const service = makeGetMetricsService()
    const { metrics } = await service.execute({userId})

    return reply.status(200).send({
      metrics: metrics
    })
  } catch (error) {
    return reply.status(500).send({
      message: error
    })
  }
}

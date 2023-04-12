import { makeGetSnackService } from '@/services/factories/make-get-snack'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getSnack(req: FastifyRequest, reply: FastifyReply) {

  const getSnackParamsSchema = z.object({
    snackId: z.string().uuid(),
  })

  const { snackId } = getSnackParamsSchema.parse(req.params)

try {
  const service = makeGetSnackService()
  const { snack } = await service.execute({
    snackId
  })

  return reply.status(200).send({
    snack: snack
  })
} catch (error) {
  return reply.status(500).send({
    message: error
  })
}
}

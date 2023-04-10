import { makeCreateSnackService } from '@/services/factories/make-create-snack'
import { makeDeleteSnackService } from '@/services/factories/make-delete-snack'
import { makeGetSnackService } from '@/services/factories/make-get-snack'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(req: FastifyRequest, reply: FastifyReply) {

  const removeSnackParamsSchema = z.object({
    snackId: z.string().uuid(),
  })

  const { snackId } = removeSnackParamsSchema.parse(req.params)

try {
  const service = makeDeleteSnackService()
  await service.execute({snackId})

  return reply.status(200).send()
} catch (error) {
  return reply.status(500).send({
    message: error
  })
}
}

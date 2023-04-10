import { makeCreateSnackService } from '@/services/factories/make-create-snack'
import { makeFetchSnacksService } from '@/services/factories/make-fetch-snacks'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(req: FastifyRequest, reply: FastifyReply) {

  const fetchSnacksParamsSchema = z.object({
    user_id: z.string().uuid(),
  })

  const { user_id } = fetchSnacksParamsSchema.parse(req.params)

try {
  const service = makeFetchSnacksService()
  const { snacks } = await service.execute({userId: user_id})

  return reply.status(200).send({
    snacks: snacks
  })
} catch (error) {
  return reply.status(500).send({
    message: error
  })
}
}

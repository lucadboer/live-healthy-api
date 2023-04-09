import { makeCreateSnackService } from '@/services/factories/make-create-snack'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {

  const createSnackParamsSchema = z.object({
    user_id: z.string().uuid(),
  })

  const createSnackBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    hour: z.string(),
    is_diet: z.boolean(),
  })

  const { user_id } = createSnackParamsSchema.parse(req.params)

  const { title, description, date, hour, is_diet } = createSnackBodySchema.parse(req.body)

  const service = makeCreateSnackService()
  await service.execute({
    id: randomUUID(), title, description: description, date, hour, is_diet, user_id,
  })

  return reply.status(201).send({
    message: 'User created successfully',
  })
}

import { makeCreateSnackService } from '@/services/factories/make-create-snack'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {

  const createSnackBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    date: z.string(),
    hour: z.string(),
    is_diet: z.boolean(),
  })

  const { title, description, date, hour, is_diet } = createSnackBodySchema.parse(req.body)

  try {
    const service = makeCreateSnackService()
    const { snack } = await service.execute({
      id: randomUUID(), 
      title, 
      description, 
      date, 
      hour, 
      is_diet, 
      user_id: req.user.sub,
    })

    return reply.status(201).send({
      snack: snack
    })

  } catch (error) {
    return reply.status(500).send({
      message: error
    })
  }
}

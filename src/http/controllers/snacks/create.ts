import { makeCreateUserService } from '@/services/factories/make-create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    date: z.date(),
    hour: z.string(),
    isDiet: z.boolean(),
  })

  const { title, description, date, hour, isDiet } = createBodySchema.parse(req.body)

  const service = makeCreateUserService()
  await service.execute({
    email,
    name,
    password,
  })

  return reply.status(201).send({
    message: 'User created successfully',
  })
}

import { makeCreateUserService } from '@/services/factories/make-create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(18),
  })

  const { email, name, password } = createBodySchema.parse(req.body)

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

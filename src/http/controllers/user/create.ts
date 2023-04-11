import { UserAlreadyExistError } from '@/services/errors/user-already-exist-error'
import { makeCreateUserService } from '@/services/factories/make-create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(18),
  })

  const { email, name, password } = createUserBodySchema.parse(req.body)

  try {
    const service = makeCreateUserService()
    await service.execute({
      name, email, password
    })
    
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send({
      message: error
    })
  }
  return reply.status(201).send({
    message: 'User created successfully',
  })
}

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateUserService } from '@/services/factories/make-authenticate-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(18),
  })

  const { email, password } = createUserBodySchema.parse(req.body)

  try {
    const service = makeAuthenticateUserService()
    
    const { user } = await service.execute({ email, password })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })

    return reply.status(200).send({
      token
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send({
      message: error
    })
  }
}

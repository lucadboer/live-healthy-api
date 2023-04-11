import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const { sub } = request.user

  const service = makeGetUserProfileService()

  const { user } = await service.execute({
    userId: sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
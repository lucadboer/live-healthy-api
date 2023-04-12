import { makeFetchSnacksService } from '@/services/factories/make-fetch-snacks'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(req: FastifyRequest, reply: FastifyReply) {

  const userId = req.user.sub

  try {
    const service = makeFetchSnacksService()
    const { snacks } = await service.execute({ userId })

    return reply.status(200).send({
      snacks: snacks
    })
  } catch (error) {
    return reply.status(500).send({
      message: error
    })
  }
}

import { FastifyInstance } from 'fastify'

export async function snackRouter(app: FastifyInstance) {
  app.post('/users', create)
}

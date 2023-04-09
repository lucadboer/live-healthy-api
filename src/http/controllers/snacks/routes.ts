import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function snackRouter(app: FastifyInstance) {
  app.post('/snacks/:user_id/create', create)
}

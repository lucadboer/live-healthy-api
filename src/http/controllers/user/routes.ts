import { authenticate } from './authenticate'
import { create } from './create'
import { FastifyInstance } from 'fastify'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create)

  app.get('/me', profile)

  app.post('/session', authenticate)
}

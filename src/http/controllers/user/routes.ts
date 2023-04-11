import { authenticate } from './authenticate'
import { create } from './create'
import { FastifyInstance } from 'fastify'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create)

  app.get('/me', {
    onRequest: [verifyJwt]
  } ,profile)

  app.post('/session', authenticate)
}

import { authenticate } from './authenticate'
import { create } from './create'
import { FastifyInstance } from 'fastify'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create)

  app.post('/session', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/me', {
    onRequest: [verifyJwt]
  } ,profile)

}

import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getSnack } from './getSnack'
import { remove } from './remove'
import { fetch } from './fetch'
import { metrics } from './metrics'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function snackRouter(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.post('/snacks/:user_id/create', create)

  app.get('/snacks/:user_id/fetch', fetch)
  app.get('/snacks/:snackId', getSnack)

  app.get('/snacks/:user_id/metrics', metrics)



  app.delete('/snacks/:snackId/delete', remove)
}

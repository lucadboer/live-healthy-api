import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { userRoutes } from './http/controllers/user/routes'
import { snackRouter } from './http/controllers/snacks/routes'

import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(snackRouter)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(409).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV !== 'dev') {
    console.error(error)
  }

  return reply.status(500).send({
    message: error,
  })
})

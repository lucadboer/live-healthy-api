import fastify from 'fastify'
import { userRoutes } from './http/controllers/user/routes'
import { snackRouter } from './http/controllers/snacks/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(userRoutes)
app.register(snackRouter)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(409).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }
  if (process.env.NODE_ENV !== 'dev') {
    console.error(error)
  }

  return reply.status(500).send({
    message: error,
  })
})

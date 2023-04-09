import fastify from 'fastify'
import { userRoutes } from './http/controllers/user/routes'
import { snackRouter } from './http/controllers/snacks/routes'

export const app = fastify()

app.register(userRoutes)
app.register(snackRouter)

import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('test12345', 6),
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'john.doe@gmail.com',
    password: 'test12345',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
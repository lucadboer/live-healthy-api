import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'

describe('Create User', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create user', async () => {

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: await hash('test12345', 6)
      }
    })

    const response = await request(app.server)
      .post(`/session`)
      .send({
        email: 'john@example.com',
        password: 'test12345',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
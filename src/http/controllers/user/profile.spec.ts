import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create User', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create user', async () => {

    const { token } = await createAndAuthenticateUser(app)

    const { email, name } = await prisma.user.findFirstOrThrow()

    const response = await request(app.server)
    .get(`/me`)
    .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.user).toEqual(expect.objectContaining({
      name: name,
      email: email,
    }))
  })
})

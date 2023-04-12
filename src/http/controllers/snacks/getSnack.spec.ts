import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { randomUUID } from 'crypto'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get Snack', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get snack', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const { id } = await prisma.snack.create({
      data: {
        id: randomUUID(),
        title: 'Test Snack',
        description: '',
        date: new Date(),
        hour: '12:00',
        is_diet: true,
        user_id: user.id
      }
    })

    const response = await request(app.server)
      .get(`/snacks/${id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.snack).toEqual(expect.objectContaining({
      title: 'Test Snack',
      hour: '12:00',
    }))
  })
})
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch Snacks', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch snacks', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    await prisma.snack.create({
      data: {
        title: 'Snack 1',
        description: '',
        date: new Date(),
        hour: '11:00',
        is_diet: true,
        user_id: user.id
      }
    })

    await prisma.snack.create({
      data: {
        title: 'Snack 2',
        description: '',
        date: new Date(),
        hour: '15:00',
        is_diet: false,
        user_id: user.id
      }
    })

    const response = await request(app.server)
      .get(`/snacks`)
      .set('Authorization', `Bearer ${token}`)


    expect(response.statusCode).toEqual(200)
    expect(response.body.snacks).toEqual([
      expect.objectContaining({
        title: 'Snack 1',
        is_diet: true,
      }),
      expect.objectContaining({
        title: 'Snack 2',
        is_diet: false,
      }),
    ])
  })
})
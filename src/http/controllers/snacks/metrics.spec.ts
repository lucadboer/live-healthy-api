import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/libs/prisma'

describe('Get user Metrics', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user metrics', async () => {
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
        is_diet: true,
        user_id: user.id
      }
    })

    await prisma.snack.create({
      data: {
        title: 'Snack 3',
        description: '',
        date: new Date(),
        hour: '15:00',
        is_diet: false,
        user_id: user.id
      }
    })

    const response = await request(app.server)
      .get(`/snacks/metrics`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.metrics).toEqual(expect.objectContaining({
      total: 3,
      positive: 2,
      negative: 1,
    }))
  })
})
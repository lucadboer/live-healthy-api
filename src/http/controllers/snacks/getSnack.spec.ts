import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { randomUUID } from 'crypto'

describe('Get Snack', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get snack', async () => {
    const {id} = await prisma.snack.create({
      data: {
        id: randomUUID(),
        title: 'Test Snack',
        description: '',
        date: new Date(),
        hour: '12:00',
        is_diet: true,
        user_id: 'd8a35bc7-38c4-49a3-9c7e-1037ca69889d'
      }
    })

    await request(app.server)
      .get(`/snacks/${id}`)
      .expect(200)
  })
})
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'

describe('Get Snack', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get snack', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password_hash: await hash('teste123', 6)
      }
    })

    const {id} = await prisma.snack.create({
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

    await request(app.server)
      .get(`/snacks/${id}`)
      .expect(200)
  })
})
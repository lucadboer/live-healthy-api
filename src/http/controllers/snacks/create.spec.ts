import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'

describe('Create Snack', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create snack', async () => {
    const {id} = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password_hash: await hash('teste123', 6)
      }
    })

    await request(app.server)
      .post(`/snacks/${id}/create`)
      .send({
        title: 'Test Snack',
        description: '',
        date: new Date(),
        hour: '12:00',
        is_diet: true,
      })
      .expect(201)
  })
})
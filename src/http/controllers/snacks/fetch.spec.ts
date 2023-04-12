import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'

describe('Fetch Snacks', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch snacks', async () => {
    const {id} = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        password_hash: await hash('teste123', 6)
      }
    })

    await request(app.server)
      .get(`/snacks/${id}/fetch`)
      .expect(200)
  })
})
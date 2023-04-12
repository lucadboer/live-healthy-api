import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/libs/prisma'
import { randomUUID } from 'crypto'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Delete Snack', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete snack', async () => {
    const {token} = await createAndAuthenticateUser(app)

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

    await request(app.server)
      .delete(`/snacks/${id}/delete`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })
})
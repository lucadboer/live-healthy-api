import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Snack', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create snack', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post(`/snack`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Snack',
        description: '',
        date: new Date(),
        hour: '12:00',
        is_diet: true,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.snack).toEqual(expect.objectContaining({
      title: 'Test Snack',
      is_diet: true,
    }))
  })
})
import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Snack', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create snack', async () => {
    const id = 'd8a35bc7-38c4-49a3-9c7e-1037ca69889d'

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
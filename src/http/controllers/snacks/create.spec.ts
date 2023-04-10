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
    const id = '4ba7b49e-78fa-4070-a846-5eec395d8686'

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
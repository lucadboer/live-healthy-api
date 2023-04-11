import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Fetch Snacks', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch snacks', async () => {
    const id = 'd8a35bc7-38c4-49a3-9c7e-1037ca69889d'

    await request(app.server)
      .get(`/snacks/${id}/fetch`)
      .expect(200)
  })
})
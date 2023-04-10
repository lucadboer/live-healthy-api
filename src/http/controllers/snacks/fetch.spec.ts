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
    const id = '4ba7b49e-78fa-4070-a846-5eec395d8686'

    await request(app.server)
      .get(`/snacks/${id}/fetch`)
      .expect(200)
  })
})
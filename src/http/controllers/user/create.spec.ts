import { afterAll, beforeAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create User', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create user', async () => {

    await request(app.server)
      .post(`/users`)
      .send({
        name: 'User test',
        email: 'test@example.com',
        password: 'test12345',
      })
      .expect(201)
  })
})
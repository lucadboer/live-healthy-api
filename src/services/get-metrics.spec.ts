import { InMemmorySnacksRepository } from '@/repositories/in-memmory/in-memmory-snack-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetMetricsService } from './get-metrics'

let snacksRepository: InMemmorySnacksRepository
let sut: GetMetricsService

describe('Create snack Service', async () => {
  beforeEach(() => {
    snacksRepository = new InMemmorySnacksRepository()

    sut = new GetMetricsService(snacksRepository)
  })

  it('should be able to get one snack', async () => {
    const userId = 'user-01'

    for (let i = 0; i <= 12; i++) {
      await snacksRepository.create({
        id: `snack-${i}`,
        title: 'Rice and Beans',
        description: '',
        date: new Date(),
        hours: '12:00',
        isDiet: i % 2 === 0 ? true : false,
        userId,
      })
    }

    const { metrics } = await sut.execute({ userId })    

    expect(metrics).toEqual({
      total: 13,
      positive: 7,
      negative: 6,
    })
    
  })
})

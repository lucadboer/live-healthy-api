import { Metrics } from '@/DTO/metrics'
import { SnackRepository } from '@/repositories/snacks-repository'

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  metrics: Metrics
}

export class GetMetricsService {
  constructor(private snacksRepository: SnackRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const metrics = await this.snacksRepository.getUserMetrics(userId)

    return {
      metrics,
    }
  }
}

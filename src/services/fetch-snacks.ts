import { Snack } from '@/DTO/Snack'
import { SnackRepository } from '@/repositories/snacks-repository'

interface FetchSnacksRequest {
  userId: string
}

interface FetchSnacksResponse {
  snacks: Snack[]
}

export class FetchSnacksService {
  constructor(private snacksRepository: SnackRepository) {}

  async execute({ userId }: FetchSnacksRequest): Promise<FetchSnacksResponse> {
    const snacks = await this.snacksRepository.findManyByUserId(userId)

    return {
      snacks,
    }
  }
}

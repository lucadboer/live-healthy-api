import { Snack } from '@/DTO/Snack'
import { SnackRepository } from '@/repositories/snacks-repository'

interface GetSnackRequest {
  snackId: string
}

interface GetSnackResponse {
  snack: Snack
}

export class GetSnackService {
  constructor(private snacksRepository: SnackRepository) {}

  async execute({ snackId }: GetSnackRequest): Promise<GetSnackResponse> {
    const snack = await this.snacksRepository.findById(snackId)

    return {
      snack,
    }
  }
}

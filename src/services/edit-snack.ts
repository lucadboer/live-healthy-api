import { Snack } from '@/DTO/Snack'
import { SnackRepository } from '@/repositories/snacks-repository'

interface EditSnackRequest extends Snack {}

interface EditSnackResponse {
  snack: Snack
}

export class EditSnackService {
  constructor(private snacksRepository: SnackRepository) {}

  async execute(data: EditSnackRequest): Promise<EditSnackResponse> {
    const snack = await this.snacksRepository.edit(data)

    return {
      snack,
    }
  }
}

import { SnackRepository } from '@/repositories/snacks-repository'


interface DeleteSnackRequest {
  snackId: string
}

export class DeleteSnackService {
  constructor(private snacksRepository: SnackRepository) {}

  async execute({ snackId }: DeleteSnackRequest) {
    await this.snacksRepository.delete(snackId)
  }
}

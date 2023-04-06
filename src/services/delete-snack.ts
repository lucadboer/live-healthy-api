import { SnackRepository } from '@/repositories/snacks-repository'

export class DeleteSnackService {
  constructor(private snacksRepository: SnackRepository) {}

  async execute(snackId: string) {
    await this.snacksRepository.delete(snackId)
  }
}

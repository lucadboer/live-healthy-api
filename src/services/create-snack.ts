import { UsersRepository } from '@/repositories/users-repository'
import { Snack } from '@/DTO/Snack'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'
import { SnackRepository } from '@/repositories/snacks-repository'

interface CreateSnackRequest extends Snack {
  userEmail: string
}

interface CreateSnackResponse {
  snack: Snack
}

export class CreateSnackService {
  constructor(
    private snacksRepository: SnackRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    title,
    description,
    date,
    hours,
    isDiet,
    userEmail,
  }: CreateSnackRequest): Promise<CreateSnackResponse> {
    const user = await this.usersRepository.findByEmail(userEmail)

    if (!user) {
      throw new ResourcesNotFoundError()
    }

    const snack = await this.snacksRepository.create({
      id,
      title,
      description,
      date,
      hours,
      isDiet,
    })

    return {
      snack,
    }
  }
}
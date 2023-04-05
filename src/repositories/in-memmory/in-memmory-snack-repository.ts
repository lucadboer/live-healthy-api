import { Snack } from '@/DTO/Snack'
import { SnackRepository } from '../snacks-repository'

export class InMemmorySnacksRepository implements SnackRepository {
  public items: Snack[] = []

  async create(data: Snack) {
    const snack = {
      title: data.title,
      description: data.description,
      date: data.date,
      hours: data.hours,
      isDiet: data.isDiet,
    }

    this.items.push(snack)

    return snack
  }
}

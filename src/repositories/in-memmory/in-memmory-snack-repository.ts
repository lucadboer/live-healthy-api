import { Snack } from '@/DTO/Snack'
import { SnackRepository } from '../snacks-repository'
import { ResourcesNotFoundError } from '@/services/errors/resources-not-found-error'

export class InMemmorySnacksRepository implements SnackRepository {
  public items: Snack[] = []

  async delete(snackId: string) {
    console.log(this.items)

    this.items = this.items.filter((snack) => snack.id !== snackId)

    console.log(this.items)
  }

  async edit(data: Snack) {
    const { date, description, hours, isDiet, title, id } = data

    const snack = this.items.find((item) => id === item.id)

    if (!snack) {
      throw new ResourcesNotFoundError()
    }

    snack.date = date
    snack.description = description
    snack.hours = hours
    snack.isDiet = isDiet
    snack.title = title

    return snack
  }

  async findById(snackId: string) {
    const snack = this.items.find((item) => item.id === snackId)

    if (!snack) {
      throw new ResourcesNotFoundError()
    }

    return snack
  }

  async create(data: Snack) {
    const snack = {
      id: data.id,
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
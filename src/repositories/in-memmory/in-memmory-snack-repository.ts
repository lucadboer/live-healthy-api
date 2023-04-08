import { Snack } from '@/DTO/Snack'
import { SnackRepository } from '../snacks-repository'
import { ResourcesNotFoundError } from '@/services/errors/resources-not-found-error'
import { Metrics } from '@/DTO/Metrics'

export class InMemmorySnacksRepository implements SnackRepository {
  public items: Snack[] = []

  async getUserMetrics(userId: string) {
    const snacks = this.items.filter((item) => item.user_id === userId)

    const metrics: Metrics = {
      total: snacks.length,
      positive: snacks.filter((item) => item.is_diet).length,
      negative: snacks.filter((item) => !item.is_diet).length,
    }

    return metrics
  }

  async findManyByUserId(userEmail: string) {
    const snacks = this.items.filter((item) => item.user_id === userEmail)

    return snacks
  }

  async delete(snackId: string) {
    this.items = this.items.filter((snack) => snack.id !== snackId)
  }

  async edit(data: Snack) {
    const { date, description, hour, is_diet, title, id } = data

    const snack = this.items.find((item) => id === item.id)

    if (!snack) {
      throw new ResourcesNotFoundError()
    }

    snack.date = date
    snack.description = description
    snack.hour = hour
    snack.is_diet = is_diet
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
      hour: data.hour,
      is_diet: data.is_diet,
      user_id: data.user_id,
    }

    this.items.push(snack)

    return snack
  }
}

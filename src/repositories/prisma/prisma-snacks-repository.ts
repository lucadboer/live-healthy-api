import { prisma } from '@/libs/prisma'
import { SnackRepository } from '../snacks-repository'
import { Metrics } from '@/DTO/Metrics'
import { Snack } from '@/DTO/Snack'

export class PrismaSnacksRepository implements SnackRepository {
  async create(data: Snack): Promise<Snack> {
    const snack = await prisma.snack.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        hour: data.hour,
        is_diet: data.is_diet,
        user_id: data.user_id,
      }
    })

    return snack
  }
  async delete(snackId: string): Promise<void> {
    await prisma.snack.delete({
      where: { id: snackId }
    })
  }

  async edit(data: Snack): Promise<Snack> {
    const snack = await prisma.snack.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        hour: data.hour,
        is_diet: data.is_diet,
      }
    })

    return snack
  }
  async findById(snackId: string): Promise<Snack> {
    const snack = await prisma.snack.findUniqueOrThrow({
      where: { id: snackId }
    })

    return snack
  }
  async findManyByUserId(userId: string): Promise<Snack[]> {
    const snacks = await prisma.snack.findMany({
      where: {
        user_id: userId
      }
    })

    return snacks
  }
  async getUserMetrics(userId: string): Promise<Metrics> {
    const snacks = await prisma.snack.findMany({
      where: {
        user_id: userId,
      }
    })

    const metrics: Metrics = {
      total: snacks.length,
      positive: snacks.filter((item) => item.is_diet).length,
      negative: snacks.filter((item) => !item.is_diet).length,
    }

    return metrics
  }
}

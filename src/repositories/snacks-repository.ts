import { Metrics } from '@/DTO/Metrics'
import { Snack } from '@/DTO/Snack'

export interface SnackRepository {
  create(snack: Snack): Promise<Snack>
  delete(snackId: string): Promise<void>
  edit(data: Snack): Promise<Snack>
  findById(snackId: string): Promise<Snack>
  findManyByUserId(userId: string): Promise<Snack[]>
  getUserMetrics(userId: string): Promise<Metrics>
}

import { Snack } from '@/DTO/Snack'

export interface SnackRepository {
  create(snack: Snack): Promise<Snack>
  findById(snackId: string): Promise<Snack | null>
  editSnack(data: Snack): Promise<Snack>
}

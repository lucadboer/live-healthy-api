import { Snack } from '@/DTO/Snack'

export interface SnackRepository {
  create(snack: Snack): Promise<Snack>
}

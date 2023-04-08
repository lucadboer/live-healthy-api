export interface Snack {
  id: string
  title: string
  description: string | null
  date: Date
  hour: string
  is_diet: boolean
  user_id: string
}

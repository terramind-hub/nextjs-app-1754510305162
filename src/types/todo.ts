export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export type TodoFilter = 'all' | 'active' | 'completed'

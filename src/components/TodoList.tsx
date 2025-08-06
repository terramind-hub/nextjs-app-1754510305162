'use client'

import TodoItem from './TodoItem'
import { Todo } from '@/types/todo'

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return null
  }

  // Sort todos: incomplete first, then completed
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.createdAt.getTime() - a.createdAt.getTime() // Newest first within each group
    }
    return a.completed ? 1 : -1 // Incomplete first
  })

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Your Tasks ({todos.length})
      </h2>
      
      <div className="space-y-2">
        {sortedTodos.map((todo, index) => (
          <div 
            key={todo.id} 
            className="animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TodoItem
              todo={todo}
              onToggle={() => onToggleTodo(todo.id)}
              onDelete={() => onDeleteTodo(todo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

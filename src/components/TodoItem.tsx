'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 150))
    onDelete()
  }

  return (
    <div 
      className={`todo-item group ${todo.completed ? 'todo-completed' : ''} ${
        isDeleting ? 'opacity-50 scale-95' : ''
      } transition-all duration-200`}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed 
              ? 'bg-primary-500 border-primary-500' 
              : 'border-gray-300 hover:border-primary-400'
          }`}>
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </label>

        {/* Todo text */}
        <div className="flex-1 min-w-0">
          <p className={`text-gray-800 break-words ${
            todo.completed ? 'text-strikethrough text-gray-500' : ''
          } transition-all duration-200`}>
            {todo.text}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {todo.createdAt.toLocaleDateString()} at {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn-danger opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm disabled:opacity-50"
          title="Delete todo"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.5 1.5a1 1 0 01-1.414 1.414L15 14.914V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.086l-1.086 1.086a1 1 0 11-1.414-1.414L4 11.5V5zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

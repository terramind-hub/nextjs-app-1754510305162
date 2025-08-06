'use client'

import { useState } from 'react'

interface TodoFormProps {
  onAddTodo: (text: string) => void
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedValue = inputValue.trim()
    if (!trimmedValue) return
    
    setIsSubmitting(true)
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 100))
    
    onAddTodo(trimmedValue)
    setInputValue('')
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="input-field flex-1"
          disabled={isSubmitting}
          maxLength={200}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'Add'
          )}
        </button>
      </div>
      
      {inputValue.length > 180 && (
        <p className="text-sm text-amber-600 mt-2">
          {200 - inputValue.length} characters remaining
        </p>
      )}
    </form>
  )
}

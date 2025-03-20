'use client'

import { useState } from 'react'
import { Todo } from '../types/todo'
import TodoItem from './TodoItem'

type Props = {
  todos: Todo[]
}

export default function TodoFilter({ todos }: Props) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          すべて
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          未完了
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          完了済み
        </button>
      </div>
      <ul className="space-y-4">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
} 
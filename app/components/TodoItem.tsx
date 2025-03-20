'use client'

import { useRouter } from 'next/navigation'
import { Todo } from '../types/todo'
import { deleteTodo, toggleTodo } from '../actions/todo'

type Props = {
  todo: Todo
}

export default function TodoItem({ todo }: Props) {
  const router = useRouter()

  async function handleToggle() {
    await toggleTodo(todo.id)
    router.refresh()
  }

  async function handleDelete() {
    await deleteTodo(todo.id)
    router.refresh()
  }

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-4 h-4"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.title}
        </span>
      </div>
      <span className="text-sm text-gray-500">
        {todo.createdAt}
      </span>
      <button onClick={handleDelete}>削除</button>
    </li>
  )
} 
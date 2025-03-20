'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { createTodo } from '../actions/todo'

export default function AddTodoForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string
    if (!title.trim()) return

    await createTodo(title)
    router.refresh()
    formRef.current?.reset()
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex gap-2 mt-4"
    >
      <input
        type="text"
        name="title"
        placeholder="新しいTodoを追加"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        追加
      </button>
    </form>
  )
} 
'use client'

import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import AuthButton from './components/AuthButton'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Todo リスト</h1>
        <AuthButton />
      </div>
      {session ? (
        <>
          <AddTodoForm />
          <div className="mt-8">
            <TodoList />
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p>ログインしてTodoリストを管理しましょう</p>
        </div>
      )}
    </main>
  )
} 

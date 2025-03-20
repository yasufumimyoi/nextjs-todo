import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Todo リスト</h1>
      <TodoList />
      <AddTodoForm />
    </main>
  )
} 

import { getTodos } from '../actions/todo'
import TodoFilter from './TodoFilter'

export default async function TodoList() {
  const { todos, error } = await getTodos()

  if (error) {
    return <div>エラーが発生しました: {error}</div>
  }

  if (!todos || todos.length === 0) {
    return <div>Todoがありません</div>
  }

  const formattedTodos = todos.map(todo => ({
    ...todo,
    createdAt: new Date(todo.createdAt).toLocaleString(),
    updatedAt: new Date(todo.updatedAt).toLocaleString()
  }))

  return <TodoFilter todos={formattedTodos} />
} 
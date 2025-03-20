'use server'

import { prisma } from '@/lib/prisma'

export async function getTodos() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { todos }
  } catch (error) {
    return { error: 'Failed to fetch todos' }
  }
}

export async function createTodo(title: string) {
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
      }
    })
    return { todo }
  } catch (error) {
    return { error: 'Failed to create todo' }
  }
} 

export async function toggleTodo(id: number) {
  try {
    const currentTodo = await prisma.todo.findUnique({
      where: { id }
    })

    if (!currentTodo) {
      return { error: 'Todo not found' }
    }
    
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        completed: !currentTodo.completed,
      }
    })
    return { todo }
  } catch (error) {
    return { error: 'Failed to update todo' }
  }
} 

export async function deleteTodo(id: number) {
  try {
    await prisma.todo.delete({
      where: { id }
    })
  } catch (error) {
    return { error: 'Failed to delete todo' }
  }
}

export async function getCheckedTodos() {
  try {
    const todos = await prisma.todo.findMany({where: {completed: true }, orderBy: {createdAt: 'desc'}})
    return { todos }
  } catch (error) {
    return { error: 'Failed to fetch checked todos' }
  }
}


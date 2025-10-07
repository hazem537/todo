import prisma from '~~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { id: 'desc' }
    })
    return todos
  } catch (error) {
    console.error('Failed to fetch todos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch todos'
    })
  }
})
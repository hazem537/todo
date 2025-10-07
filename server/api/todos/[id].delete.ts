import prisma from '~~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid todo ID'
      })
    }

    await prisma.todo.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to delete todo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete todo'
    })
  }
})

import prisma from '~~/server/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid todo ID'
      })
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        text: body.text?.trim(),
        done: body.done
      }
    })

    return todo
  } catch (error) {
    console.error('Failed to update todo:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update todo'
    })
  }
})

import prisma from '~~/server/lib/prisma'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const todo = await prisma.todo.create({data:body})
  return todo
})
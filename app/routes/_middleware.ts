import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

import { createRoute } from 'honox/factory'

export default createRoute(async (c, next) => {
  if (!c.get('prisma')) {
    const adapter = new PrismaD1(c.env.DB)
    const prisma = new PrismaClient({ adapter })
    c.set('prisma', prisma)
  }
  await next()
})

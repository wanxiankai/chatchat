import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

// 创建Prisma实例
const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// 创建带有用户上下文的Prisma助手函数
export async function getUserPrisma() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('未认证的用户')
  }

  return {
    prisma,
    userId
  }
}
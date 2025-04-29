import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// 创建Prisma实例
const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// 创建带有用户上下文的Prisma助手函数
export async function getUserPrisma() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    throw new Error('未认证的用户')
  }

  return {
    prisma,
    userId: session.user.id
  }
}
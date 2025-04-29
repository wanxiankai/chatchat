import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * 扩展默认的 Session 类型，添加 user.id 字段
   */
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
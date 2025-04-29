// filepath: /Users/kw/workspace/personal/chatchat/lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// You might need to adjust the PrismaClient instantiation if it's handled differently globally
// For simplicity, let's instantiate it here if not already available globally in this context.
// Consider centralizing PrismaClient instantiation if needed.
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 登录成功后，始终重定向到 / 路由
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      }
      // 处理来自外部链接的重定向
      else if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      return url;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
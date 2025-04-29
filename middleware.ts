import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 使用 NextAuth 中间件保护路由
export default withAuth(
  function middleware(req) {
    // 添加服务器端安全标头
    const response = NextResponse.next();
    
    // 设置安全标头
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self' https:; connect-src 'self' https:;"
    );
    
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

// 配置需要保护的路由
export const config = {
  matcher: [
    // 所有聊天页面需要认证
    "/chat/:path*",
    // 所有API路由需要认证，除了登录认证API
    "/api/:path*",
    "/((?!sign-in|api/auth).*)",
  ],
};
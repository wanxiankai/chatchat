# ChatChat

# Introduction
ChatChat is a ai-chat application built with Next.js, Tailwind CSS, Clerk, Prisma and Supabase. It is designed to be a learning project, inspired by ChatGPT. Now it is supported by Gemini AI and Grok AI. It is a full-stack application that allows users to sign up, log in and chat with AI.

# Features
- Account Management
- Chat with Gemini AI or Grok AI
- Chat history
- Chat Management


# Technology Stack
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Clerk](https://clerk.dev/docs)
- [Prisma](https://www.prisma.io/docs)
- [Supabase](https://supabase.com/docs)

# Getting Started
## 1. Clone the repository
```bash
git clone git@github.com:wanxiankai/chatgpt-app-clone.git
```

## 2. Install dependencies
```bash
cd chatgpt-app-clone
pnpm install
```

## 3. Set up environment variables
Create a `.env` file in the root directory and add the following environment variables:
```bash
DATABASE_URL= # PostgreSQL connection string

SUPABASE_URL= # Supabase URL
SUPABASE_ANON_KEY= # Supabase Anon Key

NEXT_PUBLIC_BASE_URL= # Your base URL (e.g. http://localhost:3000)

GOOGLE_API_KEY= # Google API Key
GROK_API_KEY= # Grok API Key
GROK_BASE_URL= # Grok Base URL

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= # Your Clerk Publishable Key
CLERK_SECRET_KEY= # Your Clerk Secret Key

NEXT_PUBLIC_CLERK_SIGN_IN_URL= # Your Clerk Sign In URL (in this project, it is /sign-in)
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL= # Your Clerk Sign In Fallback Redirect URL (in this project, it is /)
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL= # Your Clerk Sign Up Fallback Redirect URL (in this project, it is /)

```

## 4. Set up Clerk
- Sign up for a [Clerk](https://clerk.dev/) account.
- Create a new application in the Clerk dashboard.
- Add the environment variables from the Clerk dashboard to your `.env` file.

## 5. Set up Supabase
- Sign up for a [Supabase](https://supabase.com/) account.
- Create a new project in the Supabase dashboard.
- Create a new PostgreSQL database in the Supabase dashboard.
- Add the environment variables from the Supabase dashboard to your `.env` file.

## 6. Set up Prisma
- Install the Prisma CLI:
```bash
pnpm add -D prisma
```
- Run the following command to generate the Prisma client:
```bash
pnpx prisma generate
```

## 7. Run the project
```bash
pnpm dev
```
Open your browser and go to `http://localhost:3000` to see the application in action.












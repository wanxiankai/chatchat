# ChatChat

# Introduction
ChatChat is a ai-chat application built with Next.js, Tailwind CSS, NextAuth, Prisma and Supabase. It is designed to be a learning project, inspired by ChatGPT. Now it is supported by Gemini AI and Grok AI. It is a full-stack application that allows users to sign up, log in and chat with AI.

# Features
- Account Management
- Free chat with Gemini AI or Grok AI
- Chat history
- Chat Management


# Technology Stack
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Prisma](https://www.prisma.io/docs)
- [Supabase](https://supabase.com/docs)

# Getting Started
## 1. Clone the repository
```bash
git clone git@github.com:wanxiankai/chatchat.git
```

## 2. Install dependencies
```bash
cd chatgpt-app-clone
pnpm install
```

## 3. Set up environment variables
Create a `.env` file in the root directory and add the following environment variables:
```bash

NEXTAUTH_URL= # Your NextAuth URL (e.g. http://localhost:3000)
NEXTAUTH_SECRET= # Your NextAuth secret
GITHUB_CLIENT_ID= # Your GitHub Client ID
GITHUB_CLIENT_SECRET= # Your GitHub Client Secret

DATABASE_URL= # PostgreSQL connection string

SUPABASE_URL= # Supabase URL
SUPABASE_ANON_KEY= # Supabase Anon Key
SUPABASE_SERVICE_ROLE_KEY= # Supabase Service Role Key

NEXT_PUBLIC_BASE_URL= # Your base URL (e.g. http://localhost:3000)

GOOGLE_API_KEY= # Google API Key
GROK_API_KEY= # Grok API Key
GROK_BASE_URL= # Grok Base URL


```

## 4. Set up NextAuth
- Go to the [NextAuth.js documentation](https://next-auth.js.org/getting-started/introduction) and follow the instructions to set up NextAuth.
- Create a new GitHub OAuth application in the [GitHub Developer settings](https://github.com/settings/developers).
- Add the following callback URL to your GitHub OAuth application: 
```
http://localhost:3000/api/auth/callback/github
```


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












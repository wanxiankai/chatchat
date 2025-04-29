'use client'
import { useAppContext } from '@/components/AppContext'
import AuthFooter from '@/components/common/AuthFooter'
import Logo from '@/components/common/Logo'
import TypingCarousel from '@/components/common/TypingCarousel'
import VideoBackground from '@/components/common/VideoBackground'
import { ActionType } from '@/reducers/AppReducer'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Page() {
  const { dispatch } = useAppContext()
  const [isSigningIn, setIsSigningIn] = useState(false);
  const clearStore = () => {
    dispatch({ type: ActionType.UPDATE, field: 'messageList', value: [] })
    dispatch({ type: ActionType.UPDATE, field: 'selectedChat', value: undefined })
    dispatch({ type: ActionType.UPDATE, field: 'streamingId', value: '' })
  }

  useEffect(() => {
    clearStore();
  }, [])

  useEffect(() => {
    clearStore();
    // Reset signing in state if component re-mounts (e.g., navigation back)
    setIsSigningIn(false);
  }, [])

  return (
    <div className="flex h-screen">
      <Logo />
      <div className="w-3/4 relative overflow-hidden bg-[#f2f2f2] backdrop-blur">
        <VideoBackground />
        <div className="absolute inset-0 flex flex-col justify-center pl-8">
          <div className='h-full flex flex-col justify-center'>
            <p className='text-6xl font-bold bg-gradient-to-r from-pink-500 via-[#F78C2A] to-[#fed9b6] bg-clip-text text-transparent'>The AI Chat App from Kevin Wan</p>
            <TypingCarousel />
          </div>
        </div>
      </div>
      <div className="w-1/4 min-w-[425px] flex flex-col items-center justify-between bg-[#F9F9F999]">
        <div className='flex-1' />
        <h2 className="text-3xl font-semibold mb-5 text-center text-[#333]">Get Started</h2>

        <div className="flex flex-col w-full max-w-xs gap-4 px-6">
          <button
            onClick={() => {
              setIsSigningIn(true); // Disable button immediately
              signIn('github', { callbackUrl: '/' });
            }}
            disabled={isSigningIn}
            className="flex items-center justify-center gap-3 px-4 py-3 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
          >
            {/* ... SVG icon ... */}
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
            </svg>
            {isSigningIn ? '正在登录...' : '使用 GitHub 登录'}
          </button>

          {/* <button 
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex items-center justify-center gap-3 px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            使用 Google 登录
          </button> */}
        </div>

        <AuthFooter />
      </div>
    </div>
  )
}
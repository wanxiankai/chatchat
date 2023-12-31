"use client"
import { useAppContext } from '@/components/AppContext'
import Main from '@/components/home/Main'
import Navigation from '@/components/home/Navigation'

export default function Home() {
  const { state: { themeMode } } = useAppContext();
  return (
    <div className={`${themeMode} h-full flex`}>
      <Navigation />
      <Main />
    </div>
  )
}

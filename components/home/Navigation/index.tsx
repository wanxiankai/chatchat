"use client"
import { useAppContext } from '@/components/AppContext'
import MenuBar from './MenuBar'

export default function Navigation() {
    const { state: { displayNavigation } } = useAppContext()
    console.log('Navigation render')
    return (
        <nav className="h-full w-[260px] bg-gray-900 text-gray-300 p-2">
            <MenuBar />
        </nav>)
}
"use client"
import { useAppContext } from "@/components/AppContext";
import ChatInput from "./ChatInput";
import Menu from "./Menu";
import MessageList from "./MessageList";
import Welcome from "./Welcome";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Main() {
  const { state: { selectedChat, messageList } } = useAppContext()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击页面其他区域关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-1 relative">
      {!selectedChat && messageList.length === 0 && (
        <header className=" absolute top-1 right-1 flex justify-end items-center p-4 gap-4 h-16">
          {status === "unauthenticated" && (
            <>
              <button
                onClick={() => router.push('/sign-in')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                登录
              </button>
              <button
                onClick={() => router.push('/sign-in')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                注册
              </button>
            </>
          )}
          {status === "authenticated" && session?.user && (
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center focus:outline-none"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "用户头像"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                  </div>
                )}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      {session.user.email}
                    </div>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        signOut({ callbackUrl: '/sign-in' });
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      退出登录
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </header>
      )}
      <main
        className="overflow-y-auto w-full h-full bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      >
        <Menu />
        {!selectedChat && messageList.length === 0 && <Welcome />}
        <MessageList />
        <ChatInput />
      </main>
    </div>
  )
}

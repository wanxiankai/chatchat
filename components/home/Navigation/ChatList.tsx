"use client"
import { Chat } from "@/types/chat"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md"
import { PiChatBold, PiTrashBold } from 'react-icons/pi'

const defaultListData: Chat[] = [
    {
        id: '1',
        title: 'React18的新特性有哪些',
        updateTime: Date.now()
    },
    {
        id: '2',
        title: 'React17的新特性有哪些,让我看看超长的效果是什么样的',
        updateTime: Date.now() + 1
    },
    {
        id: '3',
        title: 'React16的新特性有哪些',
        updateTime: Date.now() + 2
    },
]

export default function ChatList() {
    const [chatList, setChatList] = useState<Chat[]>(defaultListData)
    const [selectedChat, setSelectedChat] = useState<Chat>()
    return (
        <div className="flex-1 mt-2 flex flex-col ">
            <ul>
                {
                    chatList.map((item) => {
                        const selected = selectedChat?.id === item.id;
                        return <li
                            onClick={() => {
                                setSelectedChat(item)
                            }}
                            key={item.id}
                            className={`group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${selected ? 'bg-gray-800':''}`}>
                            <div>
                                <PiChatBold />
                            </div>
                            <div className=" relative flex-1 whitespace-nowrap overflow-hidden">
                                {item.title}
                                <span className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 from-gray-900 bg-gradient-to-l ${selected ? 'from-gray-800':'from-gray-900'}`}></span>
                            </div>

                        </li>
                    })
                }
            </ul>
        </div>
    )
}
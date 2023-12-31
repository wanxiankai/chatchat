"use client"
import { groupByDate } from "@/common/util"
import { Chat } from "@/types/chat"
import { useMemo, useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md"
import { PiChatBold, PiTrashBold } from 'react-icons/pi'

const defaultListData: Chat[] = [
    {
        id: '1',
        title: 'React1的新特性有哪些',
        updateTime: Date.now()
    },
    {
        id: '2',
        title: 'React2的新特性有哪些,让我看看超长的效果是什么样的',
        updateTime: Date.now() + 1
    },
    {
        id: '3',
        title: 'React3的新特性有哪些',
        updateTime: Date.now() + 2
    },
    {
        id: '4',
        title: 'React4的新特性有哪些,让我看看超长的效果是什么样的',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
        id: '5',
        title: 'React5的新特性有哪些',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
        id: '6',
        title: 'React6的新特性有哪些,让我看看超长的效果是什么样的',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 30
    },
    {
        id: '7',
        title: 'React7的新特性有哪些',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 30
    },
    {
        id: '8',
        title: 'React8的新特性有哪些,让我看看超长的效果是什么样的',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 30
    },
    {
        id: '9',
        title: 'React9的新特性有哪些',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 30
    },
    {
        id: '10',
        title: 'React10的新特性有哪些',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 60
    },
    {
        id: '11',
        title: 'React11的新特性有哪些,让我看看超长的效果是什么样的',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 60
    },
    {
        id: '12',
        title: 'React12的新特性有哪些',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 60
    },
    {
        id: '13',
        title: 'React13的新特性有哪些',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 90
    },
    {
        id: '14',
        title: 'React14的新特性有哪些,让我看看超长的效果是什么样的',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 90
    },
    {
        id: '15',
        title: 'React15的新特性有哪些',
        updateTime: Date.now() - 1000 * 60 * 60 * 24 * 90
    },
]

export default function ChatList() {
    const [chatList, setChatList] = useState<Chat[]>(defaultListData)
    const [selectedChat, setSelectedChat] = useState<Chat>()
    const groupList = useMemo(() => {
        return groupByDate(chatList)
    }, [chatList])
    return (
        <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
            {groupList.map(([date, list]) => {
                return (
                    <div key={date}>
                        <div className=" sticky top-0 z-10 p-3 bg-gray-900 text-gray-500">
                            {date}
                        </div>
                        <ul>
                            {
                                list.map((item) => {
                                    const selected = selectedChat?.id === item.id;
                                    return <li
                                        onClick={() => {
                                            setSelectedChat(item)
                                        }}
                                        key={item.id}
                                        className={`group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 ${selected ? 'bg-gray-800' : ''}`}>
                                        <div>
                                            <PiChatBold />
                                        </div>
                                        <div className=" relative flex-1 whitespace-nowrap overflow-hidden">
                                            {item.title}
                                            <span className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 from-gray-900 bg-gradient-to-l ${selected ? 'from-gray-800' : 'from-gray-900'}`}></span>
                                        </div>

                                    </li>
                                })
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
"use client"
import { groupByDate } from "@/common/util"
import { Chat } from "@/types/chat"
import { useEffect, useMemo, useRef, useState } from "react"
import ChatItem from "./ChatItem"
import { useEventBusContext } from "@/components/EventBusContext"

export default function ChatList() {
    const [chatList, setChatList] = useState<Chat[]>([])
    const [selectedChat, setSelectedChat] = useState<Chat>()
    const pageRef = useRef(1);
    const groupList = useMemo(() => {
        return groupByDate(chatList)
    }, [chatList])
    const { subscribe, unsubscribe } = useEventBusContext()

    async function getData() {
        console.log('getChatList')
        const response = await fetch(`/api/list?page=${pageRef.current}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log('对话列表请求失败', response.statusText)
            return
        }
        const { data } = await response.json()
        if(pageRef.current === 1){
            setChatList(data.list)
        }else {
            setChatList([...chatList,data.list])
        }
    }

    useEffect(()=>{
        console.log('effect')
        getData();
    },[])

    useEffect(() => {
        const callback: EventListener = () => {
            console.log('fetchChatList')
            pageRef.current = 1;
            getData()
        }
        subscribe('fetchChatList', callback)
        return () => unsubscribe('fetchChatList', callback)
    }, [])

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
                                    return <ChatItem key={item.id} item={item} selected={selected} onSelected={setSelectedChat} />
                                })
                            }
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
import { useAppContext } from "@/components/AppContext"
import AIChatMessage from "@/components/common/AIChatMessage";
import { ActionType } from "@/reducers/AppReducer";
import { useEffect, useRef } from "react";
import { SiOpenai } from 'react-icons/si'

export default function MessageList() {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { state: { messageList, streamingId, selectedChat }, dispatch } = useAppContext();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);
    
    async function getData(chatId: string) {
        const response = await fetch(`/api/message/list?chatId=${chatId}`, {
            method: "GET"
        })
        if (!response.ok) {
            console.log('消息列表请求失败', response.statusText)
            return
        }
        const { data } = await response.json()
        dispatch({ type: ActionType.UPDATE, fiel: 'messageList', value: data.list })
    }

    useEffect(() => {
        if (selectedChat) {
            getData(selectedChat.id)
        } else {
            dispatch({ type: ActionType.UPDATE, fiel: 'messageList', value: [] })
        }
    }, [selectedChat])

    return (
        <div className="w-full pt-10 pb-48 dark:text-gray-300">
                <ul>
                    {messageList.map((message) => {
                        const isUser = message.role === 'user'
                        return (
                            <li
                                key={message.id}
                                className={`${isUser
                                    ? 'bg-white dark:bg-gray-800'
                                    : 'bg-gray-50 dark:bg-gray-700'
                                    }`}
                            >
                                <div className="w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6 text-lg">
                                    <div className="text-3xl leading-[1]">
                                        {isUser ? "😊" : <SiOpenai />}
                                    </div>
                                    <div className="flex-1"><AIChatMessage message={message.content}/></div>
                                </div>
                            </li>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </ul>
        </div>
    )
}
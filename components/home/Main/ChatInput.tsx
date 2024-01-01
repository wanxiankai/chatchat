import Button from "@/components/common/Button";
import { MdRefresh } from 'react-icons/md'
import { PiLightningFill } from 'react-icons/pi'
import { FiSend } from 'react-icons/fi'
import TextareaAutoSize from 'react-textarea-autosize'
import { useState } from "react";
import { v4 as uuidV4 } from "uuid"
import { Message, MessageRequestBody } from "@/types/chat";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function ChatInput() {
    const [messageText, setMessageText] = useState('')
    const { state: { messageList, currentModel }, dispatch } = useAppContext()

    async function sendMessage() {
        console.log('发送消息', messageText)

        const currentMessage: Message = {
            id: uuidV4(),
            role: 'user',
            content: messageText
        }
        const messages = messageList.concat([currentMessage]);
        const requestBody: MessageRequestBody = { messages, model: currentModel }
        // 先将当前Message 添加到列表，更新试图，然后再调用接口显示回复， 然后清空输入框
        dispatch({type: ActionType.ADD_MESSAGE, message: currentMessage})
        setMessageText('')

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        if (!response.ok) {
            console.log(response.statusText)
            return
        }
        if (!response.body) {
            console.log("body error")
            return
        }
        const responseMessage: Message = {
            id: uuidV4(),
            role:'assistant',
            content: ''
        }

        dispatch({type: ActionType.ADD_MESSAGE, message: responseMessage})

        const reader = response.body.getReader();
        const decoder = new TextDecoder()
        let done = false;
        let content = ''
        while (!done) {
            const result = await reader.read()
            done = result.done
            const chunk = decoder.decode(result.value)
            content += chunk
            dispatch({type: ActionType.UPDATE_MESSAGE, message: {...responseMessage, content}})
        }
        // setMessageText('')
    }
    return (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
                <Button
                    icon={MdRefresh}
                    className="font-medium"
                    variant="primary"
                >
                    重新生成
                </Button>
                <div className="flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4">
                    <div className="mx-3 mb-2.5">
                        <PiLightningFill />
                    </div>
                    <TextareaAutoSize
                        className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0"
                        placeholder="输入一条消息..."
                        rows={1}
                        value={messageText}
                        onChange={(e) => {
                            setMessageText(e.target.value)
                        }}
                    />
                    <Button
                        className="mx-3 !rounded-lg"
                        icon={FiSend}
                        variant="primary"
                        onClick={sendMessage}
                    />
                </div>
                <footer className="text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6">
                    ©️{new Date().getFullYear()}&nbsp; <a
                        className="font-medium py-[1px] border-b border-dotted border-black/60 hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0"
                        href="https://github.com/wanxiankai" target="_blank"
                    >
                        wanxiankai
                    </a>
                    .&nbsp;基于第三方提供的接口
                </footer>
            </div>
        </div>
    )
}
export interface Chat {
    id: string
    title: string
    updateTime: number
}

export interface Message {
    id: string
    role: string
    content: string
    chatId: string
}

export interface MessageRequestBody {
    messages: Message[]
    model: string
}
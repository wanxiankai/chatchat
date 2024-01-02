import { Chat, Message } from "@/types/chat"

export type State = {
    displayNavigation: boolean
    themeMode: 'light' | 'dark'
    currentModel: string
    messageList: Message[]
    streamingId: string
    selectedChat?: Chat
}

export enum ActionType {
    UPDATE = "UPDATE",
    ADD_MESSAGE = "ADD_MESSAHE",
    UPDATE_MESSAGE = "UPDATE_MESSAHE",
    REMOVE_MESSAGE = "REMOVE_MESSAGE"
}

type MessageAction = {
    type: ActionType.ADD_MESSAGE | ActionType.UPDATE_MESSAGE | ActionType.REMOVE_MESSAGE,
    message: Message
}

type UpdateAction = {
    type: ActionType.UPDATE,
    fiel: string,
    value: any
}

export type Action = UpdateAction | MessageAction

export const initialState: State = {
    displayNavigation: true,
    themeMode: 'light',
    currentModel: 'gpt-35-turbo',
    messageList: [],
    streamingId: '',
}

export function reducer(state: State, action: Action) {
    switch (action.type) {
        case ActionType.UPDATE:
            return { ...state, [action.fiel]: action.value }
        case ActionType.ADD_MESSAGE: {
            const messageList = state.messageList.concat([action.message])
            return { ...state, messageList }
        }
        case ActionType.UPDATE_MESSAGE: {
            const messageList = state.messageList.map((message) => {
                if (message.id === action.message.id) {
                    return action.message
                }
                return message
            })
            return { ...state, messageList }
        }
        case ActionType.REMOVE_MESSAGE: {
            const messageList =  state.messageList.filter((message) => message.id !== action.message.id)
            return {...state, messageList}
        }

        default:
            throw new Error()
    }
}

export type State = {
    displayNavigation: boolean
    themeMode: 'light' | 'dark'
}

export enum ActionType {
    UPDATE = 'UPDAte'
}

type UpdateAction = {
    type: ActionType.UPDATE,
    fiel: string,
    value: any
}

export type Action = UpdateAction

export const initialState: State = {
    displayNavigation: true,
    themeMode: 'light'
}

export function reducer(state: State, action: Action) {
    switch (action.type) {
        case ActionType.UPDATE:
            return { ...state, [action.fiel]: action.value }
        default:
            throw new Error()
    }
}
"use client"

import { Action, State, initialState, reducer } from "@/reducers/AppReducer"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useReducer, useState } from "react"


type AppContextProps = {
    state: State,
    dispatch: Dispatch<Action>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
    return useContext(AppContext)
}

export default function AppContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const contextValue = useMemo(() => {
        return { state, dispatch }
    }, [state, dispatch])

    return (
        <AppContext.Provider value={ contextValue}>
            {children}
        </AppContext.Provider>
    )

}

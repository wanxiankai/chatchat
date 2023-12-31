"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react"

type State = {
    displayNavigation: boolean
}

type AppContextProps = {
    state: State,
    setState: Dispatch<SetStateAction<State>>
}

const AppContext = createContext<AppContextProps>(null!)

export default function AppContextProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState({ displayNavigation: true })
    const contextValue = useMemo(() => {
        return { state, setState }
    }, [state, setState])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )

}

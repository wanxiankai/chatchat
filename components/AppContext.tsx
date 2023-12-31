"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react"

type State = {
    displayNavigation: boolean
}

type AppContextProps = {
    state: State,
    setState: Dispatch<SetStateAction<State>>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
    return useContext(AppContext)
}

export default function AppContextProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState({ displayNavigation: true })
    const [test, setTest] = useState(true)
    console.log("AppContextProvider")
    const contextValue = useMemo(() => {
        return { state, setState }
    }, [state, setState])

    return (
        <AppContext.Provider value={{ state, setState }}>
            <button onClick={() => {
                setTest((v) => !v )
                }}>Test</button>
            {children}
        </AppContext.Provider>
    )

}

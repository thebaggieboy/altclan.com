import { createContext,  useContext } from "react";


export const HistoryContext = createContext(null)

export const HistoryProvider = ({ children, value }) => {
    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    )
}
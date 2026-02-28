import { createContext } from "react";


export const AppContext = createContext()

const AppProvider = ({children}) => {
    const value = {
        admin: null,
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
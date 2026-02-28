import { createContext } from "react";


export const AdminContext = createContext()

const AdminProvider = ({children}) => {
    const value = {
        admin: null,
    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider
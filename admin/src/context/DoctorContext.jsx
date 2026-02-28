import { createContext } from "react";


export const DoctorContext = createContext()

const DoctorProvider = ({children}) => {
    const value = {
        doctor: null,
    }
    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorProvider
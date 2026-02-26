import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets.js";
export const AppContext = createContext()

const AppProvider = (Pros)=>{

    const data = {
        doctors
    }
    return (
        <AppContext.Provider value={data}>
            {Pros.children}
        </AppContext.Provider>
    )
}

export default AppProvider
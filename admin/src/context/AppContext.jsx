import { createContext } from "react";


export const AppContext = createContext()

  const calculateAge = (dob) => {
    if (!dob) return 0;

    // Split "20-03-2023" into ["20", "03", "2023"]
    const parts = dob.split("-");

    // Rearrange to "2023-03-20" (ISO format: YYYY-MM-DD)
    const formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;

    const today = new Date();
    const birthDate = new Date(formattedDob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

const AppProvider = ({children}) => {
    const value = {
        admin: null,
        calculateAge,
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
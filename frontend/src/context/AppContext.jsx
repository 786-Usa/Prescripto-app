import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppProvider = (Pros) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token")? localStorage.getItem("token") : false);
    
  const [doctors, setDoctors] = useState([]);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/all`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Error fetching doctor data");
    }
  };


  useEffect(() => {
    getDoctorsData();
  }, []);

  const data = {
    doctors,
    token,
    setToken,
    backendUrl
  };
  return (
    <AppContext.Provider value={data}>{Pros.children}</AppContext.Provider>
  );
};

export default AppProvider;

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "",
  );
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(false);  

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        },
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Error fetching doctor data");
    }
  };

  const getProfile = async () => {

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/profile`,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        },
      );
      if (data.success) {
        setProfile(data.doctor);
        console.log(data.doctor);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
      toast.error("Error fetching doctor profile");
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/profile/update`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );
      if (data.success) {
        setProfile(data.doctor);
        console.log(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating doctor profile:", error);
      toast.error("Error updating doctor profile");
    }
  };


  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    profile,setProfile,
    getProfile,
    updateProfile
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorProvider;

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );
  const [doctors, setDoctors] = useState([]); // ← NEW
  const [loading, setLoading] = useState(false); // ← NEW
  const [error, setError] = useState(null); // ← NEW
  const [appointments, setAppointments] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ← NEW - Fetch all doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${backendUrl}/api/doctor/all`);
      const data = await response.json();

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ← NEW - Add doctor to list
  const addDoctorToList = (newDoctor) => {
    setDoctors([...doctors, newDoctor]);
  };

  const changeAvailability = async (doctorId, availability) => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/availability`, {
        headers: { aToken },
        method: "PUT",
        body: JSON.stringify({ doctorId, available: availability }),
      });

      const data = await response.json();

      if (data.success) {
        const updatedDoctors = doctors.map((doctor) => {
          if (doctor._id === doctorId) {
            return { ...doctor, available: availability };
          }
          return doctor;
        });
        setDoctors(updatedDoctors);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

const cancelAppointment = async (aptId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/cancel-appointment`,
      { aptId },
      {
        headers: { Authorization: `Bearer ${aToken}` },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getAllAppointments(); 
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Error cancelling appointment");
  }
};

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      if (data.success) {
        setAppointments(data.appointments);

        toast.success(data.message);
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };



  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors, // ← NEW
    setDoctors, // ← NEW
    fetchDoctors, // ← NEW
    addDoctorToList, // ← NEW
    loading, // ← NEW
    error, // ← NEW
    changeAvailability,
    cancelAppointment,
    appointments,
    setAppointments,
    getAllAppointments,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;

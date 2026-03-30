import React, { useContext, useEffect, useMemo } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";

const Dashboard = () => {
  const {
    aToken,
    appointments,
    doctors,
    getAllAppointments,
    fetchDoctors,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
      fetchDoctors();
    }
  }, [aToken]);

  // 🧠 CALCULATIONS
  const totalAppointments = appointments.length;

  const totalPatients = useMemo(() => {
    const unique = new Set(
      appointments.map((apt) => apt.userId)
    );
    return unique.size;
  }, [appointments]);

  const totalRevenue = useMemo(() => {
    return appointments.reduce((sum, apt) => {
      if (apt.payment === "paid") {
        return sum + apt.amount;
      }
      return sum;
    }, 0);
  }, [appointments]);

  const latestAppointments = [...appointments]
    .reverse()
    .slice(0, 5);

  const getStatus = (apt) => {
    if (apt.cancelled) return "Cancelled";
    if (apt.isCompleted) return "Completed";
    if (apt.payment === "paid") return "Paid";
    return "Pending";
  };

  const statusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return "bg-red-100 text-red-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Paid":
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="m-5 space-y-6">
      {aToken && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Doctors */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl border-none hover:shadow-md">
              <img src={assets.doctor_icon} className="w-12" />
              <div>
                <p className="text-2xl font-bold">{doctors.length}</p>
                <p className="text-sm text-gray-500">Doctors</p>
              </div>
            </div>

            {/* Appointments */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl border-none hover:shadow-md">
              <img src={assets.appointments_icon} className="w-12" />
              <div>
                <p className="text-2xl font-bold">{totalAppointments}</p>
                <p className="text-sm text-gray-500">Appointments</p>
              </div>
            </div>

            {/* Patients */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl border-none hover:shadow-md">
              <img src={assets.patients_icon} className="w-12" />
              <div>
                <p className="text-2xl font-bold">{totalPatients}</p>
                <p className="text-sm text-gray-500">Patients</p>
              </div>
            </div>

            {/* Revenue */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl border-none hover:shadow-md">
              <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-full text-green-600 text-xl">
                $
              </div>
              <div>
                <p className="text-2xl font-bold">${totalRevenue}</p>
                <p className="text-sm text-gray-500">Revenue</p>
              </div>
            </div>
          </div>

          {/*  LATEST APPOINTMENTS */}
          <div className="bg-white rounded-xl border-none p-6">
            <div className="flex items-center gap-2 mb-5">
              <img src={assets.appointment_icon} className="w-5" />
              <h2 className="font-semibold text-gray-800">
                Latest Appointments
              </h2>
            </div>

            <div className="space-y-4">
              {latestAppointments.map((apt) => {
                const status = getStatus(apt);

                return (
                  <div
                    key={apt._id}
                    className="flex items-center justify-between p-4 border-none rounded-lg hover:shadow-sm"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.docData.image}
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <p className="font-medium">
                          {apt.docData.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {apt.slotDate} | {apt.slotTime}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${statusColor(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
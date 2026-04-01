import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (dToken) {
        setLoading(true);
        await getAppointments();
        setLoading(false);
      }
    };
    fetchData();
  }, [dToken]);

  // 🎯 STATUS
  const getStatus = (apt) => {
    if (apt.cancelled) return "Cancelled";
    if (apt.isCompleted) return "Completed";
    if (apt.payment === "paid") return "Paid";
    return "Pending";
  };

  const statusStyle = (status) => {
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
      {/* HEADER */}
      <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] px-6 py-4 text-sm text-gray-500 bg-gray-50">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* CONTENT */}
        <div className="max-h-[75vh] overflow-y-auto">
          {loading ? (
            <p className="p-6 text-gray-500">Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="p-6 text-gray-500">No appointments found</p>
          ) : (
            appointments.map((apt, index) => {
              const status = getStatus(apt);

              return (
                <div
                  key={apt._id}
                  className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
                >
                  {/* INDEX */}
                  <p className="text-sm text-gray-600">{index + 1}</p>

                  {/* PATIENT */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        apt.userData?.image || "https://via.placeholder.com/40"
                      }
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {apt.userData?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">{status}</p>
                    </div>
                  </div>

                  {/* PAYMENT */}
                  <span
                    className={`px-3 py-1 text-xs rounded-full w-fit ${statusStyle(
                      status,
                    )}`}
                  >
                    {apt.payment ? "Online" : "Cash"}
                  </span>

                  {/* AGE */}
                  <p className="text-gray-600">
                    {apt.userData?.dob ? calculateAge(apt.userData.dob) : "-"}
                  </p>

                  {/* DATE */}
                  <p className="text-gray-600">
                    {apt.slotDate} | {apt.slotTime}
                  </p>

                  {/* FEES */}
                  <p className="font-medium text-gray-800">${apt.amount}</p>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-center gap-3">
                    {/* 🎯 COMPLETED - Hide all buttons */}
                    {apt.isCompleted ? (
                      <div className="text-center">
                        <span className="text-green-600 text-sm font-medium">✔ Completed</span>
                      </div>
                    ) : apt.cancelled ? (
                      <div className="text-center">
                        <span className="text-red-600 text-sm font-medium">✖ Cancelled</span>
                      </div>
                    ) : (
                      /* 🎯 PENDING/PAID - Show complete and cancel buttons */
                      <>
                        {/* COMPLETE */}
                        <button
                          onClick={() => completeAppointment(apt._id)}
                          className="p-2 rounded-full hover:bg-green-50 cursor-pointer transition"
                          title="Mark as completed"
                        >
                          <img src={assets.tick_icon} className="w-5 h-5" />
                        </button>

                        {/* CANCEL - Hidden if paid */}
                        {apt.payment !== "paid" && (
                          <button
                            onClick={() => cancelAppointment(apt._id)}
                            className="p-2 rounded-full hover:bg-red-50 cursor-pointer transition"
                            title="Cancel appointment"
                          >
                            <img src={assets.cancel_icon} className="w-5 h-5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;

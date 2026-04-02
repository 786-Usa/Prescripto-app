import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/my-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching appointments");
    }
  };

  const cancelAppointment = async (aptId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { aptId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling appointment");
    }
  };

  const handleCancelAppointment = (aptId) => {
    setAppointments((prev) => prev.filter((apt) => apt._id !== aptId));
    cancelAppointment(aptId);
  };

  const handlePayment = async (aptId) => {
    try {
      setLoadingId(aptId);

      const { data } = await axios.post(
        `${backendUrl}/api/user/make-payment`,
        { aptId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
          <p className="text-gray-500 text-lg">📋 No Appointments Found</p>
          <p className="text-gray-400 text-sm mt-2">
            You haven't booked any appointments yet.
          </p>
        </div>
      ) : (
        <>
          {appointments.map((apt) => {
            const doc = apt.docData || {};

            const status = apt.cancelled
              ? "Cancelled"
              : apt.isCompleted
              ? "Completed"
              : apt.payment === "paid"
              ? "Paid"
              : "Pending";

            const statusColor =
              status === "Cancelled"
                ? "bg-red-100 text-red-600"
                : status === "Completed"
                ? "bg-green-100 text-green-600"
                : status === "Paid"
                ? "bg-indigo-100 text-indigo-600"
                : "bg-yellow-100 text-yellow-600";

            return (
              <div
                key={apt._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col md:flex-row gap-5 border border-gray-100"
              >
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <img
                    src={doc?.image}
                    alt={doc?.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {doc?.name}
                      </h2>
                      <p className="text-indigo-600 text-sm">
                        {doc?.speciality}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full ${statusColor}`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>📅 {apt.slotDate}</span>
                    <span>⏰ {apt.slotTime}</span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {doc?.address?.line1}, {doc?.address?.line2}
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    💰 ${apt.amount}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-between gap-2 md:w-40">
                  {apt.isCompleted ? (
                    <span className="text-green-600 text-sm text-center font-medium py-2">
                      ✔ Completed
                    </span>
                  ) : apt.cancelled ? (
                    <span className="text-red-600 text-sm text-center font-medium py-2">
                      ✖ Cancelled
                    </span>
                  ) : apt.payment === "paid" ? (
                    <button
                      disabled
                      className="bg-green-500 text-white py-2 rounded-lg text-sm opacity-70 cursor-not-allowed"
                    >
                      ✔ Paid
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handlePayment(apt._id)}
                        disabled={loadingId === apt._id}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm transition disabled:opacity-50"
                      >
                        {loadingId === apt._id
                          ? "Processing..."
                          : "Pay Now"}
                      </button>

                      <button
                        onClick={() =>
                          handleCancelAppointment(apt._id)
                        }
                        className="border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-red-50 transition"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MyAppointments;
import React, { useState, useEffect, useContext, useMemo } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const {
    appointments,
    cancelAppointment,
    getAllAppointments,
    aToken,
  } = useContext(AdminContext);

  const { calculateAge } = useContext(AppContext);

  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const getStatus = (apt) => {
    if (apt.cancelled) return "Cancelled";
    if (apt.isCompleted) return "Completed";
    if (apt.payment === "paid") return "Paid";
    return "Pending";
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const status = getStatus(apt);

      const matchesFilter =
        filter === "All" ? true : status === filter;

      const matchesSearch =
        apt.userData.name.toLowerCase().includes(search.toLowerCase()) ||
        apt.docData.name.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [appointments, filter, search]);

  const openCancelModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    setLoadingId(selectedId);
    await cancelAppointment(selectedId);
    setShowModal(false);
    setSelectedId(null);
    setLoadingId(null);
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
    <div className="m-5">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">
        All Appointments
      </h1>

      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Paid", "Pending", "Cancelled", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-sm ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border-none rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-none-b">
              <tr>
                <th className="px-4 py-3 text-sm text-left">#</th>
                <th className="px-4 py-3 text-sm text-left">Patient</th>
                <th className="px-4 py-3 text-sm text-left">Department</th>
                <th className="px-4 py-3 text-sm text-left">Age</th>
                <th className="px-4 py-3 text-sm text-left">Date & Time</th>
                <th className="px-4 py-3 text-sm text-left">Doctor</th>
                <th className="px-4 py-3 text-sm text-left">Fees</th>
                <th className="px-4 py-3 text-sm text-center">Status</th>
                <th className="px-4 py-3 text-sm text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt, index) => {
                  const status = getStatus(apt);

                  return (
                    <tr
                      key={apt._id}
                      className={`border-none-b hover:bg-gray-50 ${
                        apt.cancelled ? "opacity-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-sm">
                        {index + 1}
                      </td>

                      {/* Patient */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={apt.userData.image}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{apt.userData.name}</span>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3">
                        {apt.docData.speciality}
                      </td>

                      {/* Age */}
                      <td className="px-4 py-3">
                        {calculateAge(apt.userData.dob)}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3">
                        {apt.slotDate} | {apt.slotTime}
                      </td>

                      {/* Doctor */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={apt.docData.image}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{apt.docData.name}</span>
                        </div>
                      </td>

                      {/* Fees */}
                      <td className="px-4 py-3">
                        ${apt.amount}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${statusColor(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-center">
                        <button
                          disabled={
                            apt.cancelled ||
                            apt.isCompleted ||
                            apt.payment === "paid"
                          }
                          onClick={() => openCancelModal(apt._id)}
                          className={`px-2 py-1 rounded ${
                            apt.cancelled || apt.payment === "paid"
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-500 hover:bg-red-50"
                          }`}
                        >
                          {loadingId === apt._id ? "..." : "Cancel"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-lg font-semibold mb-3">
              Cancel Appointment?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 rounded"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profile, getProfile, updateProfile } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    fees: "",
    address: "",
    available: true,
  });

  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken]);

  useEffect(() => {
    if (profile) {
      const addressValue =
        typeof profile.address === "object" && profile.address
          ? `${profile.address.line1 || ""} ${profile.address.line2 || ""}`.trim()
          : profile.address || "";

      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        specialization: profile.speciality || "",
        experience: profile.experience || "",
        fees: profile.fees || "",
        address: addressValue,
        available: profile.available !== undefined ? profile.available : true,
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }
    await updateProfile(formData);
    setIsEdit(false);
    toast.success("Profile updated successfully");
  };

  return profile ? (
    <div className="m-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
        <button
          onClick={() => setIsEdit(!isEdit)}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isEdit
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isEdit ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT - PROFILE IMAGE & BASIC INFO */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-center">
              <img
                src={profile.image}
                alt="Doctor Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-400"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {profile.name}
              </h2>
              <p className="text-sm text-blue-600 font-semibold mb-4">
                {profile.speciality
                  ? profile.speciality.charAt(0).toUpperCase() + profile.speciality.slice(1)
                  : "Specialization not provided"}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center justify-center gap-2">
                  <span>📧</span> {profile.email}
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span>📱</span> {profile.phone || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - DETAILS & FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            {!isEdit ? (
              // VIEW MODE
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Experience
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {profile.experience}{" "}
                      {profile.experience == 1 ? "year" : "years"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Consultation Fee
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      ${profile.fees}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Specialization
                  </label>
                  <p className="mt-1 text-gray-800 p-3 bg-gray-50 rounded-lg">
                    {profile.speciality
                      ? profile.speciality.charAt(0).toUpperCase() + profile.speciality.slice(1)
                      : "Specialization not provided"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <p className="mt-1 text-gray-800 p-3 bg-gray-50 rounded-lg">
                    {typeof profile.address === "object" && profile.address
                      ? `${profile.address.line1 || ""} ${profile.address.line2 || ""}`.trim()
                      : profile.address || "Not provided"}
                  </p>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">
                    {profile.available ? "✅" : "❌"}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {profile.available
                      ? "Available for appointments"
                      : "Not available"}
                  </span>
                </div>
              </div>
            ) : (
              // EDIT MODE
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Consultation Fee ($)
                    </label>
                    <input
                      type="number"
                      name="fees"
                      value={formData.fees}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Specialization
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label className="font-semibold text-gray-800 cursor-pointer">
                    Available for appointments
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="m-5 text-center">
      <p className="text-gray-500">Loading profile...</p>
    </div>
  );
};

export default DoctorProfile;

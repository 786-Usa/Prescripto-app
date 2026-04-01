import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Appointment from "../models/appointmentModel.js";

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Include doctor._id in token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ NEW - Get all doctors (for frontend & admin)
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password -email");

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ FIXED - Use req.user.id from auth middleware
const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id; // From authDoctor middleware

    const doctor = await Doctor.findById(doctorId).select("-password");
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const doctorId = req.user.id; // From authDoctor middleware
    const { name, specialization, experience, fees, address, available, email, phone } =
      req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { name, specialization, experience, fees, address, available, email, phone },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated",
      doctor,
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Error updating doctor profile",
    });
  }
};

// ✅ FIXED - Use req.user.id from auth middleware
const updateDoctorAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id; // From authDoctor middleware
    const { available } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { available },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Availability updated",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({ docId: doctorId });

    res.status(200).json({
      success: true,
      appointments, // ✅ ARRAY
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
    });
  }
};

// ✅ NEW - Complete appointment
const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID required",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { isCompleted: true },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment marked as completed",
      appointment,
    });
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).json({
      success: false,
      message: "Error completing appointment",
    });
  }
};

// ✅ NEW - Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID required",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { cancelled: true },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment cancelled",
      appointment,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Error cancelling appointment",
    });
  }
};

export {
  doctorLogin,
  getDoctorProfile,
  updateProfile,
  updateDoctorAvailability,
  getDoctorAppointments,
  getAllDoctors,
  completeAppointment,
  cancelAppointment,
};

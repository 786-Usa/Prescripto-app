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
        message: "Email and password required"
      });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Include doctor._id in token
    const token = jwt.sign(
      { id: doctor._id }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ NEW - Get all doctors (for frontend & admin)
 const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password -email");
    
    res.status(200).json({
      success: true,
      doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ FIXED - Use req.user.id from auth middleware
 const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;  // From authDoctor middleware

    const doctor = await Doctor.findById(doctorId).select("-password");
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      success: true,
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ FIXED - Use req.user.id from auth middleware
 const updateDoctorAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;  // From authDoctor middleware
    const { available } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { available },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Availability updated",
      doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//  Use req.user.id from auth middleware
//  const getDoctorAppointments = async (req, res) => {
//   try {
//     const doctorId = req.user.id;

//     const doctor = await Doctor.findById(doctorId);

//     if (!doctor) {
//       return res.status(404).json({
//         success: false,
//         message: "Doctor not found",
//       });
//     }

//     const slots = doctor.slots_booked || {};

//     let appointments = [];

//     for (const date in slots) {
//       for (const time in slots[date]) {
//         const appointment = slots[date][time];

//         appointments.push({
//           ...appointment,
//           slotDate: date,
//           slotTime: time,
//         });
//       }
//     }

//     res.status(200).json({
//       success: true,
//       appointments, 
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


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

export {
  doctorLogin,
  getDoctorProfile,
  updateDoctorAvailability,
  getDoctorAppointments,
  getAllDoctors
};
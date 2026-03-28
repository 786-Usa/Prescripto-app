import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Normalize email
    const emailLower = email.toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: emailLower,
      password: hashedPassword,
    });

    // Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      success: true,
      existingUser,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to set req.userId
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, dob, gender, address, phone } = req.body;

    if (!name || !dob || !gender || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      dob,
      gender,
      address: typeof address === "string" ? JSON.parse(address) : address,
      phone,
    });

    const imageFile = req.file;

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, {
        image: imageUrl,
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error); // 🔥 VERY IMPORTANT
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // get doctor
    const docData = await Doctor.findById(docId).select("-password");

    if (!docData.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available",
      });
    }

    // slots_booked as object
    let slots_booked = docData.slots_booked || {};

    // check if date exists
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({
          success: false,
          message: "Slot not available",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }
    console.log("Updated slots:", slots_booked);

    // get user
    const userData = await userModel.findById(userId).select("-password");

    // remove slots from doctor copy
    const docDataClean = docData.toObject();
    delete docDataClean.slots_booked;

    // create appointment
    const newAppointment = new appointmentModel({
      userId,
      docId,
      date: Date.now(),
      slotTime,
      slotDate,
      userData,
      docData: docDataClean,
      amount: docData.fees,
    });

    await newAppointment.save();

    // update doctor slots
    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.status(200).json({
      success: true,
      message: "Appointment Booked Successfully",
      newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { aptId } = req.body;

    // 🔥 1. find appointment
    const appointmentData = await appointmentModel.findById(aptId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 🔥 2. check ownership
    if (appointmentData.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 🔥 3. mark cancelled (NOT DELETE)
    await appointmentModel.findByIdAndUpdate(aptId, {
      cancelled: true,
    });

    // 🔥 4. free slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await Doctor.findById(docId);
    let slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (time) => time !== slotTime,
      );
    }

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment Cancelled Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const makePayment = async (req, res) => {
  try {
    const { aptId } = req.body;

    const appointment = await appointmentModel.findById(aptId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.payment === "paid") {
      return res.json({ success: false, message: "Already paid" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Appointment with Dr. ${appointment.docData.name}`, // ✅ FIXED
            },
            unit_amount: appointment.amount * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&aptId=${aptId}`,
      cancel_url: `${process.env.CLIENT_URL}/my-appointments`,
    });

    res.json({ success: true, url: session.url });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { session_id, aptId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      await appointmentModel.findByIdAndUpdate(aptId, {
        payment: "paid",
      });

      return res.json({ success: true });
    }

    res.json({ success: false, message: "Payment not completed" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  makePayment,
  verifyPayment
};

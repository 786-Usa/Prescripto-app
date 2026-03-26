import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Normalize email
    const emailLower = email.toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: emailLower,
      password: hashedPassword
    });

    // Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            existingUser,
            token
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
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
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      user
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }

}

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, dob, gender, address, phone } = req.body;

    if (!name || !dob || !gender || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      dob,
      gender,
      address: typeof address === "string" ? JSON.parse(address) : address,
      phone
    });

    const imageFile = req.file;

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageUrl = imageUpload.secure_url;

      await User.findByIdAndUpdate(userId, {
        image: imageUrl
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.log(error); // 🔥 VERY IMPORTANT
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };
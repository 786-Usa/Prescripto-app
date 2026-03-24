import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import validator from "validator";
import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            speciality,
            fees,
            degree,
            about,
            experience,
            address,
            password
        } = req.body;

        const imageFile = req.file;

        // validation
        if (
            !name || !email || !phone || !speciality ||
            !fees || !degree || !about || !experience ||
            !address || !password || !imageFile
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image
        const imageUpload = await cloudinary.uploader.upload(
            imageFile.path,
            { resource_type: "image" }
        );

        const doctorData = {
            name,
            email,
            phone,
            speciality,
            fees,
            degree,
            about,
            experience,
            address:
                typeof address === "string"
                    ? JSON.parse(address)
                    : address,
            image: imageUpload.secure_url,
            password: hashedPassword,
            date: Date.now()
        };

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        res.json({
            success: true,
            message: "Doctor added successfully",
            doctor: newDoctor
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: "7d" });

            res.json({
                success: true,
                message: "Admin logged in successfully",
                token: token
            });
        }
        else {
            res.json({
                success: false,
                message: "Invalid admin credentials"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export { addDoctor, loginAdmin };
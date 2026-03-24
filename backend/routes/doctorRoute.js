// backend/routes/doctorRoute.js
import express from 'express';
import { 
  doctorLogin, 
  getAllDoctors,           // ← NEW
  getDoctorProfile, 
  updateDoctorAvailability,
  getDoctorAppointments 
} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';  // ← UNCOMMENT

const doctorRouter = express.Router();

doctorRouter.post('/login', doctorLogin);  // No auth needed
doctorRouter.get('/all', getAllDoctors);  // No auth - for frontend/admin

doctorRouter.get('/profile', authDoctor, getDoctorProfile);  // ← Protected
doctorRouter.get('/appointments', authDoctor, getDoctorAppointments);  // ← Protected

export default doctorRouter;
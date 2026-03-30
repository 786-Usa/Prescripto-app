// backend/routes/doctorRoute.js
import express from 'express';
import { 
  doctorLogin, 
  getAllDoctors,          
  getDoctorProfile, 
  updateDoctorAvailability,
  getDoctorAppointments 
} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js'; 

const doctorRouter = express.Router();

doctorRouter.post('/login-doctor', doctorLogin);
doctorRouter.get('/all', getAllDoctors);  // No auth - for frontend/admin

doctorRouter.get('/profile', authDoctor, getDoctorProfile);
doctorRouter.get('/appointments', authDoctor, getDoctorAppointments);

export default doctorRouter;
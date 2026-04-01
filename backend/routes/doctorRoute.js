// backend/routes/doctorRoute.js
import express from 'express';
import { 
  doctorLogin, 
  getAllDoctors,          
  getDoctorProfile, 
  updateDoctorAvailability,
  getDoctorAppointments, 
  updateProfile,
  completeAppointment,
  cancelAppointment
} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js'; 

const doctorRouter = express.Router();

doctorRouter.post('/login-doctor', doctorLogin);
doctorRouter.get('/all', getAllDoctors);  // No auth - for frontend/admin

doctorRouter.get('/profile', authDoctor, getDoctorProfile);
doctorRouter.post('/profile/update', authDoctor, updateProfile);
doctorRouter.get('/appointments', authDoctor, getDoctorAppointments);
doctorRouter.post('/appointment/complete', authDoctor, completeAppointment);
doctorRouter.post('/appointment/cancel', authDoctor, cancelAppointment);

export default doctorRouter;
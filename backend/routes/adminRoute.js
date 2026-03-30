import express from 'express';
import { addDoctor, appointmentCancel, appointmentsAdmin, loginAdmin, } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { updateDoctorAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();


adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login-admin', loginAdmin);
adminRouter.put('/availability', authAdmin, updateDoctorAvailability);  // ← Protected
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);

export default adminRouter;
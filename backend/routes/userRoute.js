import express from 'express';
import { bookAppointment, cancelAppointment, getUserProfile, listAppointment, loginUser, makePayment, registerUser, updateUserProfile, verifyPayment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/profile',authUser, getUserProfile);
UserRouter.post('/profile/update',upload.single('image'), authUser, updateUserProfile);
UserRouter.post('/book-appointment', authUser, bookAppointment);
UserRouter.get('/my-appointments', authUser, listAppointment);
UserRouter.post('/cancel-appointment', authUser, cancelAppointment)
UserRouter.post('/make-payment', authUser, makePayment);
UserRouter.post('/payment-success', authUser, verifyPayment);
export default UserRouter;
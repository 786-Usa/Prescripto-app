import express from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const UserRouter = express.Router();

UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);
UserRouter.get('/profile',authUser, getUserProfile);
UserRouter.post('/profile/update',upload.single('image'), authUser, updateUserProfile);
export default UserRouter;
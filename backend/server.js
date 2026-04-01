import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectionCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import UserRouter from './routes/userRoute.js';
dotenv.config();
//app configuration
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectionCloudinary();
//middlewares
app.use(cors({
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://localhost:3000",
    "https://prescripto-app-frontend.vercel.app",
    "https://prescripto-app-admin.vercel.app",
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
  ].filter(Boolean), // Remove undefined values
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
//endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', UserRouter);


app.get('/',(req,res)=>{
    console.log('Server is running');
    res.send('API is Working');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
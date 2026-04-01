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

//middlewares
app.use(cors({
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "https://prescripto-app-frontend.vercel.app",
    "https://prescripto-app-admin-phi.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json());

// Initialize connections
(async () => {
  try {
    await connectDB();
    await connectionCloudinary();
    console.log('Database and Cloudinary connected successfully');
  } catch (error) {
    console.error('Failed to connect services:', error);
  }
})();

//endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', UserRouter);

app.get('/',(req,res)=>{
    console.log('Server is running');
    res.send('API is Working');
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
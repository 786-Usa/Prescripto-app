import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectionCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
dotenv.config();
//app configuration
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectionCloudinary();
//middlewares
app.use(cors());
app.use(express.json());
//endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);


app.get('/',(req,res)=>{
    console.log('Server is running');
    res.send('API is Working');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
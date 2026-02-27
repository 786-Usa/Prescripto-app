import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
//app configuration
const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
//endpoints
app.get('/',(req,res)=>{
    console.log('Server is running');
    res.send('API is Working');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import Authmiddle from './Middleware/AuthMiddleware.js';

import authRouter from './routes/Auth.js'
import leadRouter from './routes/Lead.js'
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(process.env.URI);

const app = express();

app.use(cors())
app.use(express.json());


app.use('/api', authRouter);

app.use(Authmiddle);
app.use('/api', leadRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

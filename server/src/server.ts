import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import treatmentRoutes from './routes/treatment.routes';
import notificationRoutes from './routes/notification.routes';
import medicamentRoutes from './routes/medicament.routes';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';
import * as NotificationService from './services/notification.service';

dotenv.config();

const app = express();
const PORT: number = 3000;

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connection established'))
    .catch((err: Error) => console.log('MongoDB connection error: ', err));


app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', treatmentRoutes);
app.use('/api', notificationRoutes);
app.use('/api', medicamentRoutes);

cron.schedule('*/1 * * * *', async () => {
    try {
        await NotificationService.sendMedicationNotifications();
        console.log("Notification cron");
    } catch (error) {
        console.error("Error during cron");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

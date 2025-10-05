import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingrouter from './routes/bookingRoute.js';
import classrouter from './routes/classRoute.js';
import schedulerouter from './routes/scheduleRoute.js';
import authrouter from './routes/authRoute.js';
import staffrouter from './routes/staffRoute.js';
import staffApplicationrouter from './routes/staffApplicationRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Thai Cooking Class API - MVP', 
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      classes: '/api/classes',
      schedules: '/api/schedules',
      bookings: '/api/bookings',
      staff: '/api/staff',
      staffApplications: '/api/staff-applications',
    }
  });
});


app.use('/api/auth', authrouter);
app.use('/api/classes', classrouter);
app.use('/api/schedules', schedulerouter);
app.use('/api/bookings', bookingrouter);
app.use('/api/staff', staffrouter);
app.use('/api/staff-applications', staffApplicationrouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import { Router } from 'express';
import { createBooking, getBookings, getBookingById } from '../Controller/BookingController';

const router = Router();

router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);

export default router;
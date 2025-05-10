import express from 'express';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createBookingZodSchema, updateBookingZodSchema } from './booking.validation';

const router = express.Router();

router.post('/',auth('trainee'),validateRequest(createBookingZodSchema),BookingController.createBooking);

router.patch('/:id',auth('trainee'),validateRequest(updateBookingZodSchema),BookingController.updateBooking);

router.delete('/:id',auth('trainee'),BookingController.deleteBooking);

router.get('/my-bookings/:traineeId',auth('trainee'),BookingController.getBookingsByTrainee);

router.get('/',auth('admin'),BookingController.getAllBookings);

router.get('/:id',auth('admin', 'trainee'),BookingController.getBookingById);

router.get('/schedule/:scheduleId',auth('admin', 'trainer'),BookingController.getBookingsBySchedule);

export const BookingRoutes = router;
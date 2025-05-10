import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const {traineeId} = req.body;
  const bookingData = { ...req.body};
  
  const result = await BookingService.createBooking(traineeId, bookingData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Class booked successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.getBookingById(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body; 
  const result = await BookingService.updateBooking(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.deleteBooking(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking deleted successfully',
    data: result,
  });
});

const getBookingsByTrainee = catchAsync(async (req: Request, res: Response) => {
  const {traineeId} = req.params;
  const result = await BookingService.getBookingsByTrainee(traineeId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Trainee bookings retrieved successfully',
    data: result,
  });
});

const getBookingsBySchedule = catchAsync(async (req: Request, res: Response) => {
  const { scheduleId } = req.params;
  const result = await BookingService.getBookingsBySchedule(scheduleId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Schedule bookings retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsByTrainee,
  getBookingsBySchedule,
};
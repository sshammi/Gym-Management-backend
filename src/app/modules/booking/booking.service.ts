import mongoose from 'mongoose';
import { IBooking} from './booking.interface';
import { User } from '../user/user.model';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import { ClassSchedule } from '../classSchedule/classSchedule.model';
import { StatusCodes } from 'http-status-codes';

const createBooking = async (traineeId: string, bookingData:IBooking) => {
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();
    const trainee = await User.findById(traineeId);
    if (!trainee) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Trainee not found');
    }
    if (trainee.role !== 'trainee') {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error occurred.');
    }
    const schedule = await ClassSchedule.findById(bookingData.scheduleId).populate('bookingsCount').session(session);
    
    if (!schedule) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Class schedule not found');
    }
    
    if (schedule.status !== 'active') {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Class schedule is not active');
    }

    // Check already 10 trainees
    const bookingsCount = await Booking.countDocuments({
      scheduleId: bookingData.scheduleId,
      status: 'booked',
    }).session(session);

    if (bookingsCount >= schedule.maxCapacity) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Class schedule is full. Maximum 10 trainees allowed per schedule.');
    }

    // already booking
    const existingBooking = await Booking.findOne({
      traineeId,
      scheduleId: bookingData.scheduleId,
    }).session(session);

    if (existingBooking) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Trainee already has a booking for this schedule');
    }

    // check trainee has another class
    const overlappingSchedule = await ClassSchedule.findById(bookingData.scheduleId);
    if (!overlappingSchedule) {
      throw new AppError(404, 'Class schedule not found');
    }

    const overlappingBookings = await Booking.find({
      traineeId,
      status: 'booked',
    }).session(session);

    for (const booking of overlappingBookings) {
      const bookedSchedule = await ClassSchedule.findById(booking.scheduleId);
      if (!bookedSchedule) continue;

      // check overlap
      const newStartTime = overlappingSchedule.startTime;
      const newEndTime = overlappingSchedule.endTime;
      const existingStartTime = bookedSchedule.startTime;
      const existingEndTime = bookedSchedule.endTime;

      if (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
        (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
      ) {
        throw new AppError(400, 'Trainee already has a booking for another class at the same time');
      }
    }

    const newBooking = await Booking.create(
      [{ ...bookingData, traineeId }],
      { session }
    );

    await session.commitTransaction();
    return newBooking[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllBookings = async () => {
  const bookings = await Booking.find()
    .populate('traineeId', 'name email')
    .populate({
      path: 'scheduleId',
      populate: {
        path: 'trainerId',
        select: 'name email',
      },
    });
  
  return bookings;
};

const getBookingById = async (id: string) => {
  const booking = await Booking.findById(id)
    .populate('traineeId', 'name email')
    .populate({
      path: 'scheduleId',
      populate: {
        path: 'trainerId',
        select: 'name email',
      },
    });
  
  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');
  }
  
  return booking;
};

const updateBooking = async (id: string,updateData: Partial<IBooking>) => {
  const booking = await Booking.findById(id);
  //console.log(booking)
  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found or does not belong to the trainee');
  }

  const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {new: true,runValidators: true,})
    .populate('traineeId', 'name email')
    .populate({
      path: 'scheduleId',
      populate: {
        path: 'trainerId',
        select: 'name email',
      },
    });

  return updatedBooking;
};

const deleteBooking = async (id: string) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found or does not belong to the trainee');
  }
  const deletedBooking = await Booking.findByIdAndDelete(id);
  return deletedBooking;
};

const getBookingsByTrainee = async (traineeId: string) => {
  const bookings = await Booking.find({ traineeId })
    .populate({
      path: 'scheduleId',
      populate: {
        path: 'trainerId',
        select: 'name email',
      },
    });
  
  return bookings;
};

const getBookingsBySchedule = async (scheduleId: string) => {
  const bookings = await Booking.find({ scheduleId })
    .populate('traineeId', 'name email');
  
  return bookings;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsByTrainee,
  getBookingsBySchedule,
};
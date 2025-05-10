import { User } from '../user/user.model';
import { ClassSchedule } from './classSchedule.model';
import { IClassSchedule } from './classSchedule.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';


const createClassSchedule = async (scheduleData:IClassSchedule) => {
  // Check trainer exists
  const trainer = await User.findById(scheduleData.trainerId);
  if (!trainer) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Trainer not found');
  }
  if (trainer.role !== 'trainer') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error occurred.Must be a trainer');
  }

  // time duration
  const startTime = new Date(scheduleData.startTime);
  const endTime = new Date(scheduleData.endTime);
  const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  if (durationInHours !== 2) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error occurred.Duration must be 2hr');
  }

  // Check 5 schedules for the day
  const startOfDay = new Date(startTime);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(startTime);
  endOfDay.setHours(23, 59, 59, 999);

  const schedulesForDay = await ClassSchedule.countDocuments({
    startTime: { $gte: startOfDay, $lte: endOfDay },
  });

  if (schedulesForDay >= 5) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Schedule limit exceeded.', 'Maximum 5 schedules allowed per day');
  }

  // check conflict
  const conflictExists = await ClassSchedule.exists({
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  if (conflictExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Schedule conflict', 'Another class is already scheduled during this time');
  }

  const newSchedule = await ClassSchedule.create(scheduleData);
  return newSchedule;
};

const getAllClassSchedules = async () => {
  const schedules = await ClassSchedule.find()
    .populate('trainerId', 'name email')
    .populate('bookingsCount');
  
  return schedules;
};

const getClassScheduleById = async (id: string) => {
  const schedule = await ClassSchedule.findById(id)
    .populate('trainerId', 'name email')
    .populate('bookingsCount');
  
  if (!schedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class schedule not found');
  }
  
  return schedule;
};

const updateClassSchedule = async (id: string,updateData:Partial<IClassSchedule>) => {
  if (updateData.trainerId) {
    const trainer = await User.findById(updateData.trainerId);
    if (!trainer) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Trainer not found');
    }
    if (trainer.role !== 'trainer') {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error occurred.');
    }
  }

  if (updateData.startTime || updateData.endTime) {
    const schedule = await ClassSchedule.findById(id);
    if (!schedule) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Class schedule not found');
    }

    const startTime = updateData.startTime 
      ? new Date(updateData.startTime) 
      : schedule.startTime;
    
    const endTime = updateData.endTime 
      ? new Date(updateData.endTime) 
      : schedule.endTime;

    const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    if (durationInHours !== 2) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error occurred.');
    }
  }

  const schedule = await ClassSchedule.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!schedule) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Class schedule not found');
  }

  return schedule;
};

const deleteClassSchedule = async (id: string) => {
  const schedule = await ClassSchedule.findByIdAndDelete(id);
  if (!schedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class schedule not found');
  }
  return schedule;
};

const getSchedulesByTrainer = async (trainerId: string) => {
  const schedules = await ClassSchedule.find({ trainerId })
    .populate('bookingsCount');
  
  return schedules;
};

export const ClassScheduleService = {
  createClassSchedule,
  getAllClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
  getSchedulesByTrainer,
};
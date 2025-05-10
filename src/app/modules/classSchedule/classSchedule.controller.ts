import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassScheduleService } from './classSchedule.service';

const createClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const scheduleData = req.body;
  const result = await ClassScheduleService.createClassSchedule(scheduleData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Class schedule created successfully',
    data: result,
  });
});

const getAllClassSchedules = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassScheduleService.getAllClassSchedules();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class schedules retrieved successfully',
    data: result,
  });
});

const getClassScheduleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassScheduleService.getClassScheduleById(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class schedule retrieved successfully',
    data: result,
  });
});

const updateClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await ClassScheduleService.updateClassSchedule(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class schedule updated successfully',
    data: result,
  });
});

const deleteClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClassScheduleService.deleteClassSchedule(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Class schedule deleted successfully',
    data: result,
  });
});

const getSchedulesByTrainer = catchAsync(async (req: Request, res: Response) => {
  const { trainerId } = req.params;
  const result = await ClassScheduleService.getSchedulesByTrainer(trainerId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Trainer schedules retrieved successfully',
    data: result,
  });
});

export const ClassScheduleController = {
  createClassSchedule,
  getAllClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
  getSchedulesByTrainer,
};
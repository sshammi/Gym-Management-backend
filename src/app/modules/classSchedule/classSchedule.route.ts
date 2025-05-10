import express from 'express';
import { ClassScheduleController } from './classSchedule.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createClassScheduleZodSchema, updateClassScheduleZodSchema } from './classSchedule.validation';


const router = express.Router();

router.post('/',auth('admin'),validateRequest(createClassScheduleZodSchema),ClassScheduleController.createClassSchedule);

router.patch('/:id',auth('admin'),validateRequest(updateClassScheduleZodSchema),ClassScheduleController.updateClassSchedule);

router.delete('/:id',auth('admin'),ClassScheduleController.deleteClassSchedule);

router.get('/',auth('admin', 'trainer', 'trainee'),ClassScheduleController.getAllClassSchedules);

router.get('/:id',auth('admin', 'trainer', 'trainee'),ClassScheduleController.getClassScheduleById);

router.get('/trainer/:trainerId',auth('admin', 'trainer'),ClassScheduleController.getSchedulesByTrainer);

export const ClassScheduleRoutes = router;
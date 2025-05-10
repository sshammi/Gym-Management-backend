import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { UserController} from './user.controller';
import { AuthValidation } from '../Auth/auth.validation';
import { AuthControllers } from '../Auth/auth.controller';
import auth from '../../middlewares/auth';
import { userCreateValidationSchema, userUpdateValidationSchema } from './user.validation';

const router=express.Router();

router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthControllers.loginUser);

router.post('/',validateRequest(userCreateValidationSchema),UserController.createUser);

router.get('/', auth('admin'), UserController.getAllUsers);

router.get('/:id', auth('admin', 'trainer', 'trainee'), UserController.getUserById);

router.patch('/:id',auth('admin', 'trainer', 'trainee'),validateRequest(userUpdateValidationSchema),UserController.updateUser);

router.delete('/:id', auth('admin'), UserController.deleteUser);


export const UserRoutes=router;
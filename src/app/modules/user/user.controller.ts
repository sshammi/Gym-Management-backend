import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserService.createUser(userData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User created successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await UserService.updateUser(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
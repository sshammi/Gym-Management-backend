import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUserData } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUserData) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(400, 'Validation error occurred.');
  }

  const newUser = await User.create(userData);
  return newUser;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateUser = async (id: string, updateData: Partial<IUserData>) => {
  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
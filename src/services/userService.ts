import User, { IUser } from '../models/User';
import CustomError from '../errors/customError';
import bcrypt from 'bcrypt';

// Utility function to find all users
export const findUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (error) {
    throw new CustomError('Error fetching users', 500);
  }
};

export const findUserByProperty = async (key: keyof IUser, value: string): Promise<IUser | null> => {
  try {
    if (key === '_id') {
      return await User.findById(value);
    }
    return await User.findOne({ [key]: value });
  } catch (error) {
    throw new CustomError(`Error finding user by ${key}`, 500);
  }
};

// Utility function to create a new user
export const createNewUser = async (userData: Partial<IUser>): Promise<IUser> => {
    try {
          const user = new User(userData);
          return await user.save();
    } catch (error) {
          throw new CustomError('Failed to create new user', 500);
    }
};
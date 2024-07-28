import User, { IUser } from '../models/User';
import CustomError from '../errors/customError';

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
      return await User.findById(value).select('-password');
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

// Utility function to activate/deactivate user
export const deactivateUser = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  user.isActive = false;  
  await user.save();
  return user;
};

// Utility function to update user role
export const updateUserRole = async (userId: string, role: string): Promise<IUser | null> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  user.role = role;
  await user.save();
  return user;
};

// Utility function to update user 
export const updateUser = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  return user;
};

// Utility function to delete user 
export const deleteUser = async (userId: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  return user;
};

// Utility function for user to upload profile image
export const updateUserProfileImage = async (userId: string, imageUrl: string): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { imageUrl } },
    { new: true, runValidators: true }
  ).select('-password');  // Exclude the password field

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  return user;
};
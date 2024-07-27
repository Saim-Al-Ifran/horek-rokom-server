import jwt from 'jsonwebtoken';
import  { IUser } from '../models/User';
import CustomError from '../errors/customError';
import { secretKey } from '../secret';
import { createNewUser, findUserByProperty } from './userService';


export const registerUserService = async (userData: Partial<IUser>) => {

        const { username, email, password} = userData;
        if (!email) {
          throw new CustomError('Email is required', 400);
        }

        const existingUser = await findUserByProperty('email', email);
        if (existingUser) {
           throw new CustomError('User already exists with this email', 400);
        }

        const newUser = await createNewUser({ username, email, password });
        return newUser;

};

export const loginUserService = async (loginData: { email: string; password: string }) => {

        const { email, password } = loginData;
        if (!email) {
          throw new CustomError('Email is required', 400);
        }
        if (!password) {
          throw new CustomError('Password is required', 400);
        }

        const user = await findUserByProperty('email', email);
        if (!user) {
          throw new CustomError('Invalid email or password', 401);
        }
        
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          throw new CustomError('Invalid email or password', 401);
        }

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
        return token;

};

export const loginAdminService = async (loginData: { email: string; password: string }) => {

  const { email, password } = loginData;
  const user = await findUserByProperty('email', email);
  console.log(user?.role !== 'admin');
  if (!user || user.role !== 'admin') {
    throw new CustomError('Only admins are allowed to login', 401);
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new CustomError('Invalid email or password', 401);
  }

  const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
  return token;

};
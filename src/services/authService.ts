import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import CustomError from '../errors/customError';
import { refreshSecretKey, secretKey } from '../secret';
import { createNewUser, findUserByProperty } from './userService';
import { generateAccessToken, generateRefreshToken } from '../utils/auth/tokens';
 

export const registerUserService = async (userData: Partial<IUser>): Promise<IUser> => {
  const { username, email, password } = userData;
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

export const loginUserService = async (loginData: { email: string; password: string }): Promise<{ accessToken: string; refreshToken: string }> => {
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

  const payload  = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const loginAdminService = async (loginData: { email: string; password: string }): Promise<{ accessToken: string; refreshToken: string }> => {
  const { email, password } = loginData;
  const user = await findUserByProperty('email', email);

  if (!user || user.role !== 'admin') {
    throw new CustomError('Only admins are allowed to login', 401);
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new CustomError('Invalid email or password', 401);
  }
  const payload  = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  user.refreshTokens.push({ token: refreshToken });
  await user.save();

  return { accessToken, refreshToken };
};

export const refreshTokenService = async (refreshToken: string): Promise<{accessToken: string; refreshToken: string}> => {
  if (!refreshToken) {
    throw new CustomError('Refresh token not provided', 400);
  }

  let payload: any;
  try {
    payload = jwt.verify(refreshToken, refreshSecretKey);
    
  } catch (error) {
    throw new CustomError('Invalid refresh token', 403);
  }
  console.log(payload.id)
  const user = await findUserByProperty('_id', payload.id);

  if (!user || !user.refreshTokens.some((rt) => rt.token === refreshToken)) {
    throw new CustomError('Invalid refresh token', 403);
  }

  const newAccessToken = generateAccessToken({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  });
  const newRefreshToken = generateRefreshToken({ id: user._id });

  user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== refreshToken);
  user.refreshTokens.push({ token: newRefreshToken });
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

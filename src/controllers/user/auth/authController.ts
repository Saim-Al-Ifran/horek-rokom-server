import { Request, Response, NextFunction } from 'express';
import {
  registerUserService,
  loginUserService,
  loginAdminService,
  refreshTokenService
} from '../../../services/authService';
import CustomError from '../../../errors/customError';
 

 class AuthController {

  public async registerUser(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {

      const userData = req.body;
      const newUser = await registerUserService(userData);
      const response = {
          username:newUser.username,
          email:newUser.email
      }
      res.status(201).json({message: 'User registered successfully',response});

    }catch(error:any){

      next(new CustomError(error.message,error.status))
    
    }
  }
 
  public async loginUser(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {

      const loginData = req.body;
      const {accessToken, refreshToken} = await loginUserService(loginData);
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.status(200).json({ message:'Login Successfull',accessToken,refreshToken });

    }catch(error:any){
      next(new CustomError(error.message,error.status))
    }
  }

  public async loginAdmin(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      
      
      const loginData = req.body;
      const {accessToken, refreshToken} = await loginAdminService(loginData);
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.status(200).json({ message:'Login Successfull',accessToken,refreshToken });

    }catch(error:any){

      next(new CustomError(error.message,error.status))
    
    }
  }

  public async refreshTokenController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
  
      if (!refreshToken) {
        throw new CustomError('Refresh token not provided', 403);
      }
  
      const tokens = await refreshTokenService(refreshToken);
  
      res.cookie('accessToken', tokens.accessToken, { httpOnly: true, maxAge: 3600000 });
      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.json(tokens);

    } catch (error: any) {
      next(new CustomError(error.message,error.status));
    }
  }

 }

export default new AuthController();
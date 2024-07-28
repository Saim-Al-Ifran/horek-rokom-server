import { Request, Response, NextFunction } from 'express';
import { registerUserService,  loginUserService, loginAdminService } from '../../../services/authService';
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
      const token = await loginUserService(loginData);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
      res.status(200).json({ message:'Login Successfull',token });

    }catch(error:any){
      next(new CustomError(error.message,error.status))
    }
  }

  public async loginAdmin(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      
      
      const loginData = req.body;
      console.log(loginData);
      const token = await loginAdminService(loginData);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
      res.status(200).json({ token });

    }catch(error:any){

      next(new CustomError(error.message,error.status))
    
    }
  }
}


export default new AuthController();
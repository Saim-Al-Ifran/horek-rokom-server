import { Request, Response, NextFunction } from 'express';
import {
  deactivateUser,
  updateUserRole,
  updateUser,
  deleteUser,
  findUsers,
  findUserByProperty,
  updateUserProfileImage,
} from '../../services/userService';
import CustomError from '../../errors/customError';
import { uploadFileToCloudinary } from '../../utils/fileUpload';


class UserController {

    public async getUserProfile(req:any, res: Response): Promise<void> {
        try {
          const userId = req.user.id;
          const user = await findUserByProperty('_id',userId);
          res.status(200).json(user);
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.status).json({ message: error.message });
          } else {
            res.status(500).json({ message: 'An unknown error occurred while fetching the user profile.' });
          }
        }
    }
    public async updateUserProfileImage(req: any, res: Response, next:NextFunction): Promise<void> {
        try {
          const userId = req.user.id;
          const file = req.file;
    
          if (!file) {
            throw new CustomError('No file uploaded', 400);
          }
  
          const uploadResult = await uploadFileToCloudinary(file);
          const updatedUser = await updateUserProfileImage(userId, uploadResult.secure_url);
    
          res.status(200).json(updatedUser);
        } catch (error:any) {
            next(new CustomError(error.message,error.status))
        }
      }
    

  public async getUsers(_req:Request, res:Response, next:NextFunction): Promise<void>{
         try {
                const user = await findUsers();
                res.status(200).json(user);
         } catch (error:any) {
                next(new CustomError(error.message,error.status))
         }
  }  

  public async deactivateUser(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await deactivateUser(userId);
      res.status(200).json(user);
    } catch(error:any){
        next(new CustomError(error.message,error.status))
    }
  }

  public async updateUserRole(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {

      const userId = req.params.id;
      const { role } = req.body;
      const user = await updateUserRole(userId, role);
      res.status(200).json(user);

    }catch(error:any){
        next(new CustomError(error.message,error.status))
    }
  
  }

  public async updateUser(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {

      const userId = req.params.id;
      const updateData = req.body;
      const user = await updateUser(userId, updateData);
      res.status(200).json(user);

    }catch(error:any){
        next(new CustomError(error.message,error.status))
    }
  }

  public async deleteUser(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    }catch(error:any){
        next(new CustomError(error.message,error.status))
    }
  }
}



export default new UserController();
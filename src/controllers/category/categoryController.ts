import { NextFunction, Request, Response } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
} from '../../services/categoryService';
import CustomError from '../../errors/customError';
import { deleteFileFromCloudinary } from '../../utils/delFileFromCloudinary';


class CategoryController {

 public async getCategories(_req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const categories = await getAllCategories();
      res.status(200).json(categories);
    } catch (error:any) {
          next(new CustomError(error.message,error.status))
    }
  }

 public async getCategory(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const categoryId = req.params.id;
      const category = await getCategoryById(categoryId);
      res.status(200).json(category);
    }catch (error:any) {
        next(new CustomError(error.message,error.status))
    }
  }

 public async createCategory(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const categoryData = req.body;
      const imageFile = req.file;
      const newCategory = await createCategory(categoryData, imageFile as Express.Multer.File);
      res.status(201).json(newCategory);
    } catch (error:any) {
         next(new CustomError(error.message,error.status));
    }
  }

 public async updateCategory(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const categoryId = req.params.id;
      const categoryData = req.body;
      const imageFile = req.file;
      const updatedCategory = await updateCategoryById(categoryId, categoryData, imageFile as Express.Multer.File);
      res.status(200).json(updatedCategory);
    } catch (error: any) {
        next(new CustomError(error.message, error.status));
    }
  }

  public async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoryId = req.params.id;
      const category = await getCategoryById(categoryId);

      if (category && category.imageUrl) {
        await deleteFileFromCloudinary(category.imageUrl);
      }

      await deleteCategoryById(categoryId);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error: any) {
      next(new CustomError(error.message, error.status));
    }
  }


}


export default new CategoryController();
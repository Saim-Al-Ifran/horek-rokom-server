import Category, { ICategory } from '../models/Category'; // Adjust the path as needed
import CustomError from '../errors/customError';
import { uploadFileToCloudinary } from '../utils/fileUpload';
 
export const getAllCategories = async (): Promise<ICategory[]> => {
  const categories = await Category.find();
  return categories;
};

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new CustomError('Category not found', 404);
  }
  return category;
};

export const createCategory = async (categoryData: Partial<ICategory>, imageFile: Express.Multer.File): Promise<ICategory> => {
  if (imageFile) {
    const uploadResult = await uploadFileToCloudinary(imageFile);
    categoryData.imageUrl = uploadResult.secure_url;
  }
  const category = new Category(categoryData);
  return await category.save();
};

export const updateCategoryById = async (id: string, categoryData: Partial<ICategory>, imageFile?: Express.Multer.File): Promise<ICategory | null> => {
  if (imageFile) {
    const uploadResult = await uploadFileToCloudinary(imageFile);
    categoryData.imageUrl = uploadResult.secure_url;
  }
  const category = await Category.findByIdAndUpdate(id, categoryData, { new: true, runValidators: true });
  if (!category) {
    throw new CustomError('Category not found', 404);
  }
  return category;
}

export const deleteCategoryById = async (id: string): Promise<ICategory | null> => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new CustomError('Category not found', 404);
  }
  return category;
};

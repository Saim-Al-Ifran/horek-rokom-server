import express from 'express';
import authenticate from '../middlewares/auth/authenticate';
import authorizeAdmin from '../middlewares/auth/authorizeAdmin';
import CategoryController from '../controllers/category/categoryController';
import upload from '../middlewares/uploadFile/upload';
const router = express.Router();


router.get('/categories',CategoryController.getCategories);
router.get('/categories/:id', authenticate, authorizeAdmin, CategoryController.getCategory);
router.post('/category', authenticate, authorizeAdmin,upload.single('image'),CategoryController.createCategory);
router.put('/categories/:id', authenticate, authorizeAdmin, upload.single('image'), CategoryController.updateCategory);
router.delete('/categories/:id', authenticate, authorizeAdmin, CategoryController.deleteCategory);

export default router;
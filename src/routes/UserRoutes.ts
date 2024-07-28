import express from 'express';
import authenticate from '../middlewares/auth/authenticate';
import authorizeAdmin from '../middlewares/auth/authorizeAdmin';
import UserController  from '../controllers/user/userController';
import upload from '../middlewares/uploadFile/upload';
const router  = express.Router();


router.get('/user/profile',authenticate,UserController.getUserProfile);
router.put('/user/:id/profile',authenticate,UserController.updateUser);
router.patch('/user/profile/image',authenticate,upload.single('image'),UserController.updateUserProfileImage);

//routes for admin
router.get('/users',authenticate,authorizeAdmin, UserController.getUsers);
router.patch('/user/:id/deactivate', authenticate, authorizeAdmin, UserController.deactivateUser);
router.patch('/user/:id/role', authenticate, authorizeAdmin, UserController.updateUserRole);
router.put('/user/:id', authenticate, authorizeAdmin, UserController.updateUser);
router.delete('/user/:id', authenticate, authorizeAdmin, UserController.deleteUser);

export default router;
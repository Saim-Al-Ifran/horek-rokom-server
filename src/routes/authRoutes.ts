import express from 'express';
import AuthController from '../controllers/user/auth/authController';

const router = express.Router();

// User Registration
router.post('/register',  AuthController.registerUser);

// User Login
router.post('/login', AuthController.loginUser);

// Admin Login
router.post('/admin/login', AuthController.loginAdmin);

router.post('/refresh-token', AuthController.refreshTokenController);

export default router;

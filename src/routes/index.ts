import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1', userRoutes);
 

export default router;

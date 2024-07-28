import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import bookRoutes from './bookRoutes';
const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1', userRoutes);
router.use('/api/v1', categoryRoutes);
router.use('/api/v1', bookRoutes);
 

export default router;

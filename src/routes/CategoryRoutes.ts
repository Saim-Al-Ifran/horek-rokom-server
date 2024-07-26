import express from 'express';
const router = express.Router();

router.get('/categories');
router.get('/categories/:id');
router.post('/category');
router.put('/categories/:id');
router.delete('/categories/:id');

export default router;
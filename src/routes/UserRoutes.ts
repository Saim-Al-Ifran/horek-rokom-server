import express from 'express';
const router  = express.Router();


router.get('/user/:id/profile');
router.put('/user/:id/profile');

//routes for admin
router.get('/users');
router.patch('/user/:id/deactivate')
router.patch('/user/:id/role')
router.put('/user/:id');
router.delete('/user/:id');

export default router;
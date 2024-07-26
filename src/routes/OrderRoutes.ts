import express from 'express';
const router  = express.Router();

//routes for admin
router.get('/orders')
router.get('/total_payment')
router.post('/payment_confirm')


export default router;
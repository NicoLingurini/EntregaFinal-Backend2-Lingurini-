import { Router } from 'express';
import { CartsController } from '../controllers/carts.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/:pid', requireAuth, requireRole('user'), CartsController.addProduct);

export default router;

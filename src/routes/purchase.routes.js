import { Router } from 'express';
import { PurchaseController } from '../controllers/purchase.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', requireAuth, PurchaseController.makePurchase);

export default router;

import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ProductsController.list);
router.get('/:pid', ProductsController.get);

router.post('/', requireAuth, requireRole('admin'), ProductsController.create);
router.put('/:pid', requireAuth, requireRole('admin'), ProductsController.update);
router.delete('/:pid', requireAuth, requireRole('admin'), ProductsController.delete);

export default router;

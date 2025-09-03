import { CartService } from '../services/cart.service.js';

export const CartsController = {
  addProduct: async (req, res, next) => {
    try {
      const { pid } = req.params;
      const { quantity = 1 } = req.body;
      const cart = await CartService.ensureCartForUser(req.user);
      const updated = await CartService.addProduct(cart._id, pid, Number(quantity));
      res.json({ cart: updated });
    } catch (e) { next(e); }
  }
};

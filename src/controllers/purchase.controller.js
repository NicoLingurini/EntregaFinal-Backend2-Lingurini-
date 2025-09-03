import { PurchaseService } from '../services/purchase.service.js';

export const PurchaseController = {
  makePurchase: async (req, res, next) => {
    try {
      const result = await PurchaseService.purchase(req.user);
      res.json(result);
    } catch (e) { next(e); }
  }
};

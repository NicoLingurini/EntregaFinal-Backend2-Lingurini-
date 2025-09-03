import { ProductService } from '../services/product.service.js';

export const ProductsController = {
  list: async (req, res, next) => {
    try { res.json({ products: await ProductService.list() }); }
    catch (e) { next(e); }
  },
  get: async (req, res, next) => {
    try {
      const p = await ProductService.get(req.params.pid);
      if (!p) return res.status(404).json({ error: 'No encontrado' });
      res.json({ product: p });
    } catch (e) { next(e); }
  },
  create: async (req, res, next) => {
    try { res.status(201).json({ product: await ProductService.create(req.body) }); }
    catch (e) { next(e); }
  },
  update: async (req, res, next) => {
    try {
      const u = await ProductService.update(req.params.pid, req.body);
      if (!u) return res.status(404).json({ error: 'No encontrado' });
      res.json({ product: u });
    } catch (e) { next(e); }
  },
  delete: async (req, res, next) => {
    try {
      const d = await ProductService.delete(req.params.pid);
      if (!d) return res.status(404).json({ error: 'No encontrado' });
      res.json({ product: d });
    } catch (e) { next(e); }
  }
};

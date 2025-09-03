import { ProductRepository } from '../repositories/product.repo.js';
import { ProductDAO } from '../daos/mongo/product.dao.js';

const productRepo = new ProductRepository(new ProductDAO());

export const ProductService = {
  list(filter={}) { return productRepo.list(filter); },
  get(id) { return productRepo.getById(id); },
  create(data) { return productRepo.create(data); },
  update(id, data) { return productRepo.update(id, data); },
  delete(id) { return productRepo.delete(id); }
};

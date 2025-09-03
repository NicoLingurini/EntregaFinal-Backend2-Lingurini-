import { ProductModel } from '../../models/product.model.js';

export class ProductDAO {
  async findById(id) { return ProductModel.findById(id); }
  async findAll(filter = {}) { return ProductModel.find(filter); }
  async create(data) { return ProductModel.create(data); }
  async updateById(id, data) { return ProductModel.findByIdAndUpdate(id, data, { new: true }); }
  async deleteById(id) { return ProductModel.findByIdAndDelete(id); }
}

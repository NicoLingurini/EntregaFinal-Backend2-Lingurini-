import { CartModel } from '../../models/cart.model.js';

export class CartDAO {
  async findById(id) { return CartModel.findById(id).populate('products.product'); }
  async create(data = {}) { return CartModel.create(data); }
  async updateById(id, data) { return CartModel.findByIdAndUpdate(id, data, { new: true }); }
}

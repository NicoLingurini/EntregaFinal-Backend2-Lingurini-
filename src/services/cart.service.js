import { CartRepository } from '../repositories/cart.repo.js';
import { CartDAO } from '../daos/mongo/cart.dao.js';

const cartRepo = new CartRepository(new CartDAO());

export const CartService = {
  async ensureCartForUser(user) {
    if (!user.cart) {
      const cart = await cartRepo.create({ products: [] });
      user.cart = cart._id;
      await user.save();
      return cart;
    }
    return cartRepo.getById(user.cart);
  },

  async addProduct(cartId, productId, quantity = 1) {
    const cart = await cartRepo.getById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');
    const idx = cart.products.findIndex(p => p.product._id.toString() === productId.toString());
    if (idx >= 0) cart.products[idx].quantity += quantity;
    else cart.products.push({ product: productId, quantity });
    return await cartRepo.update(cartId, { products: cart.products });
  }
};

import { nanoid } from 'nanoid';
import { CartRepository } from '../repositories/cart.repo.js';
import { ProductRepository } from '../repositories/product.repo.js';
import { TicketRepository } from '../repositories/ticket.repo.js';
import { CartDAO } from '../daos/mongo/cart.dao.js';
import { ProductDAO } from '../daos/mongo/product.dao.js';
import { TicketDAO } from '../daos/mongo/ticket.dao.js';

const cartRepo = new CartRepository(new CartDAO());
const prodRepo = new ProductRepository(new ProductDAO());
const ticketRepo = new TicketRepository(new TicketDAO());

export const PurchaseService = {
  async purchase(user) {
    if (!user.cart) throw new Error('El usuario no tiene carrito');
    const cart = await cartRepo.getById(user.cart);
    if (!cart || cart.products.length === 0) {
      return { purchased: [], failed: [], ticket: null, amount: 0 };
    }

    const purchased = [];
    const failed = [];
    let amount = 0;

    for (const item of cart.products) {
      const p = item.product;
      if (!p || !p.status) { failed.push({ product: p?._id, reason: 'inexistente' }); continue; }
      if (p.stock >= item.quantity) {
        p.stock -= item.quantity;
        await prodRepo.update(p._id, { stock: p.stock });
        purchased.push({ product: p._id, quantity: item.quantity, price: p.price });
        amount += p.price * item.quantity;
      } else {
        failed.push({ product: p._id, reason: 'sin stock suficiente', requested: item.quantity, available: p.stock });
      }
    }

    let ticket = null;
    if (purchased.length > 0) {
      ticket = await ticketRepo.create({
        code: nanoid(12),
        amount,
        purchaser: user.email
      });
    }

    const remaining = failed.map(f => ({
      product: f.product,
      quantity: f.requested ?? 1
    }));
    await cartRepo.update(cart._id, { products: remaining });

    return { purchased, failed, ticket, amount };
  }
};

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  code: { type: String, required: true, unique: true, index: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, default: 'general' },
  status: { type: Boolean, default: true }
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);

import mongoose from 'mongoose';
import { MONGO_URI } from './config/env.js';

export const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose conectado a', MONGO_URI);
  });
  mongoose.connection.on('error', (err) => {
    console.error('❌ Error Mongoose:', err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ Mongoose desconectado');
  });

  await mongoose.connect(MONGO_URI, { dbName: 'ecommerce' });
  console.log('MongoDB conectado');
};

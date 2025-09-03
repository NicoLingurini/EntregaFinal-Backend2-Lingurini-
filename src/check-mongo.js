import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

mongoose.connection.on('connected', () => {
  console.log('✅ Conexión OK a', uri);
  process.exit(0);
});
mongoose.connection.on('error', (err) => {
  console.error('❌ No conecta:', err.message);
  process.exit(1);
});

try {
  await mongoose.connect(uri, { dbName: 'ecommerce' });
} catch (e) {
  console.error('❌ Error al conectar:', e.message);
  process.exit(1);
}

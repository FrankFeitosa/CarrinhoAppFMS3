import express from 'express';
import cors from 'cors';
import { cartRouter } from './routes/cartRoute.js';
import { productRouter } from './routes/productRoute.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/products', productRouter);
app.use('/cart', cartRouter);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

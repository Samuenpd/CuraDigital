require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const { limiteGeral } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const ofertasRoutes = require('./routes/ofertas');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));
app.use(express.json());
app.use(limiteGeral);

app.use('/imagens', express.static(path.join(__dirname, '..', 'public', 'imagens')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/ofertas', ofertasRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});

module.exports = app;
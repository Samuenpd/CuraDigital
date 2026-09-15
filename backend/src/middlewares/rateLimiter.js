const rateLimit = require('express-rate-limit');

// Limite geral pra API (anti flood)
const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Muitas requisições, tente novamente mais tarde.' },
});

// Limite mais rígido pro login (anti brute-force)
const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { erro: 'Muitas tentativas de login, tente novamente mais tarde.' },
});

module.exports = { limiteGeral, limiteLogin };

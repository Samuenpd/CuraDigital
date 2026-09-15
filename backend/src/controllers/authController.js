const authService = require('../services/authService');

const authController = {
  async registrar(req, res, next) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
      }
      const usuario = await authService.registrar({ nome, email, senha });
      res.status(201).json(usuario);
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ erro: 'email e senha são obrigatórios' });
      }
      const resultado = await authService.login({ email, senha });
      res.json(resultado);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;

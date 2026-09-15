const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/Usuario');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-troque-isso';
const JWT_EXPIRES_IN = '2h';

const authService = {
  async registrar({ nome, email, senha }) {
    const existente = UsuarioModel.buscarPorEmail(email);
    if (existente) {
      const erro = new Error('E-mail já cadastrado');
      erro.status = 409;
      throw erro;
    }

    const senha_hash = await bcrypt.hash(senha, 10);
    const usuario = UsuarioModel.criar({ nome, email, senha_hash });
    return usuario;
  },

  async login({ email, senha }) {
    const usuario = UsuarioModel.buscarPorEmail(email);
    if (!usuario) {
      const erro = new Error('Credenciais inválidas');
      erro.status = 401;
      throw erro;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      const erro = new Error('Credenciais inválidas');
      erro.status = 401;
      throw erro;
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
  },
};

module.exports = authService;

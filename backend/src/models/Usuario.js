const db = require('../config/db');

const UsuarioModel = {
  buscarPorEmail(email) {
    return db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  },

  buscarPorId(id) {
    return db.prepare('SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?').get(id);
  },

  criar({ nome, email, senha_hash }) {
    const stmt = db.prepare(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)'
    );
    const info = stmt.run(nome, email, senha_hash);
    return this.buscarPorId(info.lastInsertRowid);
  },
};

module.exports = UsuarioModel;

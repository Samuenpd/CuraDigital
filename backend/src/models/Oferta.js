const db = require('../config/db');

const OfertaModel = {
  listarTodas({ categoria, busca } = {}) {
    let sql = 'SELECT * FROM ofertas WHERE 1=1';
    const params = [];

    if (categoria) {
      sql += ' AND categoria = ?';
      params.push(categoria);
    }
    if (busca) {
      sql += ' AND titulo LIKE ?';
      params.push(`%${busca}%`);
    }
    sql += ' ORDER BY criado_em DESC';

    return db.prepare(sql).all(...params);
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM ofertas WHERE id = ?').get(id);
  },

  criar(dados) {
    const stmt = db.prepare(`
      INSERT INTO ofertas (titulo, descricao, preco_original, preco_atual, imagem_url, categoria, usuario_id)
      VALUES (@titulo, @descricao, @preco_original, @preco_atual, @imagem_url, @categoria, @usuario_id)
    `);
    const info = stmt.run(dados);
    return this.buscarPorId(info.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;

    const stmt = db.prepare(`
      UPDATE ofertas SET
        titulo = @titulo,
        descricao = @descricao,
        preco_original = @preco_original,
        preco_atual = @preco_atual,
        imagem_url = @imagem_url,
        categoria = @categoria,
        atualizado_em = CURRENT_TIMESTAMP
      WHERE id = @id
    `);
    stmt.run({ ...atual, ...dados, id });
    return this.buscarPorId(id);
  },

  remover(id) {
    const info = db.prepare('DELETE FROM ofertas WHERE id = ?').run(id);
    return info.changes > 0;
  },
};

module.exports = OfertaModel;

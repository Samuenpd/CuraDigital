const request = require('supertest');
const app = require('../../src/server');

describe('API de Ofertas', () => {
  it('GET /health retorna status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /ofertas retorna um array', async () => {
    const res = await request(app).get('/ofertas');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /ofertas sem token retorna 401', async () => {
    const res = await request(app).post('/ofertas').send({ titulo: 'Teste' });
    expect(res.status).toBe(401);
  });
});
